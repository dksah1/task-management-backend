import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";
import User from "./user";

interface TaskAttributes {
  id?: number;
  title: string;
  description: string;
  dueDate: Date;
  createdBy: number;
  status: string;
}

class Task extends Model<TaskAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public dueDate!: Date;
  public createdBy!: number;
  public status!: string;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["completed", "incomplete"],
      defaultValue: "incomplete",
    },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Define associations
User.hasMany(Task, { foreignKey: "createdBy" });
Task.belongsTo(User, { foreignKey: "createdBy" });

export default Task;
