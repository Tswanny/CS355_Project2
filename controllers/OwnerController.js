const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data
class OwnerController {
	constructor() {
		console.log('Owner Controller Initialized!');
	}

	// Fetches all Owners
	async owners(ctx) {
		console.log('Controller HIT: OwnerController::owners');
		return new Promise((resolve, reject) => {
			const query = 'SELECT * FROM Owner';

			chpConnection.query(query, (err, res) => {
				if(err) {
					reject(`Error querying CHP.Owner: ${err}`);
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

	// Fetches a single Owner
	async owner(ctx) {
		console.log('Controller HIT: OwnerController::owner');
		return new Promise((resolve, reject) => {
			const query = 'SELECT * FROM Owner WHERE ID = ?;';
			const owns = ctx.params.Owner;

			chpConnection.query({
				sql: query,
				values: [owns]
			}, (err, res) => {
				if(err) {
					reject(err);
				}

				ctx.body = res;
				ctx.status = 200;
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

	// Add a new Owner
	async addOwner(ctx, next) {
		console.log('Controller HIT: OwnerController::addOwner');
		return new Promise((resolve, reject) => {
			const newOwner = ctx.request.body;
			chpConnection.query({
				sql: 'INSERT INTO Owner(ID, Fname, Lname, City, ZIP, Email) VALUES (?,?,?,?,?,?,?);',
				values: [newOwner.ID, newOwner.Fname, newOwner.Lname, newOwner.City, newOwner.ZIP, newOwner.Email]
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

	// Update an Owner
	async updateOwner(ctx, next) {
		console.log('Controller HIT: OwnerController::updateOwner');
		return new Promise((resolve, reject) => {
			const owns = ctx.request.body;
			chpConnection.query({
				sql:`
				UPDATE Owner
				SET
					Fname = ?,
					Lname = ?,
					City = ?,
					ZIP = ?,
					Email = ?
				WHERE	ID = ?
				`,
				values: [owns.Fname, owns.Lname, owns.City, owns.ZIP, owns.Email, ctx.params.ID]
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

	// Delete an Owner
	async deleteOwner(ctx, next) {
		console.log('Controller HIT: OwnerController::deleteOwner');
		return new Promise((resolve, reject) => {
			chpConnection.query({
				sql: `DELETE FROM Owner WHERE ID = ?;`,
				values: [ctx.params.ID]
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
				error: `Internal Server ERror: ${err}`,
				status: 500
			};
		});
	}
}

module.exports = OwnerController;
