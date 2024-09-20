output "username_rds" {
  value = module.rds.db_instance_username
}

output "string_connection" {
  value = module.rds.db_instance_domain
}

output "dns_grafana" {
  value = module.grafana.alb_hostname
}

output "s3_bucket" {
  value = module.aws.s3_bucket
}

output "URL_ECR" {
  value = module.aws.URI_Ecr
}