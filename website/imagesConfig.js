// Common
const region = 'us-east-1';

// S3
const s3Bucket = "mentoring-webapp-az-rds";

// RDS
const dbName = "imagesDb";
const dbTableName = "images";
const dbHost = "";
const dbPort = 3306;
const dbUser = "";
const dbPassword = "";

// DynamoDb
const dynamoDbTableName = "mentoring-images-table";

// SNS
const snsTopicArn = "";

// SQS
const queueUrl = "";

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
    functionInvocationType: functionInvocationType,
    dynamoDbTableName: dynamoDbTableName
};