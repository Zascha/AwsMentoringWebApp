const aws = require("aws-sdk");
const config = require('./imagesConfig');

module.exports = {
    send: sendMessage,
    getAll: getAllMessagesInBatches
};

aws.config.update({region: config.region});
const sqs = new aws.SQS();

function sendMessage(title, message, callback) {
    var params = {
        MessageAttributes: {
            "Title": {
                DataType: "String",
                StringValue: title
            },
            "Author": {
                DataType: "String",
                StringValue: "AZ"
            }
        },
        MessageBody: message,
        QueueUrl: config.queueUrl
    };

    sqs.sendMessage(params, function (err, data) {
        if (callback) {
            if (err) callback(err);
            if (data) callback(data);
        }
    });
}

function getAllMessagesInBatches(callback){
    const params = {
        QueueUrl: config.queueUrl,
        MaxNumberOfMessages: 10
    };

    sqs.receiveMessage(params, (err, data) => {
        if (callback) {
            if (err) callback(err);
            if (data) callback(data.Messages);
        }
    });
}