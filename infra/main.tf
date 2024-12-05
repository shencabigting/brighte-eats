provider "aws" {
  region = "ap-southeast-1"
}

# VPC and Subnet setup (You can use existing VPC or create new one)
resource "aws_vpc" "main_vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "main_subnet" {
  vpc_id     = aws_vpc.main_vpc.id
  cidr_block = "10.0.1.0/24"
}

resource "aws_db_subnet_group" "default" {
  name       = "db_subnet_group"
  subnet_ids = [aws_subnet.main_subnet.id]
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
  publicly_accessible     = true
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
}

# Create ECS Cluster
resource "aws_ecs_cluster" "app_cluster" {
  name = "app-cluster"
}

# IAM Role for ECS Tasks
resource "aws_iam_role" "ecs_task_execution_role" {
  name               = "ecs-task-execution-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_assume_role_policy.json
}

data "aws_iam_policy_document" "ecs_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# ECS task definition for backend
resource "aws_ecs_task_definition" "backend_task" {
  family                   = "backend-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  
  container_definitions = jsonencode([{
    name      = "backend"
    image     = "your-backend-image"
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

  container_definitions = jsonencode([{
    name      = "frontend"
    image     = "your-frontend-image"
    essential = true
    portMappings = [{
      containerPort = 80
      hostPort      = 80
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
    subnets          = [aws_subnet.main_subnet.id]
    security_groups = [aws_security_group.db_sg.id]
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
    subnets          = [aws_subnet.main_subnet.id]
    security_groups = [aws_security_group.db_sg.id]
  }
}

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
