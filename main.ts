import express, { Application, NextFunction, Request, Response } from "express";
import { AppDataSource, config } from "./src/infrastructure";
import { appRouter } from "./src/module/application/routes/index";

const app: Application = express();

app.use(express.json());
app.use(appRouter);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Server error";
  const errors = error.errors || [];
  res.status(status).json({ message, errors });
});

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database Connected ✅");

    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Database Connection Error:", error);
    process.exit(1);
  }
};

startServer();
