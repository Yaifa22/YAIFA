const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html');
  res.sendfile(__dirname+"/index.html");
});

app.post('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html');
  var result = parseFloat(req.body.num2)+parseFloat(req.body.num1)
  res.send("Ergebnis : "+result);
});

app.get('/contact', (req, res) => {
  res.send('<h1>Hello Kontakte!</h1> Noch ein Test');
});

app.get('/impressum', (req, res) => {
  res.send('<h1>Impressum</h1> Noch ein Test');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
