const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar tarea (completar)
router.patch('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            task.completed = !task.completed;
            await task.save();
            res.json(task);
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eliminar tarea
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            await task.remove();
            res.json({ message: 'Tarea eliminada' });
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
