const aws = require("aws-sdk");
const config = require('./imagesConfig');

module.exports = {
    subscribe: subscribeForNotifications,
    unsubscribe: unsubscribeFromNotifications,
    notify: notifySubscribers
};

aws.config.update({region: config.region});
const sns = new aws.SNS();

function subscribeForNotifications(email, callback) {
    let params = {
        Protocol: 'EMAIL',
        TopicArn: config.snsTopicArn,
        Endpoint: email
    };
    sns.subscribe(params, (err, result) => {
        if (callback) {
            if (err) callback(err);
            if (result) callback(result);
        }
    });
}

function unsubscribeFromNotifications(email, callback) {
    getSubscriptions(email, (data) => {
        let params = {
            SubscriptionArn: data.SubscriptionArn
        };
        sns.unsubscribe(params, (err, result) => {
            if (callback) {
                if (err) callback(err);
                if (result) callback(result);
            }
        })
    });
}

function notifySubscribers(message, callback){
    var params = {
        Message: message,
        TopicArn: config.snsTopicArn
    };
    sns.publish(params, (err, result) => {
        if (callback) {
            if (err) callback(err);
            if (result) callback(result);
        }
    });
}

function getSubscriptions(endpointFilter, callback) {
    let param = {
        TopicArn: config.snsTopicArn,
    };
    sns.listSubscriptionsByTopic(param, (err, result) => {
        if (callback) {
            if (err) callback(err);
            if (!endpointFilter) {
                callback(result);
            }
            var subscription = result.Subscriptions.find((item) => item.Endpoint == endpointFilter);
            callback(subscription);
        }
    });
}