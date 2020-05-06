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
			const query = 'SELECT * FROM Ledger WHERE Stamp = ?;';
			const ledge = ctx.params.Ledger;
			chpConnection.query({
				sql: query,
				values: [ledge]
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
			const newLedger = ctx.request.body;
			chpConnection.query({
				sql: 'INSERT INTO Ledger(Owner_ID, Business_ID, Dog_ID, Stamp, Cost, Satisfied, Visit_Log) VALUES (?, ?, ?, ?, ?, ?, ?);',
				values: [newLedger.Owner_ID, newLedger.Business_ID, newLedger.Dog_ID, newLedger.Stamp, newLedger.Cost, newLedger.Satisfied, newLedger.Visit_Log]
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
			const ledge = ctx.request.body;
			chpConnection.query({
				sql: `UPDATE Ledger
				SET
					Owner_ID = ?,
					Business_ID = ?,
					Dog_ID = ?,
					Cost = ?,
					Satisfied = ?,
					Visit_Log =?
				WHERE
					Stamp = ?`,
				values: [ledge.Owner_ID, ledge.Business_ID, ledge.Dog_ID, ledge.Cost, ledge.Satisfied, ledge.Visit_Log, ctx.params.Ledger]
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
			chpConnection.query({
				sql: `DELETE FROM Ledger WHERE Stamp = ?;`,
				values: [ctx.params.Ledger]
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
