const express = require('express');
const app = express();
const port = 3000;
const https = require('https');
const url1 = "https://api.openweathermap.org/data/2.5/weather?";
const url2 = "&lang=de&APPID=fc35569047f551e86c948abc873d10a9";
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
  // q=Waldkraiburg, DE
  city = req.body.selectCity;
  console.log("Post received " + city);
  const url = url1 + "q=" + city + url2;
  https.get(url, (response) => {
    console.log('statusCode:', response.statusCode);
    console.log('headers:', response.headers);

    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temperature = (parseFloat(weatherData.main.temp)-273.15).toFixed(2);
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      res.write('<!DOCTYPE html> <html lang="de" dir="ltr" <head> \
          <meta charset="utf-8"> <title>Wetter</title> </head><body>');


      res.write("<h1>Die Temperatur ist "+
        temperature + " Grad Celsius. </h1>");
      res.write("<p> Das Wetter in " + city + " ist "+ description + "</p>");
      res.write("<img src='http://openweathermap.org/img/wn/" + icon
      + "@2x.png' alt='Wetter'>");

      res.write('  </body></html>');

      res.send();

    });

  }).on('error', (e) => {
    console.error(e);
  });



});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
