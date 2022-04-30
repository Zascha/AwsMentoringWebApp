const snsRepository = require('./imagesSnsRepository');
const sqsRepository = require('./imagesSqsRepository');

exports.handler = function(event, context, callback) {
    sqsRepository.getAll((messages) => {
        let notification = "";
        
        messages.forEach(message => {
            notification += formNotificationMessage(message.Body);
        });
        
        if(notification){
            snsRepository.notify(notification);
        }
        
        let responseMessage = `The number of messages processed: ${messages.length}`;
        let response = {
            statusCode: 200,
            body: JSON.stringify(responseMessage)
        };

        callback(null, response);
    });
};

function formNotificationMessage(imageJson){
    let image = JSON.parse(imageJson);
    
    let notification =  "A new image has been uploaded.\r\n";
    notification += `Image metadata:\r\n- name: ${image.name}\r\n- format: ${image.format}\r\n- size: ${image.size}\r\n`;
    notification += `Image download link: http://mentoring-webapp-az-rds-plb-1908145607.us-east-1.elb.amazonaws.com/image/download/${image.guid}\r\n\r\n`;
    
    return notification;
}