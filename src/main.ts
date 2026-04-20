import 'dotenv/config';
import express from 'express';
import { productRouter } from './infrastructure/services';
import { errorHandler } from './infrastructure/middlewares';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});

export default app;
