import { DataTypes } from "sequelize";
import sequelize from '../database/db.js';
import User from './user.model.js';

const Project = sequelize.define('Project', {
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
  startDate: {
    type: DataTypes.DATE
  },
  finalDate: {
    type: DataTypes.DATE
  },
  state: {
    type: DataTypes.ENUM('No started', 'In progress', 'Completed'),
    allowNull: false,
    defaultValue: 'No started'
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'Projects',
  timestamps: false
});

Project.belongsTo(User, { foreignKey: 'userId' });

export default Project;