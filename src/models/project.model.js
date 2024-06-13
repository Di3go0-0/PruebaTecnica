import { DataTypes } from "sequelize";
import sequelize from '../database/db.js';
import Usuario from './user.model.js';

const Proyecto = sequelize.define('Proyecto', {
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
  fechaInicio: {
    type: DataTypes.DATE
  },
  fechaFin: {
    type: DataTypes.DATE
  },
  estado: {
    type: DataTypes.ENUM('no iniciado', 'en progreso', 'completado'),
    allowNull: false,
    defaultValue: 'no iniciado'
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id'
    }
  }
}, {
  tableName: 'Proyectos',
  timestamps: false
});

Proyecto.belongsTo(Usuario, { foreignKey: 'usuarioId' });

export default Proyecto;