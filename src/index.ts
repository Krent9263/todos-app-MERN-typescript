import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import authRoutes from './routes/authRoutes';
import { connectDB } from './config/database';
import profileRoutes from './routes/profileRoutes';
import todoRoutes from './routes/todoRoutes';
import morgan from 'morgan';

dotenv.config();


const app = express();
app.use(express.json());
app.use(morgan('dev'));
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customSiteTitle: "API Todos App" }));

app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", todoRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

connectDB().catch((error) => {
  console.error('Failed to connect to the database:', error);
});

export default app;