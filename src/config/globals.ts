import dotenv from 'dotenv';

dotenv.config();

export const ENVIRONMENT = {
  APP: {
    PORT: process.env.PORT || 3000,
    LOG_LEVEL: process.env.LOG_LEVEL
  },
  DATABASE: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: parseInt(process.env.DB_PORT || '3306', 10),
    USERNAME: process.env.DB_USERNAME || 'root',
    PASSWORD: process.env.DB_PASSWORD || '',
    NAME: process.env.DB_NAME || 'bank',
  },
  AWS: {
    REGION: process.env.AWS_REGION || 'us-east-1',
    SNSTOPIARN: process.env.SNS_TOPIC_ARN || '',
  },
};
