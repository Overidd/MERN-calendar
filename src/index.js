import express from 'express';
import cors from 'cors';
import { env } from './envs/index.js';
import { dbConnection } from './database/index.js';
import { AuthRouter } from './router/auth.router.js';
import { EventRouter } from './router/event.router.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', AuthRouter.init());
app.use('/api/event', EventRouter.init());


app.listen(env.PORT, () => {
   dbConnection();
   console.log(`Server running on port ${env.PORT}`);
})

