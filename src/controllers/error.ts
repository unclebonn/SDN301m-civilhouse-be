import { RequestHandler } from 'express';

export default {
    get404: (_req, res, _next) => {
        // res.status(404).sendFile(path.join(rootDir, 'views', 'html', 'page-not-found.html')) //html thì chỉ cần vậy (sendFile method);
        res.status(404).render('page-not-found', { pageTitle: 'Page Not Found' });
    },
} as {
    [index: string]: RequestHandler;
};
