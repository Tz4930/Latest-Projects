const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activity.controller");
router.get("/", activityController.getActivity);
router.get("/activityPage", activityController.getActivityPagination);
router.post("/save", activityController.saveActivity);
router
  .route('/:activityId')
  .delete( activityController.deleteActivity)
  .put( activityController.updateActivity);
module.exports = router;
