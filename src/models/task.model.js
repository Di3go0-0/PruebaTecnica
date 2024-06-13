import { DataTypes } from "sequelize";
import sequelize from '../database/db.js';
import Proyecto from './project.model.js';

const Tarea = sequelize.define('Tarea', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  fechaCreacion: {
    type: DataTypes.DATE
  },
  fechaActualizacion: {
    type: DataTypes.DATE
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'en progreso', 'completada'),
    defaultValue: 'pendiente',
    allowNull: false
  },
  proyectoId: {
    type: DataTypes.INTEGER,
    references: {
      model: Proyecto,
      key: 'id'
    }
  }
}, {
  timestamps: false
});

export default Tarea;