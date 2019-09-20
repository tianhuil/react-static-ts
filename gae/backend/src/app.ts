import cors from "cors";
import express from "express";
import { ContactStore, IContact } from "./model";

const host = process.env.BACKEND_HOST;
if (host === undefined) {
  throw new Error("Ned to set environment variable");
}
const port = host.split(":")[1];

const app: express.Application = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.post("/add", async (req, res) => {
  // tslint:disable-next-line:no-console
  console.log(req.body);
  const id = await ContactStore.add(req.body as IContact);
  res.json({id});
});

const maxLimit = 50

app.get("/list", async (req, res) => {
  const { cursor, limit } = req.query;
  const safeLimit = Math.min(parseInt(limit || maxLimit, 10), maxLimit);

  const [results, endCursor] = await ContactStore.list(cursor, safeLimit);
  res.json({results, endCursor});
});

app.use((req, res, next) => {
  res.status(404).send("No endpoint found!");
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening on port ${port}`);
});
