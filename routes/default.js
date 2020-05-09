const OwnerRouter = require('./Owner');
const DogRouter = require('./Dog');
const BusinessRouter = require('./Business');
const LedgerRouter = require('./Ledger');
const Belongs_ToRouter = require('./Belongs_To');
const Owner_Phone_NumberRouter = require('./Owner_Phone_Number');
// const Appointment_LogsRouter = require('./Appointment_Logs');
const defaultRouter = require('koa-router')({
    prefix: '/api'
});

defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = "Default Route Found!";
});

defaultRouter.use(
    OwnerRouter.routes(),
    DogRouter.routes(),
    BusinessRouter.routes(),
    LedgerRouter.routes(),
    Belongs_ToRouter.routes(),
    Owner_Phone_NumberRouter.routes()
//    Appointment_LogsRouter.routes()
);

module.exports = api => {
	api.use(defaultRouter.routes());
};
