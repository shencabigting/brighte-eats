terraform {
  backend "s3" {
    bucket = "shen-brighte-eats-terraform-state-bucket-v2"
    key    = "terraform.tfstate"
    region = "ap-southeast-1"
    encrypt = true
  }
}
