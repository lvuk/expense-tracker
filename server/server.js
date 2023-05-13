import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import connectDB from './dbConnect.js';
import cors from 'cors';
import router from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3030;

//middlewares
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

//Router
app.get('/', (req, res) => {
  res.json({ message: 'Use docs to see available routes...' });
});
app.use('/api', router);

//DB
connectDB();
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}...`);
});
