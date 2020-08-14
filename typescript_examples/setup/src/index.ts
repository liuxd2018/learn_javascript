import express from 'express';

import { past } from './past.js';
import { future } from './future.js';
const app = express();

app.get('/:age', (req, res) => {
  res.send(past(req.params.age, 10) + future(req.params.future, 10));
});

app.listen(3000);
