provider "aws" {
  region  = "eu-west-2"
  version = "~> 2.0"
}

terraform {
  backend "s3" {
    bucket  = "terraform-state-development-apis"
    encrypt = true
    region  = "eu-west-2"
    key     = "services/developer-hub-frontend/state"
  }
}

resource "aws_s3_bucket" "frontend-bucket-development" {
  bucket = "lbh-developer-hub-development.hackney.gov.uk"
  acl    = "private"
  versioning {
    enabled = true
  }
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

data "aws_caller_identity" "current" {}

module "cloudfront-development" {
  source = "github.com/LBHackney-IT/aws-hackney-common-terraform.git//modules/cloudfront/s3_distribution"
  s3_domain_name = aws_s3_bucket.frontend-bucket-development.bucket_regional_domain_name
  origin_id = "developer-hub-frontend"
  s3_bucket_arn = aws_s3_bucket.frontend-bucket-development.arn
  s3_bucket_id = aws_s3_bucket.frontend-bucket-development.id
  orginin_access_identity_desc = "Developer Hub frontend cloudfront identity"
  cname_aliases = ["developer-api-development.hackney.gov.uk"]
  environment_name = "development"
  cost_code= "B0811"
  project_name= "Developer Hub"
  use_cloudfront_cert = false
  hackney_cert_arn = "arn:aws:acm:us-east-1:${data.aws_caller_identity.current.account_id}:certificate/5aae4fdb-c637-49f4-a105-c91f55722149"
}