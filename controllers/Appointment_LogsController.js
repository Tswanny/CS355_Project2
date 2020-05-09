const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data
class Appointment_LogsController {
	constructor() {
		console.log('Appointment_Logs Controller Initialized!');
	}

	// Calls Appointment_Logs view
	async Logs(ctx) {
		console.log('Controller HIT: Appointment_Logs::Logs');
		return new Promise((resolve, reject) => {
			const query = 'SELECT * FROM Appointment_Logs;';

			chpConnection.query(query, (err, res) => {
				if(err) {
					reject(`Error querying CHP.Appointment_Logs: ${err}`);
                                }

                                ctx.body = res;
                                ctx.status = 200;

                                resolve();
                        });
                })
                .catch(err => {
                        ctx.status = 500;
                        ctx.body = err;
                });
        }
}

module.exports = Appointment_LogsController;
