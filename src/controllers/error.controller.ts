import { RequestHandler } from 'express';

export const get404: RequestHandler = (_req, res, _next) => {
    // res.status(404).sendFile(path.join(rootDir, 'web_page', 'views', 'html', 'page-not-found.html')) //html thì chỉ cần vậy (sendFile method);
    res.status(404).render('page-not-found', { pageTitle: 'Page Not Found' });
};
