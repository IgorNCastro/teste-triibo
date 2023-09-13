const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM tasks.tasklist;';
  const [tasks] = await connection.execute(query);
  return tasks;
};

const createTask = async ({ title, description, status }) => {
  const query = 'INSERT INTO tasks.tasklist (title, description, status) VALUES (?, ?, ?)';
  return await connection.execute(query, [ title, description, status ]);
};

const deleteTask = async (id) => {
  const query = 'DELETE FROM tasks.tasklist WHERE id = ?';
  return await connection.execute(query, [ id ]);
};

const updateAllTask = async ({ title, description, status, id }) => {
  const query = 'UPDATE tasks.tasklist SET title = ?, description = ?, status = ? WHERE id = ?';
  return await connection.execute(query, [ title, description, status, id ]);
};

const updateTitle = async ({ title, id }) => {
  const query = 'UPDATE tasks.tasklist SET title = ? WHERE id = ?';
  return await connection.execute(query, [ title, id ]);
};

const updateDescription = async ({ description, id }) => {
  const query = 'UPDATE tasks.tasklist SET description = ? WHERE id = ?';
  return await connection.execute(query, [ description, id ]);
};

const updateStatus = async ({ status, id }) => {
  const query = 'UPDATE tasks.tasklist SET status = ? WHERE id = ?';
  return await connection.execute(query, [ status, id ]);
};

const searchTitle = async (title) => {
  const query = `SELECT * FROM tasks.tasklist WHERE title LIKE '%${title}%'`;
  const [tasks] = await connection.execute(query);
  return tasks;
};

const searchDescription = async (description) => {
  const query = `SELECT * FROM tasks.tasklist WHERE description LIKE '%${description}%'`;
  const [tasks] = await connection.execute(query);
  return tasks;
};

const searchStatus = async (status) => {
  const query = `SELECT * FROM tasks.tasklist WHERE status LIKE '%${status}%'`;
  const [tasks] = await connection.execute(query);
  return tasks;
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
