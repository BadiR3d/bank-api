import express from "express";
import "reflect-metadata";
import config from "./config/ormconfig";
import logger from "./utils/logger";
import accountRouter from "./routes/AccountRoutes";
import ensureDatabaseExists from "./scripts/ensureDatabaseExists";

const app = express();
app.use(express.json());
app.use(accountRouter);

ensureDatabaseExists()
  .then(() => {
    return config.initialize();
  })
  .then(() => {
    logger.info("Database connected succesfully");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  })
  .catch((error: any) => {
    logger.error(`Database connection failed: ${error}`);
  });
