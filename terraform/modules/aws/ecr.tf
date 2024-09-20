resource "aws_ecr_repository" "marketplace-repository" {
  name                 = "${var.prefix}-marketplace-repository"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}