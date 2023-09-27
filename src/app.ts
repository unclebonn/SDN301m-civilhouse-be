import http from 'http';
import requestHadler from './routes';

const server = http.createServer(requestHadler);

server.listen(3000);
