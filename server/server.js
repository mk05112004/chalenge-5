const express = require("express");
const app = express();
const { url } = require("./Routes/url");
const { auth } = require("./Routes/auth");

const cors = require("cors")
const bodyParser = require("body-parser")

app.use(cors())
app.use(bodyParser.urlencoded({extended : false}))
app.use(express.urlencoded({extended : false}))
app.use(express.json())


app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello, world!" });
});


app.use("/api", url);
app.use("/auth", auth);


app.use("*", (req, res) => {
  return res.status(404).send("The Page Not Found 404");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("The server is working on port", PORT);
});

