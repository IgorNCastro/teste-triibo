const tasksServices = require('../services/tasksServices');

const getAll = async (_req, res) => {
  try {
    const tasks = await tasksServices.getAll();
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const createdTask = await tasksServices.createTask(req.body);
    return res.status(201).json({ token: createdTask, message: 'Task created.' });
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    await tasksServices.deleteTask(req);
    return res.status(204).end();
  } catch (error) {
    console.log(error);
  }
};

const updateAllTask = async (req, res) => {
  try {
    const updatedTask = await tasksServices.updateAllTask(req);
    return res.status(201).json({ message: updatedTask });
  } catch (error) {
    console.log(error);
  }
};

const updateTitle = async (req, res) => {
  try {
    const updatedTask = await tasksServices.updateTitle(req);
    return res.status(201).json({ message: updatedTask });
  } catch (error) {
    console.log(error);
  }
};

const updateDescription = async (req, res) => {
  try {
    const updatedTask = await tasksServices.updateDescription(req);
    return res.status(201).json({ message: updatedTask });
  } catch (error) {
    console.log(error);
  }
};

const updateStatus = async (req, res) => {
  try {
    const updatedTask = await tasksServices.updateStatus(req);
    return res.status(201).json({ message: updatedTask });
  } catch (error) {
    console.log(error);
  }
};

const searchTitle = async (req, res) => {
  try {
    const searchedTask = await tasksServices.searchTitle(req.body);
    return res.status(201).json(searchedTask);
  } catch (error) {
    console.log(error);
  }
};

const searchDescription = async (req, res) => {
  try {
    const searchedTask = await tasksServices.searchDescription(req.body);
    return res.status(201).json(searchedTask);
  } catch (error) {
    console.log(error);
  }
};

const searchStatus = async (req, res) => {
  try {
    const searchedTask = await tasksServices.searchStatus(req.body);
    return res.status(201).json(searchedTask);
  } catch (error) {
    console.log(error);
  }
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
