import Proyecto from "../models/project.model.js";
import Usuario from "../models/user.model.js";

export const createProject = async (req, res) => {
  const { nombre, descripcion, fechaInicio, fechaFin, estado } = req.body;
  try {
    // Convertir las fechas a objetos Date de JavaScript
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    const currentDate = new Date();

    // Eliminar la hora, minutos, segundos y milisegundos
    currentDate.setHours(0, 0, 0, 0);
    fechaInicioDate.setHours(0, 0, 0, 0);
    fechaFinDate.setHours(0, 0, 0, 0);

    // Verificar que la fecha de inicio sea igual o posterior a la fecha actual
    if (fechaInicioDate < currentDate) {
      return res.status(400).json({ message: "La fecha de inicio debe ser igual o posterior a la fecha actual" });
    }

    // Verificar que la fecha de fin sea posterior a la fecha de inicio
    if (fechaFinDate <= fechaInicioDate) {
      return res.status(400).json({ message: "La fecha de fin debe ser posterior a la fecha de inicio" });
    }

    
    let usuarioId = req.user.id; //Obtenemos el id del usuario que está logueado
    const project = await Proyecto.create({
      nombre,
      descripcion,
      fechaInicio,
      fechaFin,
      estado,
      usuarioId,
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el Proyecto" });
  }
};

export const getProjects = async (req, res) => {
  try {
    let usuarioId = req.user.id; //Obtenemos el id del usuario que está logueado
    const projects = await Proyecto.findAll({
      where: { usuarioId },
      include: Usuario,
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los proyectos" });
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    let usuarioId = req.user.id; //Obtenemos el id del usuario que está logueado
    const project = await Proyecto.findOne({
      where: { id, usuarioId },
      include: Usuario,
    });
    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el proyecto" });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fechaInicio, fechaFin, estado } = req.body;
  try{
    const project = await Proyecto.findOne({ where: { id } });
    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    if(! project.usuarioId === req.user.id){
      return res.status(403).json({ message: "No tienes permisos para actualizar este proyecto" });
    }

    // Convertir las fechas a objetos Date de JavaScript
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    const currentDate = new Date();

    // Eliminar la hora, minutos, segundos y milisegundos
    currentDate.setHours(0, 0, 0, 0);
    fechaInicioDate.setHours(0, 0, 0, 0);
    fechaFinDate.setHours(0, 0, 0, 0);

    if(project.fechaInicio < currentDate){
      return res.status(400).json({ message: "No puedes actualizar un proyecto que ya ha iniciado" });
    }

    if(project.fechaFin < currentDate){
      return res.status(400).json({ message: "No puedes actualizar un proyecto que ya ha finalizado" });
    }

    // Verificar que la fecha de inicio sea igual o posterior a la fecha actual
    if (fechaInicioDate < currentDate) {
      return res.status(400).json({ message: "La fecha de inicio debe ser igual o posterior a la fecha actual" });
    }

    // Verificar que la fecha de fin sea posterior a la fecha de inicio
    if (fechaFinDate <= fechaInicioDate) {
      return res.status(400).json({ message: "La fecha de fin debe ser posterior a la fecha de inicio" });
    }

    await Proyecto.update(
      { nombre, descripcion, fechaInicio, fechaFin, estado },
      { where: { id } }
    );
    res.json({ message: "Proyecto actualizado correctamente" });
  }catch(error){
    res.status(500).json({ message: "Error al actualizar el proyecto" });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Proyecto.findOne({ where: { id } });
    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    if(! project.usuarioId === req.user.id){
      return res.status(403).json({ message: "No tienes permisos para eliminar este proyecto" });
    }
    await Proyecto.destroy({
      where: { id },
    });
    res.json({ message: "Proyecto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el proyecto" });
  }
};
