const httpStatus = require("http-status");
const { activityService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { ObjectId } = require("mongodb");

const getActivity = catchAsync(async (req, res, next) => {
  try {
    const result = await activityService.getActivity();
    res.send({ result, msg: "Get Successful!", status: 200 });
  } catch (error) {
    next(error);
  }
});
const getActivityPagination = catchAsync(async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await activityService.pagination(page, limit);
    res.send({ result, msg: "Get Successful!", status: 200 });
  } catch (error) {
    next(error);
  }
});
const saveActivity = catchAsync(async (req, res, next) => {
  try {
    const saveActivity = {
      activitytype: req.body.activitytype,
      description: req.body.description,
      date: req.body.date,
      duration: req.body.duration,
    };
    const result = await activityService.createActivity(saveActivity);
    res.status(httpStatus.CREATED).send({
      result,
      msg: "Activity Created Successful!",
      status: 200,
      success: "Success",
    });
  } catch (error) {
    next(error);
  }
});

const updateActivity = catchAsync(async (req, res, next) => {
  const id = req.params.activityId;

  try {
    const activityList = {
      activitytype: req.body.activitytype,
      description: req.body.description,
      date: req.body.date,
      duration: req.body.duration,
    };
    const activity = await activityService.updateActivity(id, activityList);
    if (!activity) {
      throw new ApiError(httpStatus.NOT_FOUND, "Activity not found");
    }
    res.send({
      activity,
      msg: "Updated Successful!",
      status: 200,
      success: "Success",
    });
  } catch (error) {
    next(error);
  }
});

const deleteActivity = catchAsync(async (req, res, next) => {
  try {
    const result = await activityService.deleteActivity(req.params.activityId);
    res.send({ result, msg: "Deleted Successful!", status: 200 });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getActivity,
  saveActivity,
  deleteActivity,
  updateActivity,
  getActivityPagination,
};
