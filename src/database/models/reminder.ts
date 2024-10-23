import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

interface ReminderAttributes {
  id: number;
  reminderDay: number;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ReminderCreationAttributes
  extends Optional<ReminderAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Reminder
  extends Model<ReminderAttributes, ReminderCreationAttributes>
  implements ReminderAttributes
{
  public id!: number;
  public reminderDay!: number;
  public type!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Reminder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reminderDay: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "reminders", // Use pluralized table name by convention
    modelName: "Reminder",
    timestamps: true, // Ensure timestamps are generated automatically
  }
);
