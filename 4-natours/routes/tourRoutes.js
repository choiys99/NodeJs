const express = require('express');
const tourController = require('./../controller/tourController');
const authController = require('./../controller/authController');

const router = express.Router();

// router.param('id', tourController.checkID); // url에서 id 매개변수가 들어올 때 마다 checkid 호출해서 유효성 체크

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours) // 사용자가 인증되지 않으면 오류 발생
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

module.exports = router;
