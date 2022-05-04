const aws = require("aws-sdk");
const uuid = require('uuid');
const config = require('./imagesConfig');

module.exports = {
    getAll: getAllImageMetadata,
    get: getImageMetadata,
    getName: getImageName,
    upload: uploadImage,
    delete: deleteImage
};

aws.config.update({ region: config.region });
const dynamo = new aws.DynamoDB();

function getAllImageMetadata(callback) {
    const params = {
        TableName: config.dynamoDbTableName
    };

    dynamo.scan(params, function (err, result) {
        if (callback) {
            if (err) callback(err);
            if (result) callback(result);
        }
    });
}

function getImageMetadata(guid, callback) {
    const params = {
        TableName: config.dynamoDbTableName,
        Key: {
            guid: { S: guid },
        },
    };

    dynamo.scan(params, function (err, result) {
        if (callback) {
            if (err) callback(err);
            if (result) callback(result);
        }
    });
}

function getImageName(guid, callback) {
    const params = {
        TableName: config.dynamoDbTableName,
        Key: {
            guid: { S: guid },
        },
    };

    dynamo.scan(params, function (err, result) {
        if (callback) {
            if (err) callback(err);
            if (result) callback(`${result.name}.${result.format}`);
        }
    });
}

function uploadImage(name, format, size, callback) {
    var guid = uuid.v4().replace("-", "");

    const params = {
        TableName: config.dynamoDbTableName,
        Item: {
            guid: { S: guid },
            name: { S: name },
            format: { S: format },
            size: { N: size.toString() }
        },
    };

    console.log(params);

    dynamo.putItem(params, function (err) {
        if (callback) {
            if (err) callback(err);
            else callback(guid);
        }
    });
}

function deleteImage(guid, callback) {
    const params = {
        TableName: config.dynamoDbTableName,
        Key: {
            guid: { S: guid },
        },
    };

    dynamo.deleteItem(params, function (err) {
        if (callback) {
            if (err) callback(err);
            else callback(guid);
        }
    });
}