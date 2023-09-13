const express = require('express');
const tasksController = require('./controllers/tasksController');
const middlewares = require('./middlewares/validateTask');
const jwt = require('./middlewares/validateToken');

const router = express.Router();

router.get('/tasks', tasksController.getAll);

router.post('/tasks',
  middlewares.validateAll,
  tasksController.createTask
);

router.delete('/tasks/:id',
  jwt.checkToken,
  tasksController.deleteTask
);

router.put('/tasks/:id',
  jwt.checkToken,
  middlewares.validateAll,
  tasksController.updateAllTask
);

router.put('/tasks/:id/title',
  jwt.checkToken,
  middlewares.validateTitle,
  tasksController.updateTitle
);

router.put('/tasks/:id/description',
  jwt.checkToken,
  middlewares.validateDescription,
  tasksController.updateDescription
);

router.put('/tasks/:id/status',
  jwt.checkToken,
  middlewares.validateStatus,
  tasksController.updateStatus
);

router.get('/title',
  tasksController.searchTitle
)

router.get('/description',
  tasksController.searchDescription
)

router.get('/status',
  tasksController.searchStatus
)

module.exports = router;
