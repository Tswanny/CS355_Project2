const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data
class BusinessController {
	constructor() {
		console.log('Business Controller Initialized!');
	}

	// Fetches all Businesses
	async businesses(ctx) {
	console.log('Controller HIT: BusinessController::Businesses');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Business';

            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Business: ${err}`);
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

   // Fetches a single Business
    async business(ctx) {
        console.log('Controller HIT: BusinessController::Business');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Business WHERE ID = ?;';
            const bus = ctx.params.Business_ID;

            chpConnection.query({
                sql: query,
                values: [bus]
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

    // Add a new Business
    async addBusiness(ctx, next) {
        console.log('Controller HIT: BusinessController::addBusiness');
       return new Promise((resolve, reject) => {
           const newBus = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Business(Name, Type, Street, City, ZIP, Phone_Num, Email) VALUES (?, ?, ?, ?, ?, ?, ?);',
               values: [newBus.Name, newBus.Type, newBus.Street, newBus.City, newBus.ZIP, newBus.Phone_Num, newBus.Email]
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

// Update a Business
    async updateBusiness(ctx, next) {
        console.log('Controller HIT: BusinessController::updateBusiness');
        return new Promise((resolve, reject) => {
            const Bus = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Business
                    SET
		    	Name = ?,
			Type = ?,
			Street = ?,
                        City = ?,
                        ZIP = ?,
			Phone_Num = ?,
			Email = ?
                    WHERE ID = ?
                    `,
                values: [Bus.Name, Bus.Type, Bus.Street, Bus.City, Bus.ZIP, Bus.Phone_Num, Bus.Email,  ctx.params.Business_ID]
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

// Delete a Business
    async deleteBusiness(ctx, next) {
        console.log('Controller HIT: BusinessController::deleteBusiness');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Business WHERE ID = ?;`,
                values: [ctx.params.Business_ID]
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

module.exports = BusinessController;
