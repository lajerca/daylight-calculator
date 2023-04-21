import express, { Application, Request, Response, json } from "express";

const app: Application = express();

const port = process.env.PORT || 8000;

interface GetSunriseDataParamsI {
  lat: number;
  lng: number;
  date: string;
}

const getSunriseData = async (params: GetSunriseDataParamsI) => {
  try {
    const { lat, lng, date } = params;
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}`;
    const data = await fetch(url);
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

app.use(json());

app.post("/", async (req: Request, res: Response) => {
  const { lat, lng, date } = req.body || {};

  if (!req.body || !lat || !lng || !date) {
    res.status(422).send("MISSING_PARAM");
    return;
  }

  // TODO additional validation/sanitize type and format

  const data = await getSunriseData({ lat, lng, date });
  if (data && data.status === "OK") res.send(data.results);
  else res.status(500).send("DATA_NOT_AVAILABLE");
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
