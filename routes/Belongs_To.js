const Belongs_ToController = new (require('../controllers/Belongs_ToController'))();
const Belongs_ToRouter = require('koa-router')({
        prefix: '/Belongs_To'
});

Belongs_ToRouter.get('/', Belongs_ToController.Belongs_Tos);
Belongs_ToRouter.get('/:Dog_ID/:Owner_ID', Belongs_ToController.Belongs_To);
Belongs_ToRouter.post('/', Belongs_ToController.addBelongs_To, Belongs_ToController.Belongs_Tos);
Belongs_ToRouter.put('/', Belongs_ToController.updateBelongs_To, Belongs_ToController.Belongs_Tos);
Belongs_ToRouter.delete('/', Belongs_ToController.deleteBelongs_To, Belongs_ToController.Belongs_Tos);

module.exports = Belongs_ToRouter;


