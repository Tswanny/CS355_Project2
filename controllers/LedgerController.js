const chpConnection = require('../database/CHPConnection');


// Controller that interacts with database to retrieve data.
class LedgerController {
	constructor() {
		console.log('Ledger Controller Initialized!');
	}

	// Fetches all Ledgers
	async ledgers(ctx) {
		console.log('Controller HIT: LedgerController::ledgers');
		return new Promise((resolve, reject) => {
			const query = 'SELECT * FROM Ledger';

			chpConnection.query(query, (err, res) => {
				if(err) {
					reject(`Error querying CHP.Ledger: ${err}`);
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

	//Fetches a single Ledger
	async ledger(ctx) {
		console.log('Controller HIT: LedgerController::ledger');
		return new Promise((resolve, reject) => {
			const query = 'SELECT * FROM Ledger WHERE Owner_ID = ? && Business_ID = ? && Dog_ID = ? && Stamp = ?;';
			const O_ID = ctx.params.Owner_ID;
			const B_ID = ctx.params.Business_ID;
			const D_ID = ctx.params.Dog_ID;
			const T = ctx.params.Stamp;
			chpConnection.query({
				sql: query,
				values: [O_ID, B_ID, D_ID, T]
			}, (err, res) => {
				if(err) {
					reject(err);
				}

				ctx.body = res;
				ctx.status = 200;
				resolve();
			});
		})
		.catch(err => {
			ctx.status = 500;
			ctx.body = {
				error: `Internal Server Error: ${err}`,
				status: 500
			};
		});
	}


	// Add a new Ledger
	async addLedger(ctx, next) {
		console.log('Controller HIT: LedgerController::addLedger');
		return new Promise((resolve, reject) => {
			const O_ID = ctx.params.Owner_ID;
			const B_ID = ctx.params.Business_ID;
			const D_ID = ctx.params.Dog_ID;
			const Cost = ctx.params.Cost;
			const Sat = ctx.params.Satisfied;
			const VL = ctx.params.Visit_Log;
			chpConnection.query({
				sql: 'call Transaction(?, ?, ?, ?, ?, ?);',
				values: [O_ID, B_ID, D_ID, Cost, Sat, VL]
			}, (err, res) => {
				if(err) {
					reject(err);
				}

				resolve();
			});
		})
		.then(await next)
		.catch(err => {
			ctx.status = 500;
			ctx.body = {
				error: `Internal Server Error: ${err}`,
				status: 500
			};
		});
	}


	// Update a Ledger
	async updateLedger(ctx, next) {
		console.log('Controller HIT: LedgerController::updateLedger');
		return new Promise((resolve, reject) => {
			const O_ID = ctx.params.Owner_ID;
                        const B_ID = ctx.params.Business_ID;
                        const D_ID = ctx.params.Dog_ID;
			const St = ctx.params.Stamp;
                        const Cost = ctx.params.Cost;
                        const Sat = ctx.params.Satisfied;
                        const VL = ctx.params.Visit_Log;

			chpConnection.query({
				sql: `UPDATE Ledger
				SET
					Cost = ?,
					Satisfied = ?,
					Visit_Log =?
				WHERE
					Owner_ID = ? &&
					Business_ID = ? &&
					Dog_ID = ? &&
					Stamp = ?`,
				values: [O_ID, B_ID, D_ID, St, Cost, Sat, VL]
			}, (err, res) => {
				if(err) {
					reject(err);
				}
				
				resolve();
			});
		})
		.then(await next)
		.catch(err => {
			ctx.status = 500;
			ctx.body = {
				error: `Internal Server Error: ${err}`,
				status: 500
			};
		});
	}
	
	// Delete a Ledger
	async deleteLedger(ctx, next) {
		console.log('Controller HIT: LedgerController::deleteLedger');
		return new Promise((resolve, reject) => {
			const O_ID = ctx.params.Owner_ID;
			const B_ID = ctx.params.Business_ID;
			const D_ID = ctx.params.Dog_ID;
			const St = ctx.params.Stamp;

			chpConnection.query({
				sql: `DELETE FROM Ledger WHERE Owner_ID = ? && Business_ID = ? && Dog_ID = ? && Stamp = ?;`,
				values: [O_ID, B_ID, , D_ID, St]
			}, (err, res) => {
				if(err) {
					reject(err);
				}
				resolve();
			});
		})
		.then(await next)
		.catch(err => {
			ctx.status = 500;
			ctx.body = {
				error: `Internal Server Error: ${err}`,
				status: 500
			};
		});
	}
}

module.exports = LedgerController;
