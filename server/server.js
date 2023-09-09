const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();
const shortid = require("shortid")
let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data.json")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ messages: "hello world" });
});



app.post("/api/shorten", (req, res) => {
    const { url } = req.body;
    const shortUrl = shortid.generate();
    
    data = { short: shortUrl, long: url }
    
    fs.writeFileSync(path.resolve(__dirname, "data.json"), JSON.stringify(data));
    
    return res.status(200).json({ shortUrl, longUrl: url });
  });


app.get("/:shortUrl", (req, res) => {
  return res.redirect(data.long)
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("the server is work in port ", PORT);
});
