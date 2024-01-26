import { Request, Response, NextFunction } from 'express';

interface RequestWithTime extends Request {
  requestTime: string;
}

// đéo hiểu sao ko chạy được

const requestTimeMiddleware = (
  req: RequestWithTime,
  res: Response,
  next: NextFunction
) => {
  req.requestTime = new Date().toISOString();
  console.log('Request time middleware: ' + req.requestTime);
  // always use next() to continue the request-response cycle
  next();
};

export default requestTimeMiddleware;
