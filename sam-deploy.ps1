Write-Host 'Running SAM packaging...' -ForegroundColor Green

sam package `
--template-file sam-template.yml `
--output-template-file package.yml `
--s3-bucket sam-src-az `
--s3-prefix ImageUploadNotifier-src `
--profile SamAdmin `
--region us-east-1

Write-Host 'SAM package is finished' -ForegroundColor Green

Write-Host 'Running SAM deploying...' -ForegroundColor Green

sam deploy `
--template-file package.yml `
--stack-name ImageUploadNotifierStack `
--capabilities CAPABILITY_IAM `
--profile SamAdmin `
--region us-east-1

Write-Host 'SAM deployment is finished' -ForegroundColor Green 