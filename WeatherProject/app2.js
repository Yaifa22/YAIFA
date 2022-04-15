const express = require('express');
const app = express();
const port = 3000;
const https = require('https');
const url = "https://api.openweathermap.org/data/2.5/weather?q=Waldkraiburg, DE&lang=de&APPID=fc35569047f551e86c948abc873d10a9";


app.get('/', (req, res) => {
  //res.send('<h1>Hello Taufkirchen!</h1> Noch ein Test');

  https.get(url, (response) => {
    console.log('statusCode:', response.statusCode);
    console.log('headers:', response.headers);

    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temperature = (parseFloat(weatherData.main.temp)-273.15).toFixed(2);
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      /*
      ---------- ATTENTION - only 1 send is allowed ------
      Thats why alternativly write can be used.

      Alternative method
      res.send("Die Temperatur ist "+
        temperature + " Grad Celsius. " +
      "Das Wetter ist "+ description);*/
      res.write("<h1>Die Temperatur ist "+
        temperature + " Grad Celsius. </h1>");
      res.write("<p> Das Wetter ist "+ description + "</p>");
      res.write("<img src='http://openweathermap.org/img/wn/" + icon
      + "@2x.png' alt='Wetter'>");
      res.send();

    });

  }).on('error', (e) => {
    console.error(e);
  });





});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
