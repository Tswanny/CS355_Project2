const OwnerController = new (require('../controllers/OwnerController'))();
const OwnerRouter = require('koa-router')({
    prefix: '/Owner'
});

OwnerRouter.get('/', OwnerController.owners);
OwnerRouter.get('/:Owner_ID', OwnerController.owner);
OwnerRouter.post('/', OwnerController.addOwner, OwnerController.owners);
OwnerRouter.put('/:Owner_ID', OwnerController.updateOwner, OwnerController.owner);
OwnerRouter.delete('/:Owner_ID', OwnerController.deleteOwner, OwnerController.owners);

module.exports = OwnerRouter;
