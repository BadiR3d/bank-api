import { Router } from 'express';
import { AccountController } from '../controllers/AccountController';

const accountRouter = Router();
const accountController = new AccountController();

accountRouter.post('/bank/withdraw', accountController.withdraw);
accountRouter.post('/bank/deposit', accountController.deposit);
accountRouter.get('/bank/get-balance', accountController.getBalance);

export default accountRouter;
