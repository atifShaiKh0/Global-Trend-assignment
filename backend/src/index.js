import connectDB from './config/database.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import env from './config/env.js';
import { devLogger } from './middleware/logger.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

// Security and logging middleware
app.use(helmet());
app.use(devLogger);
app.use(cors({ origin: env.corsOrigin }));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/tasks', taskRoutes);

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const start = async () => {
  try {
      // Connect to MongoDB and start server
      await connectDB();
      app.listen(env.port, () => {
        console.log(`✓ Server running on http://localhost:${env.port}`);
        console.log(`✓ Environment: ${env.nodeEnv}`);
      });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();

export default app;
