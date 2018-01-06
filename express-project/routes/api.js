const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.js');
const positionController = require('../controllers/position.js');
const jobController = require('../controllers/job.js');
const upload = require("../utils/uploads")


router.post('/register',userControllers.register);
router.post('/login',userControllers.login);
router.get('/isLogin',userControllers.isLogin);
router.get('/logout',userControllers.logout);


router.post('/addPosition',upload.single('logo'), positionController.addPosition);
router.get('/removePosition', positionController.removePosition);
router.get('/getPositionList', positionController.getPositionList);
router.get('/getPosition', positionController.getPosition);
router.post('/updatePosition', upload.single('logo'), positionController.updatePosition);


router.post('/addJob', upload.single('logo'), jobController.addJob);
router.get('/removeJob', jobController.removeJob);
router.get('/getJobList', jobController.getJobList);
router.get('/getJob', jobController.getJob);
router.post('/updateJob', upload.single('logo'), jobController.updateJob);


module.exports = router;
