const aws = require("aws-sdk");
const config = require('./imagesConfig');

module.exports = {
    trigger: triggerLambda
};

var creds = new aws.Credentials({
    accessKeyId: "AKIA3G5RRAXLWTNVPP2R", 
    secretAccessKey: "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"
});
var lambda = new aws.Lambda({credentials: creds, signatureCache: false});

function triggerLambda() {
    const params = {
        FunctionName: config.functionName,
        InvocationType: config.InvocationType,
        Payload: JSON.stringify({ Type: "WebApp" })
    };

    return lambda.invoke(params).promise();
}