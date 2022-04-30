const aws = require("aws-sdk");
const fs = require("fs");
const config = require('./imagesConfig');

module.exports = {
    upload: uploadFile,
    download: downloadFile
};

const s3 = new aws.S3();

function uploadFile(file) {
    var params = {
        Bucket: config.s3Bucket,
        Key: file.originalname,
        Body: fs.readFileSync(file.path)
    };
    return s3.upload(params).promise(); 
}

function downloadFile(fileName) {
    var params = {
        Bucket: config.s3Bucket,
        Key: fileName
    };
    return s3.getObject(params).createReadStream();
}