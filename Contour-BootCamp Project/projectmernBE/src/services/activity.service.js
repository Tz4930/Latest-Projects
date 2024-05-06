const { Activity } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { ObjectId } = require("mongodb");

const getActivity = async () => {
  const getActivity = await Activity.find();
  return getActivity;
};

const createActivity = async (activityBody) => {
  return Activity.create(activityBody);
};
const getActivityById = async (id) => {
  return Activity.findById(id);
};

const updateActivity = async (activityId, updateBody) => {
  try {
    const activity = await getActivityById(activityId);
    if (!activity) {
        throw new ApiError(httpStatus.NOT_FOUND, "Actvity not found");
      }
      Object.assign(activity, updateBody);
      await activity.save();
      return activity;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};
const deleteActivity = async (activityId) => {
  try {
    const deletedItem= await Activity.findByIdAndDelete(activityId);
    if (!deletedItem) {
        throw new ApiError(httpStatus.NOT_FOUND, "Actvity not found");
      }
    return deletedItem;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
const pagination = async (page, limit) => {
  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 3;
  const skip = (pageNumber - 1) * pageSize;
  const totalUsers = await Activity.countDocuments();
  const totalPages = Math.ceil(totalUsers / pageSize);
  const getActivity = await Activity.find().skip(skip).limit(pageSize);
  return {
    getActivity,
    totalPages,
    currentPage: pageNumber,
  };
};
module.exports = {
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
  pagination,
};
