import bodyParser from 'body-parser';
import express from 'express';
import connectToDB from './utils/connectDatabase';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

import AppError from './utils/appError';
import globalErrorHandler from './controllers/error.controller';
import userRouter from './routes/user.route';
import requestTimeMiddleware from './middlewares/requestTimeMiddleware';
import morgan from 'morgan';
import buildingRouter from "./routes/building.route";
import materialRouter from "./routes/material.route";
import materialTypeRouter from "./routes/materialType.route";

const app = express();


// 1) GLOBAL MIDDLEWARES
// set security HTTP headers
app.use(helmet());

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
console.log('Env currently running on: ' + process.env.NODE_ENV);

// limit the number of requests from the same IP
// in this case, 100 requests per hour
const timeWindow = 60 * 60 * 1000; // 1 hour
const maxRequest = 100;

const limiter = rateLimit({
  max: maxRequest,
  windowMs: timeWindow,
  message: 'Too many requests from this IP, please try again in an hour!'
});

// apply the limiter to all routes that start with /api
app.use('/api', limiter);

// middleware to parse the body of the request into json
// limit the size of the body to 10kb
app.use(express.json({ limit: '10kb' }));

// middleware to parse the urlencoded body
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

const whitelist = [''];
// hpp - html param pollution will remove the duplicate parameter
app.use(
  hpp({
    whitelist: whitelist
  })
);

// middleware to serve static files
app.use(express.static(`${__dirname}/public`));

// 2) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/building', buildingRouter);


app.use('/api/v1/material', materialRouter);
app.use('/api/v1/materialType', materialTypeRouter);


// 3) ERROR HANDLING
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
