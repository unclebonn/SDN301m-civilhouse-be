import bodyParser from 'body-parser';
import express from 'express';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import path from 'path';
import rootDir from './utils/path';

const app = express();

app.use('/favicon.ico', (req, res, next) => {
    res.status(204).end();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', 'page-not-found.html'));
});

app.listen(3000);
