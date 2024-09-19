output "username_rds" {
  value = module.rds.db_instance_username
}

output "string_connection" {
  value = module.rds.db_instance_domain
}
