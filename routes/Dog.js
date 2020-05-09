const DogController = new (require('../controllers/DogController'))();
const DogRouter = require('koa-router')({
	prefix: '/Dog'
});

DogRouter.get('/', DogController.Dogs);
DogRouter.get('/:Dog_ID', DogController.Dog);
DogRouter.post('/', DogController.addDog, DogController.Dogs);
DogRouter.put('/:Dog_ID', DogController.updateDog, DogController.Dog);
DogRouter.delete('/:Dog_ID', DogController.deleteDog, DogController.Dogs);

module.exports = DogRouter;


