import Task from "../models/task.model.js";
import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import { Op } from 'sequelize';

export const createTask = async (req, res) => {
  const { name, description, state, projectId } = req.body;
  try {
    const project = await Project.findOne({ where: { id: projectId } });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.userId !== req.user.id) {
      return res.status(403).json({
        message: "You do not have permission to create a task in this project",
      });
    }

    const creationDate = Date.now();
    const updateDate = Date.now();

    const task = await Task.create({
      name,
      description,
      state,
      creationDate,
      updateDate,
      projectId,
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [{
        model: Project,
        where: { userId: req.user.id },
        attributes: []
      }]
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks" });
  }
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id }, include: Project });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.Project.userId !== req.user.id) {
      return res.status(403).json({ message: "You do not have permission to get this task " });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error getting task" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, state } = req.body;
  try {
    const task = await Task.findOne({ where: { id }, include: Project });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.Project.userId !== req.user.id) {
      return res.status(403).json({ message: "You don't have permission to update this task" });
    }

    const updateDate = Date.now();
    await Task.update({ name, description, state, updateDate }, { where: { id } });

    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id }, include: Project });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.Project.userId !== req.user.id) {
      return res.status(403).json({ message: "You don't have permission to delete this task " });
    }

    await Task.destroy({ where: { id } });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

export const searchTasks = async (req, res) => {
  const { type, content } = req.query;
  try {
    let userId = req.user.id; //Obtenemos el id del usuario que está logueado
    const tasks = await Task.findAll({
      include: [{
        model: Project,
        where: { userId },
        attributes: []
      }],
      where: { 
        [type]: { 
          [Op.like]: `%${content.toLowerCase()}%` 
        }
      }
    });
    if (tasks.length > 0) {
      res.json(tasks);
    } else {
      res.status(404).json({ message: "Tasks not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error searching tasks" });
  }
};