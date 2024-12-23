import { createConnection } from 'mysql2/promise';
import logger from '../utils/logger';
import { ENVIRONMENT } from '../config/globals';

async function ensureDatabaseExists() {
  const connection = await createConnection({
    host: ENVIRONMENT.DATABASE.HOST || 'localhost',
    port: Number(ENVIRONMENT.DATABASE.PORT) || 3306,
    user: ENVIRONMENT.DATABASE.USERNAME || 'root',
    password: ENVIRONMENT.DATABASE.PASSWORD || '',
  });

  const database = ENVIRONMENT.DATABASE.NAME || 'bank';

  // Check if the database exists
  const [rows] = await connection.query(
    `SHOW DATABASES LIKE '${database}'`
  );

  if ((rows as any[]).length === 0) {
    // Create the database if it doesn't exist
    await connection.query(`CREATE DATABASE ${database}`);
    logger.info(`Database '${database}' created successfully.`);
  } else {
    logger.info(`Database '${database}' already exists.`);
  }

  await connection.end();
}

ensureDatabaseExists().catch((error) => {
  logger.error(`Failed to ensure database exists: ${error.message}`);
  process.exit(1);
});

export default ensureDatabaseExists; 