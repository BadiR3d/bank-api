import express from 'express';
import 'reflect-metadata';
import config from './config/ormconfig';
import logger from './utils/logger';
import accountRouter from './routes/AccountRoutes';

const app = express();
app.use(express.json());
app.use(accountRouter)

config.initialize()
.then(() => {
  logger.info('Database connected succesfully')
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
})
.catch((error) => {
  logger.error(`Database connection failed: ${error}`);
})
