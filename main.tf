provider "aws" {
  region = "eu-central-1"  # Choose your region
}


resource "aws_security_group" "web_sg31" {
  name        = "web-sg31"
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

# EC2 Instance definition
resource "aws_instance" "amazon_linux_instance" {
  ami             = "ami-017095afb82994ac7"  # Amazon Linux 2 AMI ID for eu-central-1 region (verify the latest version)
  instance_type   = "t2.micro"  # You can adjust the instance type based on your needs
  key_name        = "testec2"  # Replace with your key pair name
  security_groups = [aws_security_group.web_sg31.name]

  tags = {
    Name = "AmazonLinuxInstance"
  }
}

# Output the public IP of the EC2 instance
output "instance_public_ip" {
  value = aws_instance.amazon_linux_instance.public_ip
  description = "The public IP address of the EC2 instance"
}