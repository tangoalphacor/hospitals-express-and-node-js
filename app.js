const express = require("express");
const app = new express();
const fs = require("fs");
app.use(express.json());
const data = require("./hospitals.json");

//Get Hospital Datas
app.get("/hospitals", (req, res) => {
  res.send(data);
});
//POST Hospial Data
app.post("/hospitals", (req, res) => {
  data.push(req.body);
  fs.writeFile("hospitals.json", JSON.stringify(data), (err, resp) => {
    if (err) {
      res.send("Data can not return");
    } else {
      res.send("Data Added Successfully");
    }
  });
});

//PUT Request
app.put("/hospitals/:name", (req, res) => {
  let name = req.params.name;
  data.forEach((item) => {
    if (item.HospitalName == name) {
      item.PatientCount = req.body.PatientCount;
      item.HospitalLocation = req.body.HospitalLocation;
    }
  });
  fs.writeFile("hospitals.json", JSON.stringify(data), (err, resp) => {
    if (err) {
      res.send("Data could not be updated");
    } else {
      res.send("Data updated");
    }
  });
});

//DELTE request
app.delete("/hospitals/:name", (req, res) => {
  let name = req.params.name;
  let value = data.filter((item) => item.HospitalName !== name);
  fs.writeFile("hospitals.json", JSON.stringify(value), (err, resp) => {
    if (err) {
      res.send("Data could not be deleted");
    } else {
      res.send("Data deleted");
    }
  });
});
app.listen(3000);
console.log("Server Listening to port 3000");