const OwnerController = new (require('../controllers/OwnerController'))();
const OwnerRouter = require('koa-router')({
    prefix: '/Owner'
});

OwnerRouter.get('/', OwnerController.owners);
OwnerRouter.get('/:Owner', OwnerController.owner);
OwnerRouter.post('/', OwnerController.addOwner, OwnerController.owners);
OwnerRouter.put('/:Owner', OwnerController.updateOwner, OwnerController.owner);
OwnerRouter.delete('/:Owner', OwnerController.deleteOwner, OwnerController.owners);

module.exports = OwnerRouter;
