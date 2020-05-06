const OwnerRouter = require('./Owner');
const defaultRouter = require('koa-router')({
    prefix: '/api'
});

defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = "Default Route Found!";
});

defaultRouter.use(
    OwnerRouter.routes()
);

module.exports = api => {
	api.use(defaultRouter.routes());
};
