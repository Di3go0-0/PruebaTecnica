import { DataTypes } from "sequelize";
import sequelize from '../database/db.js';
import Project from './project.model.js';

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  creationDate: {
    type: DataTypes.DATE
  },
  updateDate: {
    type: DataTypes.DATE
  },
  state: {
    type: DataTypes.ENUM('Pending', 'In progress', 'Completed'),
    allowNull: false,
    defaultValue: 'Pending'
  },
  projectId: {
    type: DataTypes.INTEGER,
    references: {
      model: Project,
      key: 'id'
    }
  }
}, {
  tableName: 'Tasks',
  timestamps: false
});

Task.belongsTo(Project, { foreignKey: 'projectId' });

export default Task;