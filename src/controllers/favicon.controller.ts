import { RequestHandler } from 'express';

export const getFaviconResponse: RequestHandler = (_req, res, _next) => {
    res.status(204).end();
};
