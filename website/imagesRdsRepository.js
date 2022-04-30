const uuid = require('uuid');
const context = require('./imagesRdsContext');
const config = require('./imagesConfig');

module.exports = {
    getAll: getAllImageMetadata,
    get: getImageMetadata,
    getName: getImageName,
    upload: uploadImage,
    delete: deleteImage
};

function getAllImageMetadata(callback){    
    var query = `SELECT guid, name, format, size, createdOn FROM ${config.dbTableName}`;
    context.execute(query, callback);
}

function getImageMetadata(guid, callback){
    var query = `SELECT guid, name, format, size, createdOn FROM ${config.dbTableName} WHERE guid = "${guid}"`;
    context.execute(query, callback);
}

function getImageName(guid, callback){
    var query = `SELECT CONCAT(name, '.', format) AS fileName FROM ${config.dbTableName} WHERE guid = "${guid}"`;
    context.execute(query, callback);
}

function uploadImage(name, format, size, callback){
    var guid = uuid.v4().replace("-", "");
    var insertQuery = `INSERT INTO ${config.dbTableName} (guid, name, format, size) VALUES ("${guid}", "${name}", "${format}", ${size}); `;
    context.execute(insertQuery, null);
    callback(guid);
}

function deleteImage(guid, callback){
    var query = `DELETE FROM ${config.dbTableName} WHERE guid = "${guid}"`;
    context.execute(query, callback);
}