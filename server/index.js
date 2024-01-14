const express = require("express");
const cors = require("cors");
const secretRouter = require("./routes/secret-route");

require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/secrets", secretRouter);

app.use("/api", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => console.log("App is running at 5000..."));
