import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import { notFound, errorHandler } from "./middleware/errorHandler";
import sequelize from "./config/db";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

sequelize.sync().then(() => {
  console.log("Database connected");
});

export default app;

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// import express, { Request, Response } from "express";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();

// app.get("/test", (req: Request, res: Response) => {

// });
