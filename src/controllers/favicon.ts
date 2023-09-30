import { RequestHandler } from 'express';

export default {
    getFaviconResponse: (_req, res, _next) => {
        res.status(204).end();
    },
} as {
    [index: string]: RequestHandler;
};
