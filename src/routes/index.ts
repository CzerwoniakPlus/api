import express from 'express';
import privacyPolicyController from '../controller/privacyPolicy';
import statusController from '../controller/status';
import homeController from '../controller/home';


const router = express.Router();

router.get('/status', statusController);
router.get('/privacy', privacyPolicyController);
router.get('/home', homeController);

export = router;