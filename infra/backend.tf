terraform {
  backend "s3" {
    bucket = "terraform-state-bucket"
    key    = "terraform.tfstate"
    region = "ap-southeast-1"
    encrypt = true
  }
}