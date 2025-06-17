import pino from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development';

// Create logger instance
export const logger = pino({
  level: isDevelopment ? 'debug' : 'info',
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
  formatters: {
    level: (label: string) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

// Helper functions for common logging patterns
export const loggerHelpers = {
  // API request logging
  apiRequest: (method: string, url: string, data?: any) => {
    logger.info({ method, url, data }, 'API Request');
  },
  
  apiResponse: (method: string, url: string, status: number, data?: any) => {
    logger.info({ method, url, status, data }, 'API Response');
  },
  
  // Error logging with context
  errorWithContext: (error: Error, context: Record<string, any>) => {
    logger.error({ error: error.message, stack: error.stack, ...context }, 'Error occurred');
  },
  
  // User action logging
  userAction: (userId: string, action: string, details?: any) => {
    logger.info({ userId, action, details }, 'User Action');
  },
  
  // Performance logging
  performance: (operation: string, duration: number, metadata?: any) => {
    logger.info({ operation, duration, metadata }, 'Performance Metric');
  },
};

export default logger;