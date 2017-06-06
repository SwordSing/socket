/**
 * Created by zhubin on 25/05/2017.
 */

const winston = require('winston');

module.exports = {
    APIError: function (code, message) {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    },
    restify: (pathPrefix) => {
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                winston.info(`Process API ${ctx.request.method} ${ctx.request.url}`);
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                };
                try {
                    await next();
                }
                catch (e){
                    winston.error(e);
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code || 'internal:unknown_error',
                        message: e.message || ''
                    };
                }
            }
            else {
                await next();
            }

        }
    }
};