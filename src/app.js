// import dotenv from 'dotenv';
// dotenv.config();

import 'dotenv/config';
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_USER);

import express from 'express';
import cors from 'cors';
import https from 'https';
import httpsOptions from './config/https.js';
import authRoutes from './routes/auth-routes.js';
import policyRoutes from './routes/policy-routes.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/policies', policyRoutes);


app.get('/', (req, res) => {
  res.send('Policy Management API running with HTTPS');
});

const PORT = process.env.PORT || 5000;

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});