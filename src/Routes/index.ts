import express from 'express';

import status from 'Controllers/status';

const app = express();

app.get('/', status);

export default app;