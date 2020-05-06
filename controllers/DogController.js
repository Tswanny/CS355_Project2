const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class DogController {
    constructor() {
        console.log('Dog Controller Initialized!');
    }

    // Fetches all Dogs
    async Dogs(ctx) {
        console.log('Controller HIT: DogController::Dogs');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Dog';

            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Dog: ${err}`);
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

    // Fetches a single Dog
    async Dog(ctx) {
        console.log('Controller HIT: DogController::Dog');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Dog WHERE ID = ?;';
            const dg = ctx.params.dog;

            chpConnection.query({
                sql: query,
                values: [dg]
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

    // Add a new Dog
    async addDog(ctx, next) {
        console.log('Controller HIT: DogController::addDog');
       return new Promise((resolve, reject) => {
           const newDog = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Dog(Name, Breed, MIX, Primary_Color) VALUES (?, ?, ?, ?);',
               values: [newDog.Name, newDog.Breed, newDog.Mix, newDog.Primary_Color]
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

    // Update a Dog
    async updateDog(ctx, next) {
        console.log('Controller HIT: DogController::updateDog');
        return new Promise((resolve, reject) => {
            const dg = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Dog
                    SET
                        Name = ?,
                        Breed = ?,
			MIX = ?,
			Primary_Color = ?
                    WHERE ID = ?
                    `,
                values: [dg.Name, dg.Breed, dg.MIX, dg.Primary_Color, ctx.params.dog]
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

    async deleteDog(ctx, next) {
        console.log('Controller HIT: DogController::deleteDog');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Dog WHERE ID = ?;`,
                values: [ctx.params.dog]
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

module.exports = DogController;
