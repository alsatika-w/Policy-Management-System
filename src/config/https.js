import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const httpsOptions = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keyPath = path.resolve(__dirname, '../certs/server.key');
const certPath = path.resolve(__dirname, '../certs/server.crt');

if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  httpsOptions.key = fs.readFileSync(keyPath);
  httpsOptions.cert = fs.readFileSync(certPath);
};
export default httpsOptions;