import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import { Op } from 'sequelize';

export const createProject = async (req, res) => {
  const { name, description, startDate, finalDate, state } = req.body;
  try {
    // Convertir las fechas a objetos Date de JavaScript
    const startDateDate = new Date(startDate);
    const finalDateDate = new Date(finalDate);
    const currentDate = new Date();

    // Eliminar la hora, minutos, segundos y milisegundos
    currentDate.setHours(0, 0, 0, 0);
    startDateDate.setHours(0, 0, 0, 0);
    finalDateDate.setHours(0, 0, 0, 0);

    // Verificar que la fecha de inicio sea igual o posterior a la fecha actual
    if (startDateDate < currentDate) {
      return res.status(400).json({ message: "The start date must be equal to or later than the current date" });
    }

    // Verificar que la fecha de fin sea posterior a la fecha de inicio
    if (finalDateDate <= startDateDate) {
      return res.status(400).json({ message: "The end date must be after the start date" });
    }

    let userId = req.user.id; //Obtenemos el id del usuario que está logueado
    const project = await Project.create({
      name,
      description,
      startDate: startDateDate,
      finalDate: finalDateDate,
      state,
      userId,
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error creating Project" });
  }
};

export const getProjects = async (req, res) => {
  try {
    let userId = req.user.id; //Obtenemos el id del usuario que está logueado
    const projects = await Project.findAll({
      where: { userId },
      include: User,
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error getting projects" });
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    let userId = req.user.id; //Obtenemos el id del usuario que está logueado
    const project = await Project.findOne({
      where: { id, userId },
      include: User,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error getting project" });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, finalDate, state } = req.body;
  try{
    const project = await Project.findOne({ where: { id } });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if(! project.userId === req.user.id){
      return res.status(403).json({ message: "You do not have permission to update this project" });
    }

    // Convert the dates to JavaScript Date objects
    const startDateDate = new Date(startDate);
    const finalDateDate = new Date(finalDate);
    const currentDate = new Date();

    // Remove the hours, minutes, seconds and milliseconds
    currentDate.setHours(0, 0, 0, 0);
    startDateDate.setHours(0, 0, 0, 0);
    finalDateDate.setHours(0, 0, 0, 0);

    if(project.startDate < currentDate){
      return res.status(400).json({ message: "You cannot update a project that has already started" });
    }

    if(project.finalDate < currentDate){
      return res.status(400).json({ message: "You cannot update a project that has already ended" });
    }

    // Verify that the start date is equal to or later than the current date
    if (startDateDate < currentDate) {
      return res.status(400).json({ message: "The start date must be equal to or later than the current date" });
    }

    // Verify that the end date is later than the start date
    if (finalDateDate <= startDateDate) {
      return res.status(400).json({ message: "The end date must be later than the start date" });
    }

    await Project.update(
      { name, description, startDate, finalDate, state },
      { where: { id } }
    );
    res.json({ message: "Project updated successfully" });
  }catch(error){
    res.status(500).json({ message: "Error updating the project" });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findOne({ where: { id } });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if(! project.userId === req.user.id){
      return res.status(403).json({ message: "You do not have permission to delete this project" });
    }

    // Verify if the project has tasks
    const tasks = await Task.findAll({ where: { projectId: id } });
    if (tasks.length > 0) {
      return res.status(400).json({ message: "You cannot delete a project that has tasks" });
    }

    await Project.destroy({
      where: { id },
    });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the project" });
  }
};

export const seachProjects = async (req, res) => {
  const { type, content } = req.query;
  try {
    let userId = req.user.id; //Obtenemos el id del usuario que está logueado
    const projects = await Project.findAll({
      where: { 
        [type]: { 
          [Op.like]: `%${content.toLowerCase()}%` 
        }, 
        userId 
      },
      include: User,
    });
    if (projects.length > 0) {
      res.json(projects);
    } else {
      res.status(404).json({ message: "Projects not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error searching projects" });
  }
};