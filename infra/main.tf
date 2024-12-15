provider "aws" {
  region = "ap-southeast-1"
}

# VPC and Subnet setup (You can use existing VPC or create new one)
resource "aws_vpc" "main_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
}

resource "aws_subnet" "subnet_1" {
  vpc_id                  = aws_vpc.main_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-southeast-1a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "subnet_2" {
  vpc_id                  = aws_vpc.main_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "ap-southeast-1b"
  map_public_ip_on_launch = true
}

resource "aws_db_subnet_group" "default" {
  name       = "db_subnet_group"
  subnet_ids = [aws_subnet.subnet_1.id, aws_subnet.subnet_2.id]
}

# Configure MySQL RDS instance
resource "aws_db_instance" "mysql_db" {
  allocated_storage       = 20
  storage_type            = "gp2"
  engine                  = "mysql"
  engine_version          = "8.0"
  instance_class          = "db.t3.micro"
  db_name                 = var.db_name
  username                = var.db_username
  password                = var.db_password
  skip_final_snapshot     = true
  publicly_accessible     = false
  backup_retention_period = 7
  multi_az                = false
  vpc_security_group_ids  = [aws_security_group.db_sg.id]
  db_subnet_group_name    = aws_db_subnet_group.default.name
}

# Create security group for RDS
resource "aws_security_group" "db_sg" {
  name        = "db_sg"
  description = "Security group for RDS"
  vpc_id      = aws_vpc.main_vpc.id
  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]  # Allow traffic from within the VPC
  }
}

# Create security group for backend
resource "aws_security_group" "backend_sg" {
  name        = "backend_sg"
  description = "Security group for backend"
  vpc_id      = aws_vpc.main_vpc.id
  ingress {
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]  # Allow traffic from within the VPC
  }
}

# Create security group for frontend
resource "aws_security_group" "frontend_sg" {
  name        = "frontend_sg"
  description = "Security group for fronted"
  vpc_id      = aws_vpc.main_vpc.id
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]  # Allow traffic from within the VPC
  }
}

# Create ECS Cluster
resource "aws_ecs_cluster" "app_cluster" {
  name = "app-cluster"
}

# IAM Role for ECS Tasks
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs-task-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
        Effect    = "Allow"
        Sid       = ""
      }
    ]
  })
}

# Attach the AmazonECSTaskExecutionRolePolicy to IAM Role
resource "aws_iam_role_policy_attachment" "ecs_task_execution_policy_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# data "aws_iam_policy_document" "ecs_assume_role_policy" {
#   statement {
#     actions = ["sts:AssumeRole"]
#     principals {
#       type        = "Service"
#       identifiers = ["ecs-tasks.amazonaws.com"]
#     }
#   }
# }

# ECS task definition for backend
resource "aws_ecs_task_definition" "backend_task" {
  family                   = "backend-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"

  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([{
    name      = "backend"
    image     = var.aws_ecr_backend_image_name
    essential = true
    portMappings = [{
      containerPort = 4000
      hostPort      = 4000
    }]
    environment = [
      {
        name  = "DB_HOST"
        value = aws_db_instance.mysql_db.endpoint
      },
      {
        name  = "DB_NAME"
        value = var.db_name
      },
      {
        name  = "DB_USER"
        value = var.db_username
      },
      {
        name  = "DB_PASSWORD"
        value = var.db_password
      }
    ]
  }])
}

# ECS task definition for frontend
resource "aws_ecs_task_definition" "frontend_task" {
  family                   = "frontend-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"

  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([{
    name      = "frontend"
    image     = var.aws_ecr_frontend_image_name
    essential = true
    portMappings = [{
      containerPort = 3000
      hostPort      = 3000
    }]
  }])
}

# Create ECS service for backend
resource "aws_ecs_service" "backend_service" {
  name            = "backend-service"
  cluster         = aws_ecs_cluster.app_cluster.id
  task_definition = aws_ecs_task_definition.backend_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    subnets          = [aws_subnet.subnet_1.id]
    security_groups = [aws_security_group.backend_sg.id]
  }
}

