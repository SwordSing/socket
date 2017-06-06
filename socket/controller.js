/**
 * Created by zhubin on 25/05/2017.
 */

const fs = require('fs');
const winston = require('winston');

function addMapping(router, mapping) {
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
            let path = url.substring(4);
            router.get(path, mapping[url]);
            winston.info('register URL mapping: GET ', path);
        }
        else if (url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
            winston.info('register URL mapping: POST ', path);
        }
        else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            winston.info('register URL mapping: PUT ', path);
        }
        else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            winston.info('register URL mapping: DELETE ', path);
        }
        else {
            winston.info('invalid URL: ${url}');
        }
    }
}

function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        winston.log('process controller: ', f, '...');
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    })
}

module.exports = function (dir) {
    let
        controllerDir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllerDir);
    return router.routes();

};