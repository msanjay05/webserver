const request = require("request");

const forecast = (latitude, longitde, callback) => {
  const url =
  "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitde+"&appid=3fdea4fa94b92e2be61c8de4fa30cddd"
  request({ url: url, json: true }, (error, {body,message}) => {
      if(error)
      {
        callback('unable to connect to weather api');
      }
      else if(message)
      {
          callback('Wrong latitude or longitude enter');
      }
      else
      {
          callback(undefined,' temperature is '+body.main.temp)
      }
  });
};

module.exports={
    forecast:forecast
}
