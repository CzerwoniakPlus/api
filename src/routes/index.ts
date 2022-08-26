import express from 'express';
import privacyPolicyController from '../controller/privacyPolicy';
import statusController from '../controller/status';
import homeController from '../controller/home';
import luckyNumberController from '../controller/luckyNumber';
import lessonHoursController from '../controller/lessonHours';
import announcementsController from '../controller/announcements';
import lessonController from '../controller/lesson';
import vacationController from '../controller/vacation';
import schoolNewsController from '../controller/schoolNews';
import timetableURLController from '../controller/timetableURL';

const router = express.Router();

router.get('/status', statusController);
router.get('/privacy', privacyPolicyController);
router.get('/home', homeController);
router.get('/luckynumber', luckyNumberController.getLuckyNumber);
router.post('/luckynumber', luckyNumberController.setLuckyNumber);
router.get('/lessonhours', lessonHoursController.getLessonHours);
router.post('/shortlessons', lessonHoursController.setShortenedLessonsStatus);
router.get('/announcements', announcementsController.getAnnouncements);
router.post('/announcements', announcementsController.insertAnnouncement);
router.get('/lesson', lessonController);
router.get('/vacation', vacationController);
router.get('/news', schoolNewsController);
router.get('/timetableurl', timetableURLController);

export = router;