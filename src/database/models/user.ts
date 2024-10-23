import { DataTypes, Model } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../../config/db";

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public isLoggedIn!: boolean;

  public async matchPassword(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isLoggedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default value is false when a user is registered
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

User.beforeUpdate(async (user: User) => {
  if (user.changed("password")) {
    // Only hash the password if it has been changed
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

export default User;
