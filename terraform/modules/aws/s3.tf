resource "aws_s3_bucket" "react-marketplace" {
  bucket = "${var.prefix}-react-marketplace"
  force_destroy = true
  
}