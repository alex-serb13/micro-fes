# Micro Frontends with Module Federation

Basic web application using React and webpack module federation.

## Deployment

When pushing new code into the main branch of the repository the deployment github action will build the application and push the build files on a AWS S3 Bucket, the files are served from AWS CloudFront CDN service. Each micro frontend is built and deployed separately.
You can follow the link below to check the deployment.

[Web Application Delployment](https://d1eut0owkwjkgh.cloudfront.net/)
