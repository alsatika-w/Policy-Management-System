// import dotenv from 'dotenv';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import https from 'https';
// import httpsOptions from './config/https.js';
import authRoutes from './routes/auth-routes.js';
import policyRoutes from './routes/policy-routes.js';


const app = express();

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow tools like curl or same-origin requests
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error('CORS policy: This origin is not allowed.'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/policies', policyRoutes);


app.get('/', (req, res) => {
  res.send('IT Knowledge Center API running with HTTP');
});

const PORT = process.env.PORT || 5000;

// https.createServer(httpsOptions, app).listen(PORT, () => {
//   console.log(`Server is running on https://localhost:${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});