# Create ECS service for frontend
resource "aws_ecs_service" "frontend_service" {
  name            = "frontend-service"
  cluster         = aws_ecs_cluster.app_cluster.id
  task_definition = aws_ecs_task_definition.frontend_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    subnets          = [aws_subnet.subnet_1.id]
    security_groups = [aws_security_group.frontend_sg.id]
  }
}

resource "aws_ecr_repository" "backend_repository" {
  name = "backend-repository"

  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true # Enable image scanning on push
  }

  encryption_configuration {
    encryption_type = "AES256" # Default encryption (AES256)
  }

  lifecycle {
    prevent_destroy = true # Optional: prevent accidental deletion of the repository
  }
}

resource "aws_ecr_lifecycle_policy" "backend_repository" {
  repository_name = aws_ecr_repository.backend_repository.name
  policy_text = <<EOF
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Retain only the 2 most recent images",
      "selection": {
        "tagStatus": "any",
        "countType": "imageCountMoreThan",
        "countNumber": 2
      },
      "action": {
        "type": "expire"
      }
    }
  ]
}
EOF
}

resource "aws_ecr_repository" "frontend_repository" {
  name = "frontend-repository"

  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true # Enable image scanning on push
  }

  encryption_configuration {
    encryption_type = "AES256" # Default encryption (AES256)
  }

  lifecycle {
    prevent_destroy = true # Optional: prevent accidental deletion of the repository
  }
}

resource "aws_ecr_lifecycle_policy" "frontend_repository" {
  repository_name = aws_ecr_repository.frontend_repository.name
  policy_text = <<EOF
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Retain only the 2 most recent images",
      "selection": {
        "tagStatus": "any",
        "countType": "imageCountMoreThan",
        "countNumber": 2
      },
      "action": {
        "type": "expire"
      }
    }
  ]
}
EOF
}

# data "aws_iam_policy_document" "s3_ecr_access" {
#   version = "2012-10-17"
#   statement {
#     sid     = "s3access"
#     effect  = "Allow"
#     actions = ["*"]
# 
#     principals {
#       type        = "*"
#       identifiers = ["ecs-tasks.amazonaws.com"]
#     }
#   }
# }

# Create a VPC endpoint for ECR (PrivateLink)
# resource "aws_vpc_endpoint" "ecr_dkr_endpoint" {
#   vpc_id              = aws_vpc.main_vpc.id
#   service_name        = "com.amazonaws.ap-southeast-1.ecr.dkr"
#   vpc_endpoint_type   = "Interface"
#   subnet_ids          = [aws_subnet.subnet_1.id]
#   private_dns_enabled = true  # Enable DNS to resolve ECR endpoint privately
# }
# 
# resource "aws_vpc_endpoint" "ecr_api_endpoint" {
#   vpc_id              = aws_vpc.main_vpc.id
#   service_name        = "com.amazonaws.ap-southeast-1.ecr.api"
#   vpc_endpoint_type   = "Interface"
#   subnet_ids          = [aws_subnet.subnet_1.id]
#   private_dns_enabled = true  # Enable DNS to resolve ECR endpoint privately
# }
# 
# resource "aws_vpc_endpoint" "s3" {
#   vpc_id       = aws_vpc.main_vpc.id
#   service_name = "com.amazonaws.ap-southeast-1.s3"
#   vpc_endpoint_type = "Gateway"
#   route_table_ids = [aws_route_table.private[0].id]
#   policy = data.aws_iam_policy_document.s3_ecr_access.json
# }

# Outputs for important information
output "db_endpoint" {
  value = aws_db_instance.mysql_db.endpoint
}

output "ecs_backend_service_url" {
  value = aws_ecs_service.backend_service.id
}

output "ecs_frontend_service_url" {
  value = aws_ecs_service.frontend_service.id
}
