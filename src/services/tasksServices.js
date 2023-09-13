const tasksModel = require('../models/tasksModel');
const jwtToken = require('../helpers/jwtToken');

const getAll = async () => {
  const tasks = await tasksModel.getAll();
  return tasks;
};

const createTask = async (body) => {
  const { title, description, status } = body;
  await tasksModel.createTask({ title, description, status });
  const token = jwtToken.createToken(title);
  return token;
};

const deleteTask = async (req) => {
  const { id } = req.params;
  return await tasksModel.deleteTask(id);
};

const updateAllTask = async (req) => {
  const { title, description, status } = req.body;
  const { id } = req.params;
  await tasksModel.updateAllTask({ title, description, status, id });
  return 'Task updated.';
};

const updateTitle = async (req) => {
  const { title } = req.body;
  const { id } = req.params;
  await tasksModel.updateTitle({ title, id });
  return 'Task title updated.';
};

const updateDescription = async (req) => {
  const { description } = req.body;
  const { id } = req.params;
  await tasksModel.updateDescription({ description, id });
  return 'Task description updated.';
};

const updateStatus = async (req) => {
  const { status } = req.body;
  const { id } = req.params;
  await tasksModel.updateStatus({ status, id });
  return 'Task status updated.';
};

const searchTitle = async (query) => {
  const { q } = query;
  const searchedTasks = await tasksModel.searchTitle(q);
  return searchedTasks;
};

const searchDescription = async (query) => {
  const { q } = query;
  const searchedTasks = await tasksModel.searchDescription(q);
  return searchedTasks;
};

const searchStatus = async (query) => {
  const { q } = query;
  const searchedTasks = await tasksModel.searchStatus(q);
  return searchedTasks;
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateAllTask,
  updateTitle,
  updateDescription,
  updateStatus,
  searchTitle,
  searchDescription,
  searchStatus
};
