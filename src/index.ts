import cors from 'cors';
import express, { Request, Response } from 'express';
import { loveCalculationAlgorithm } from './loveCalculationAlgorithm';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

function cappitalise(value: string) {
  return value[0].toUpperCase() + value.slice(1);
}

function loveMessage(value: number, personA: string, personB: string): string {
  personA = cappitalise(personA);
  personB = cappitalise(personB);

  if (value >= 90) return `${personA} and ${personB}, you both are perfect couple.`;
  else if (value >= 70)
    return `${personA} and ${personB} your relationship will be awesome carry on.`;
  else if (value >= 30)
    return `${personA} and ${personB} trust and care for each other everythings is gonna be ok.`;
  else
    return `${personA} and ${personB} this isn't going to greate relationship maybe find someone else.`;
}

app.get('/api/v1/calculate', (req: Request, res: Response) => {
  type RequestQuery = { personA: string; personB: string };
  try {
    const { personA, personB } = <RequestQuery>req.query;
    const result = loveCalculationAlgorithm(personA.toLowerCase(), personB.toLowerCase());

    res.status(200).json({ result, message: loveMessage(result, personA, personB) });
  } catch (e) {
    res.status(500).send({ name: (<Error>e).name, message: (<Error>e).message });
  }
});

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});
