variable "prefix" {
  type        = string
  description = "Prefix for all resources"
}
variable "ec2-specs" {
  type        = map(string)
  description = "EC2 Specifications"
  default = {
    "ami"           = "ami-0ae8f15ae66fe8cda"
    "instance_type" = "t2.micro"
  }
}
variable "vpc-specs" {
  type        = map(string)
  description = "VPC Specifications"
  default = {
    "cidr_vpc" = "10.10.0.0/16"
  }
}
