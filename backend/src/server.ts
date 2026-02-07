import express from 'express';
import { setupRoutes } from './api.js';
import config from './config.js';
const PORT = config.port_backend
const HOST = config.host_backend
export function startServer(){
    const app: express.Application = express();
    setupRoutes(app);
    app.listen(PORT, HOST, () => {
        console.log(`Server running at http://${HOST}:${PORT}`); 
    });
}