// Common
const region = 'us-east-1';

// S3
const s3Bucket = "mentoring-webapp-az-rds";

// RDS
const dbName = "imagesDb";
const dbTableName = "images";
const dbHost = "mentoing-instance.crhyu1i91cg0.us-east-1.rds.amazonaws.com";
const dbPort = 3306;
const dbUser = "admin";
const dbPassword = "(K%E(D8TJd5L=f#8";

// SNS
const snsTopicArn = "arn:aws:sns:us-east-1:770782070231:mentoring-webapp-az-uploads-notification-topic";

// SQS
const queueUrl = "https://sqs.us-east-1.amazonaws.com/770782070231/mentoring-webapp-az-uploads-notification-queue";

//Lambda
const functionName = "mentoring-webapp-az-uploads-notifier";
const functionInvocationType = "RequestResponse";

module.exports = {
    region: region,
    s3Bucket: s3Bucket,
    dbName: dbName,
    dbTableName: dbTableName,
    dbHost: dbHost,
    dbPort: dbPort,
    dbUser: dbUser,
    dbPassword: dbPassword,
    snsTopicArn: snsTopicArn,
    queueUrl: queueUrl,
    functionName: functionName,
    functionInvocationType: functionInvocationType
};