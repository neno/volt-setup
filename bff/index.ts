import express from "express";
import cors from "cors";

var counter = 0;

const app = express();
const port = 8080;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from bff");
});

app.get("/count", (req, res) => {
  counter += 1;
  const result = JSON.stringify({ counter })
  res.send(result);
});

app.listen(port, () => {
  console.log(`bff listening at http://localhost:${port}`);
});
