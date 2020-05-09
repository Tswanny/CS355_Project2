const Appointment_LogsController = new (require('../controllers/Appointment_LogsController'))();
const Appointment_LogsRouter = require('koa-router')({
	prefix: '/Appointment_Logs'
});

Appointment_LogsRouter.get('/', Appointment_Logs.Logs);

module.exports = Appointment_LogsRouter;
