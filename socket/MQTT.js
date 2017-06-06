/**
 * Created by zhubin on 01/06/2017.
 */

const winston = require('winston');
const mosca = require('mosca');

const moscaSettings = {
    port: 1883
};

var server = new mosca.Server(moscaSettings);

server.on('ready', function () {
   winston.info('Mosca server is up & running');
});

server.on('clientConnected', function (client) {
    winston.info('Client Connected: ', client.id);
});
server.on('clientDisconnected', function (client) {
    winston.info('Client Disconnected: ', client.id);
});
server.on('published', function (packet, client) {
   winston.info('New message has been published');
    switch (packet.topic) {
        case 'test':
            winston.info("payload: ", packet.payload.toString());
            let msg = {
                topic: 'repeat',
                payload: packet.payload,
                qos: 0,
                retain: false
            };
            server.publish(msg, function () {
                console.log('repeat!  ');
            });
            break;
    }
});
