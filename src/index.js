const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("../Utils/geoCode");
const foreCast = require("../Utils/forecast");

const app = express();
const pathOfPublicDir = path.join(__dirname, "../public");
const viewsTemplatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");



app.use(express.static(pathOfPublicDir));
app.set("view engine", "hbs");
app.set("views", viewsTemplatePath);
hbs.registerPartials(partialsPath);




app.get("", (req , res) => {
  res.render("index", {
    title: "Weather App",
    name: "Nikhil Ranjan Kumar",
    });
})
app.get("/about", (req , res) => {
  res.render("about", {
    title: "About Me",
    name: "Nikhil Ranjan Kumar",
    });
})
app.get("/help", (req , res) => {
  res.render("help", {
    title: "Help",
    pages : "lorem ipsum",
    name: "Nikhil Ranjan Kumar",
    });
})

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: "You must provide an address"
    })
  }

  geoCode( req.query.address, (error, data) => {
    if (error) {
      res.send({
        error: error
      })
    } else {
      foreCast(data, (error, datas) => {
        if (error) {
          res.send({
            error: error
          })
        } else {
         res.send({
            forecast: datas,
            location: data.location,
            address: req.query.address
         })
        }
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404",
    errorMessage: "Page not found",
  });
});


app.listen(3000);
