/**
 * Created by zhubin on 25/05/2017.
 */

const  APIError = require('../rest').APIError;

module.exports = {
    'GET /api/test': async (ctx, next) => {
        ctx.rest({message: "hello get"});
    }
};