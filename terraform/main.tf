module "aws" {
  source = "./modules/aws"
  prefix = local.prefix
}

module "rds" {
  source                 = "terraform-aws-modules/rds/aws"
  version                = "6.9.0"
  identifier             = "${local.prefix}-rds"
  engine                 = "postgres"
  engine_version         = "14"
  family                 = "postgres14"
  major_engine_version   = "14"
  instance_class         = "db.t4g.micro"
  allocated_storage      = 20
  max_allocated_storage  = 30
  db_name                = "cropMarketplace"
  username               = "crop_market"
  port                   = 5432
  db_subnet_group_name   = module.aws.group_subnet_name_db
  vpc_security_group_ids = [module.aws.vpc_sg]
}
