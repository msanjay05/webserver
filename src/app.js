const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { request } = require("http");

const app = express();
const port=process.env.PORT || 3000
// define path for expres config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

// setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);
// set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "sanjay kumar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
    name: "sanjay kumar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helptext: "some helpful text",
    title: "help page",
    name: "sanjay kumar",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send("you must provide a search term");
  }
  res.send({
    prodcuts: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({error:"you must provide a address to get forecast"});
  }
  geoCode.geoCode(
    encodeURIComponent(req.query.address),
    (error, { latitude = 0, longitude = 0, place_name = "" }={}) => {
      if (error) {
        return res.send({ error });
      }
      forecast.forecast(latitude, longitude, (forecastError, forecastData) => {
        if (forecastError) {
          return res.send({ forecastError });
        }
        res.send({
          forecast: forecastData,
          location: place_name,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    error: "help article not found",
    title: "help page",
    name: "sanjay kumar",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    error: "page not found",
    title: "help page",
    name: "sanjay kumar",
  });
});
app.listen(port, () => {
  console.log("server running on port 3000");
});
