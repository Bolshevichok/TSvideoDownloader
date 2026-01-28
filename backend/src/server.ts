import express from 'express';
import { setupRoutes } from './api.js';

export function startServer(){
    const app: express.Application = express();
    const PORT = 3000;
    setupRoutes(app);
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`); 
    });
}