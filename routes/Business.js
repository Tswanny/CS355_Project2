const BusinessController = new (require('../controllers/BusinessController'))();
const BusinessRouter = require('koa-router')({
        prefix: '/Business'
});

BusinessRouter.get('/', BusinessController.businesses);
BusinessRouter.get('/:Business_ID', BusinessController.business);
BusinessRouter.post('/', BusinessController.addBusiness, BusinessController.businesses);
BusinessRouter.put('/:Business_ID', BusinessController.updateBusiness, BusinessController.business);
BusinessRouter.delete('/:Business_ID', BusinessController.deleteBusiness, BusinessController.businesses);

module.exports = BusinessRouter;

