provider "aws" {
  region = "eu-central-1"  # Choose your region
}

resource "aws_instance" "web8" {
  ami           = "ami-0084a47cc718c111a"  # Example AMI for Ubuntu; update based on region
  instance_type = "t2.micro"
  key_name      = "testec2"

  security_groups = [aws_security_group.web_sg11.name]

  tags = {
    Name = "web-server8"
  }
}

resource "aws_security_group" "web_sg11" {
  name        = "web-sg11"
  description = "Allow inbound traffic to EC2 instance"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

    ingress {
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow traffic to backend (port 3001)
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "ec2_public_ip" {
  description = "The public IP address of the EC2 instance"
  value       = aws_instance.web8.public_ip
}
