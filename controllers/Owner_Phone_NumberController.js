const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class Owner_Phone_NumberController {
    constructor() {
        console.log('Owner_Phone_Number Controller Initialized!');
    }

    // Fetches all Owner_Phone_Numbers
    async Owner_Phone_Numbers(ctx) {
        console.log('Controller HIT: Owner_Phone_NumberController::Owner_Phone_Numbers');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Owner_Phone_Number';

            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Owner_Phone_Number: ${err}`);
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

    // Fetches a single Owner_Phone_Number
    async dataCenter(ctx) {
        console.log('Controller HIT: Owner_Phone_NumberController::Owner_Phone_Number');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Owner_Phone_Number WHERE Owner_ID = ?;';
            const OPN = ctx.params.Owner_Phone_Number;

            chpConnection.query({
                sql: query,
                values: [OPN]
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

    // Add a new Owner_Phone_Number
    async addOwner_Phone_Number(ctx, next) {
        console.log('Controller HIT: Owner_Phone_NumberController::addOwner_Phone_Number');
       return new Promise((resolve, reject) => {
           const newOPN = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Owner_Phone_Number(Owner_ID, Owner_Num) VALUES (?, ?);',
               values: [OPN.Owner_ID, OPN.Owner_Num]
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

    // Update an Owner_Phone_Number
    async updateOwner_Phone_Number(ctx, next) {
        console.log('Controller HIT: Owner_Phone_NumberController::updateOwner_Phone_Number');
        return new Promise((resolve, reject) => {
            const OPN = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Owner_Phone_Number
                    SET
                        Owner_Num = ?
                    WHERE Owner_ID = ?
                    `,
                values: [OPN.Owner_Num, ctx.params.Owner_Phone_Number]
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

    // Delete an Owner_Phone_Number
    async deleteOwner_Phone_Number(ctx, next) {
        console.log('Controller HIT: Owner_Phone_NumberController::deleteOwner_Phone_Number');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Owner_Phone_Number WHERE Owner_ID = ?;`,
                values: [ctx.params.Owner_Phone_Number]
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

module.exports = Owner_Phone_NumberController;
