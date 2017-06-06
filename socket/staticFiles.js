/**
 * Created by zhubin on 25/05/2017.
 */

const path = require('path');
const mime = require('mime');
const fs = require('fs');

function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rPath = ctx.request.path;
        if (rPath.startsWith(url)) {
            let fp = path.join(dir, rPath.substring(url.length));
            if  (await fs.exists(fp)) {
                ctx.response.type = mime.lookup(rPath);
                ctx.response.body = await fs.readFile(fp);
            }
            else {
                ctx.response.status = 404;
            }
        }
        else {
            await next();
        }
    }
}

module.exports = staticFiles;