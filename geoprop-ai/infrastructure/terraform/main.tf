terraform { 
  required_providers { 
    aws = { 
      source  = "hashicorp/aws" 
      version = "~^> 5.0" 
    } 
  } 
} 
 
provider "aws" { 
  region = var.aws_region 
} 
 
# DynamoDB Tables 
resource "aws_dynamodb_table" "bets" { 
  name           = "geoprop-bets" 
  billing_mode   = "PAY_PER_REQUEST" 
  hash_key       = "bet_id" 
 
  attribute { 
    name = "bet_id" 
    type = "S" 
  } 
 
  tags = { 
    Environment = var.environment 
    Project     = "GeoProp AI" 
  } 
} 
 
resource "aws_dynamodb_table" "players" { 
  name           = "geoprop-players" 
  billing_mode   = "PAY_PER_REQUEST" 
  hash_key       = "player_id" 
 
  attribute { 
    name = "player_id" 
    type = "S" 
  } 
} 
