const express = require('express');
const router = express.Router();
const { getTasks, addTasks, deleteTasks, completedTask, undoComplete} = require('../controllers/tasks');

router
    .route('/')
    .get(getTasks)
    .post(addTasks);

router
    .route('/:id')
    .delete(deleteTasks)
    .put(completedTask)

router
    .route('/:id/undo')
    .put(undoComplete)

module.exports = router;