provider "aws" {
  region  = "eu-west-2"
  version = "~> 2.0"
}

terraform {
  backend "s3" {
    bucket  = "terraform-state-production-apis"
    encrypt = true
    region  = "eu-west-2"
    key     = "services/developer-hub-frontend/state"
  }
}

resource "aws_s3_bucket" "frontend-bucket-production" {
  bucket = "lbh-developer-hub-production.hackney.gov.uk"
  acl    = "private"
  versioning {
    enabled = true
  }
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

module "cloudfront-production" {
  source = "github.com/LBHackney-IT/aws-hackney-common-terraform.git//modules/cloudfront/s3_distribution"
  s3_domain_name = aws_s3_bucket.frontend-bucket-production.bucket_regional_domain_name
  origin_id = "developer-hub-frontend"
  s3_bucket_arn = aws_s3_bucket.frontend-bucket-production.arn
  s3_bucket_id = aws_s3_bucket.frontend-bucket-production.id
  orginin_access_identity_desc = "Developer Hub frontend cloudfront identity"
  cname_aliases = ["http://developer.api.hackney.gov.uk/"]
  environment_name = "production"
  cost_code= "B0811"
  project_name= "Developer Hub"
  use_cloudfront_cert = false
  hackney_cert_arn = "arn:aws:acm:us-east-1:153306643385:certificate/71728a39-cd3e-4570-a440-e87f84ef9a0d"
}