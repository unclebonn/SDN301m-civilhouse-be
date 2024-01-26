import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './utils/connectDatabase';

dotenv.config();

const app = express();
const conn = connectToDB();

app.use(express.json());

//middleware
app.use(bodyParser.urlencoded({ extended: true }));

//Cấu hình đường dẫn đến thư mục chứa các file giao diện người dùng

app.listen(9999);
