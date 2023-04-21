import express, { Express } from 'express';

import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { openai } from './openai';

dotenv.config();

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.post('/', async (req, res) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.question,
  });
  res.send(completion.data.choices[0].text);
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});