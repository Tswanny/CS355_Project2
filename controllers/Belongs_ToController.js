const chpConnection = require('../datconst chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class Belongs_ToController {
    constructor() {
        console.log('Belongs_To Controller Initialized!');
    }

    // Fetches all Belongs_To instances
    async Belongs_Tos(ctx) {
        console.log('Controller HIT: Belongs_ToController::Belongs_Tos');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Belongs_To';

            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Belongs_To: ${err}`);
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

    // Fetches a single Belongs_To instance for a Dog
    async Belongs_To(ctx) {
        console.log('Controller HIT: Belongs_ToController::Belongs_To');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Belongs_To WHERE Dog_ID = ?;';
            const bt = ctx.params.belongs_to;

            chpConnection.query({
                sql: query,
                values: [bt]
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

    // Add a new Belongs_To
    async addBelongs_To(ctx, next) {
        console.log('Controller HIT: Belongs_ToController::addBelongs_To');
       return new Promise((resolve, reject) => {
           const newBT = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Belongs_To(Dog_ID, Owner_ID, Adoption_Date) VALUES (?, ?, ?);',
               values: [newBT.Dog_ID, newBT.Owner_ID, newBT.Adoption_Date]
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

    // Update a Belongs_To instance
    async updateBelongs_To(ctx, next) {
        console.log('Controller HIT: Belongs_ToController::updateBelongs_To');
        return new Promise((resolve, reject) => {
            const BT = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Belongs_To
                    SET
                        Owner_ID = ?,
                        Adoption_Date = ?
                    WHERE Dog_ID = ?
                    `,
                values: [BT.Owner_ID, BT.Adoption_Date, ctx.params.belongs_to]
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

    // Delete an instance of Belongs_To
    async deleteBelongs_To(ctx, next) {
        console.log('Controller HIT: Belongs_ToController::deleteBelongs_To');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Belongs_To WHERE Dog_ID  = ?;`,
                values: [ctx.params.belongs_to]
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

module.exports = Belongs_ToController;    
