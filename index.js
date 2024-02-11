const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");
app.use(express.static("public"));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/get-data", (req, res) => {
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(data);
  })
})