import { DataTypes, Model, Optional, Association, ForeignKey } from "sequelize";
import sequelize from "../../config/db";
import Task from "./task";

interface AttachmentAttributes {
  id: number;
  taskId: number;
  attachmentName: string;
  key: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
  fileUrl: string;
}

interface AttachmentCreationAttributes
  extends Optional<AttachmentAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Attachment
  extends Model<AttachmentAttributes, AttachmentCreationAttributes>
  implements AttachmentAttributes
{
  public id!: number;
  public taskId!: number;
  public attachmentName!: string;
  public key!: string;
  public type!: string;
  public fileUrl!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    task: Association<Attachment, Task>;
  };
}

Attachment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tasks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    attachmentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.VIRTUAL,
      get() {
        const serverUrl = "http://your-server.com"; // Replace with your actual server
        return `${serverUrl}/uploads/${this.key}`;
      },
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "attachments",
    modelName: "Attachment",
    timestamps: true,
  }
);

Attachment.belongsTo(Task, { foreignKey: "task_id", as: "task" });
