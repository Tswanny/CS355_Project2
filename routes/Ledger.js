const LedgerController = new (require('../controllers/LedgerController'))();
const LedgerRouter = require('koa-router')({
        prefix: '/Ledger'
});

LedgerRouter.get('/', LedgerController.ledgers);
LedgerRouter.get('/:Owner_ID/:Business_ID/:Dog_ID/:Stamp', LedgerController.ledger);
LedgerRouter.post('/:Owner_ID/:Business_ID/:Dog_ID/:Cost/:Satisfied/:Visit_Log', LedgerController.addLedger, LedgerController.ledgers);
LedgerRouter.put('/:Owner_ID/:Business_ID/:Dog_ID/:Stamp/:Cost/:Satisfied/:Visit_Log', LedgerController.updateLedger, LedgerController.ledger);
LedgerRouter.delete('/:Owner_ID/:Business_ID/:Dog_ID/:Stamp', LedgerController.deleteLedger, LedgerController.ledgers);

module.exports = LedgerRouter;

