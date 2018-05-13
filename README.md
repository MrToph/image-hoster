# image-hoster
Custom AWS S3 Image hoster. Allows to upload images to your own S3 bucket using an AWS Lambda function as the API gateway.

## Steps
1. Edit the bucket name in `serverless.yml`. A new bucket with this name will automatically be created when `deploy`ed.
1. Set environment variables in `~/.aws/credentials`: https://docs.aws.amazon.com/powershell/latest/userguide/specifying-your-aws-credentials.html
1. `serverless deploy` this

You can check the bucket here: https://console.aws.amazon.com/s3/

Optional: Edit the CORS configuration: Permissions/CORS Configuration