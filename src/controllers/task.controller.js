import Tarea from "../models/task.model.js";
import Proyecto from "../models/project.model.js";
import Usuario from "../models/user.model.js";

export const createTask = async (req, res) => {
  const { nombre, descripcion, estado, proyectoId } = req.body;
  try {
    // Verificar si el proyecto existe
    const proyecto = await Proyecto.findById(proyectoId);
    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    // Verificar si el usuario que creó el proyecto es el mismo que está intentando crear la tarea
    if (proyecto.usuarioId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          message: "No tienes permiso para crear tareas en este proyecto",
        });
    }

    const fechaCreacion = Date.now();
    const fechaActualizacion = Date.now();

    // Crear una nueva tarea
    const tarea = new Tarea({
      nombre,
      descripcion,
      estado,
      fechaCreacion,
      fechaActualizacion,
      proyecto: proyectoId,
    });

    // Guardar la tarea en la base de datos
    const savedTask = await tarea.save();

    // Enviar la tarea guardada como respuesta
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};


export const getTasks = async (req, res) => {
  try {
    // Obtener todos los proyectos que pertenecen al usuario
    const proyectos = await Proyecto.findAll({
      where: { usuarioId: req.user.id },
    });

    // Obtener todos los IDs de los proyectos
    const proyectoIds = proyectos.map((proyecto) => proyecto.id);

    // Obtener todas las tareas que pertenecen a los proyectos
    const tareas = await Tarea.findAll({
      where: { proyectoId: proyectoIds },
    });

    // Enviar las tareas como respuesta
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    // Obtener la tarea
    const tarea = await Tarea.findById(id);
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Obtener el proyecto asociado a la tarea
    const proyecto = await Proyecto.findById(tarea.proyectoId);

    // Verificar si el usuario que creó el proyecto es el mismo que el usuario logueado
    if (proyecto.usuarioId.toString() !== req.user.id) {
      return res.status(403).json({ message: "No tienes permiso para ver esta tarea" });
    }

    // Enviar la tarea como respuesta
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la tarea" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body;
  try {
    // Obtener la tarea
    const tarea = await Tarea.findById(id);
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Obtener el proyecto asociado a la tarea
    const proyecto = await Proyecto.findById(tarea.proyectoId);
    
    // Verificar si el usuario que creó el proyecto es el mismo que el usuario logueado
    if (proyecto.usuarioId.toString() !== req.user.id) {
      return res.status(403).json({ message: "No tienes permiso para actualizar esta tarea" });
    }

    // Actualizar la tarea
    const fechaActualizacion = Date.now();
    await Tarea.update({ nombre, descripcion, estado, fechaActualizacion }, { where: { id } });

    // Enviar un mensaje de éxito
    res.json({ message: "Tarea actualizada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};


export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    // Obtener la tarea
    const tarea = await Tarea.findById(id);
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Obtener el proyecto asociado a la tarea
    const proyecto = await Proyecto.findById(tarea.proyectoId);
    
    // Verificar si el usuario que creó el proyecto es el mismo que el usuario logueado
    if (proyecto.usuarioId.toString() !== req.user.id) {
      return res.status(403).json({ message: "No tienes permiso para eliminar esta tarea" });
    }

    // Eliminar la tarea
    await Tarea.destroy({ where: { id } });

    // Enviar un mensaje de éxito
    res.json({ message: "Tarea eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};
