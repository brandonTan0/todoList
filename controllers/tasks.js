const Task = require('../models/Tasks');
// @desc    Get all tasks
// @route   GET api/v1/tasks
// @access  Public
exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();

        return res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error GET'
        })
    }
}

// @desc    Add tasks
// @route   POST api/v1/tasks
// @access  Public
exports.addTasks = async (req, res, next) => {
    try {
        const { text } = req.body;
        const task = await Task.create(req.body);

        return res.status(201).json({
            success: true,
            data: task
        });
    } catch(err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            res.status(500).json({
                success: false,
                error: 'Server error POST'
            });
        }
    }

    
}

// @desc    Delete taks
// @route   DELETE api/v1/tasks/:id
// @access  Public
exports.deleteTasks = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }

        await task.deleteOne();

        return res.status(200).json({
            success: true,
            data: {}
        })

    } catch(err) {
        res.status(500).json({
            success: false,
            error: 'Server error DELETE'
        })
    }
}

// @desc Changes complete attribute true
// @route PUT api/v1/tasks/:id
// @access Public 
exports.completedTask = async (req,res,next) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({
                success: false,
                error: 'No task found'
            });
        }

        await task.updateOne( {
            "completed": true 
        })

        return res.status(200).json({
            success: true,
            data: task
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            error: 'Server error PUT'
        })
    }
}

// @desc Changes completed attribute false
// @route PUT api/v1/tasks/:id
// @access Public 
exports.undoComplete = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({
                success: false,
                error: 'No task found'
            })
        }

        await task.updateOne({
            "completed": false
        })

        return res.status(202).json({
            success: true,
            data: task
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error PUT'
        })
    }
}