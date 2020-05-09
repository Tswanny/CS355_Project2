const Owner_Phone_NumberController = new (require('../controllers/Owner_Phone_NumberController'))();
const Owner_Phone_NumberRouter = require('koa-router')({
        prefix: '/Owner_Phone_Number'
});

Owner_Phone_NumberRouter.get('/', Owner_Phone_NumberController.Owner_Phone_Numbers);
Owner_Phone_NumberRouter.get('/:Owner_ID/:Owner_Num', Owner_Phone_NumberController.Owner_Phone_Number);
Owner_Phone_NumberRouter.post('/:Owner_ID/:Owner_Num', Owner_Phone_NumberController.addOwner_Phone_Number, Owner_Phone_NumberController.Owner_Phone_Numbers);
Owner_Phone_NumberRouter.put('/:New_Num/:Owner_ID/:Owner_Num', Owner_Phone_NumberController.updateOwner_Phone_Number, Owner_Phone_NumberController.Owner_Phone_Numbers);
Owner_Phone_NumberRouter.delete('/:Owner_ID/:Owner_Num', Owner_Phone_NumberController.deleteOwner_Phone_Number, Owner_Phone_NumberController.Owner_Phone_Numbers);

module.exports = Owner_Phone_NumberRouter;

