[
  {
    "name": "cb-app",
    "image": "grafana/grafana:latest",
    "essential": true,
    "cpu": ${fargate_cpu},
    "environment": [
        {
          "name": "GF_SERVER_ROOT_URL",
          "value": "https://cb-load-balancer-861580146.us-east-1.elb.amazonaws.com/"
        }
      ],
    "memory": ${fargate_memory},
    "networkMode": "awsvpc",
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/cb-app",
          "awslogs-region": "${aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
    },
    "portMappings": [
      {
        "containerPort": ${app_port},
        "hostPort": ${app_port}
      }
    ]
  }
]