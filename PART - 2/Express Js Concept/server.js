import express from 'express';
import { corsConfiguration } from './Middlewares/corseConfig.middleware.js';
import { addTimeStamp, requestLogger } from './Middlewares/customMiddleware.js';
import { globalErrorHandler } from './Middlewares/errorHandler.js';
import { urlVersioning } from './Middlewares/apiVersioning.js';
import { createBasicRateLimiter } from './Middlewares/rateLimiting.js';

import itemRoutes from './routes/item.route.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(requestLogger);
app.use(addTimeStamp);

app.use(corsConfiguration());
app.use(createBasicRateLimiter(100, 15 * 60 * 1000)); // 100 requests per 15 minutes
app.use(express.json());

app.use(urlVersioning('v1'));
app.use('/api/v1', itemRoutes);

app.use(globalErrorHandler);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is listening on port ${PORT}`);
});