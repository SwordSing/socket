/**
 * Created by zhubin on 25/05/2017.
 */

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const rest = require('./rest');
const controller = require('./controller');
const staticFiles = require('./staticFiles');
const tamplating = require('./templating');
const winston = require('winston');
// const cors = require('kcors');

const isProduction = process.env.NODE_NEV === 'production';

const app = new koa();

app.use(async (ctx, next) => {
    winston.info(`Process ${ctx.request.method} ${ctx.request.url}`);
    let
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}`);
});

app.use(rest.restify());

app.use(bodyParser());

app.use(staticFiles('/node_modules/', __dirname + '/node_modules'));

app.use(tamplating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(controller());

app.listen('3000');

winston.info('app started at port 3000...');