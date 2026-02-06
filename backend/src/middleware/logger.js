import morgan from 'morgan';
import env from '../config/env.js';

const morganFormat = env.nodeEnv === 'production' ? 'combined' : 'dev';

export const requestLogger = morgan(morganFormat, {
  skip: (req, res) => res.statusCode < 400,
});

export const devLogger = morgan(morganFormat);
