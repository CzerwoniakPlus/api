import express from 'express';
import privacyPolicyController from '../controller/privacyPolicy';
import statusController from '../controller/status';
import homeController from '../controller/home';
import luckyNumberController from '../controller/luckyNumber';


const router = express.Router();

router.get('/status', statusController);
router.get('/privacy', privacyPolicyController);
router.get('/home', homeController);
router.get('/luckynumber', luckyNumberController.getLuckyNumber);
router.post('/luckynumber', luckyNumberController.setLuckyNumber);

export = router;