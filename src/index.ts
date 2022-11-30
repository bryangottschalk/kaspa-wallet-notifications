import express, { Request, Response } from 'express';

const PORT = process.env.PORT || 8080;

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Listening for your wallet address...');
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
