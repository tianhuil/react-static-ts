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
  app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
}

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.options("/add", cors());
app.post("/add", async (req, res) => {
  const id = await ContactStore.add(req.body as IContact);
  res.json({id});
});

app.get("/list", async (req, res) => {
  const [results, endCursor] = await ContactStore.list("", 10);
  res.json({results, endCursor});
});

app.use((req, res, next) => {
  res.status(404).send("No endpoint found!");
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening on port ${port}`);
});
