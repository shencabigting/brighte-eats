variable "db_name" {
  description = "The name of the MySQL database"
  type        = string
  default     = "mydb"
}

variable "db_username" {
  description = "Username for MySQL"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "Password for MySQL"
  type        = string
  sensitive   = true
  default     = "my-secret-password"
}