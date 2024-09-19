output "private_subnet_id" {
  value = aws_subnet.private_subnet.id
}

output "group_subnet_name_db" {
  value = aws_db_subnet_group.subnet_group.name
}

output "vpc_sg" {
  value = aws_security_group.database_sg.id
}
