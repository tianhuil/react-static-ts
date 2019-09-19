import express from "express";

const PORT = 3001;

const app: express.Application = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening on port ${PORT}`);
});
