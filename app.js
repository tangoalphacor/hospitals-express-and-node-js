const express = require('express');
const fs = require('fs');

const app = express();

// Set up a route to retrieve a list of all hospitals
app.get('/hospitals', (req, res) => {
  // Read the JSON file and parse the data
  const data = fs.readFileSync('./hospitals.json', 'utf8');
  const hospitals = JSON.parse(data);

  // Send the list of hospitals as the response
  res.send(hospitals);
});

// Set up a route to retrieve a specific hospital by its name
app.get('/hospitals/:name', (req, res) => {
  // Read the JSON file and parse the data
  const data = fs.readFileSync('./hospitals.json', 'utf8');
  const hospitals = JSON.parse(data);

  // Find the hospital with the matching name
  const hospital = hospitals.find(h => h.name === req.params.name);

  // Send the hospital as the response
  res.send(hospital);
});

// Set up a route to add a new hospital
app.post('/hospitals', (req, res) => {
  // Read the JSON file and parse the data
  const data = fs.readFileSync('./hospitals.json', 'utf8');
  const hospitals = JSON.parse(data);

  // Add the new hospital to the list
  hospitals.push(req.body);

  // Write the updated list of hospitals back to the JSON file
  fs.writeFileSync('./hospitals.json', JSON.stringify(hospitals));

  // Send a success response
  res.send({ message: 'Hospital added successfully' });
});

// Set up a route to update the patient count for a hospital
app.put('/hospitals/:name/patient_count', (req, res) => {
  // Read the JSON file and parse the data
  const data = fs.readFileSync('./hospitals.json', 'utf8');
  const hospitals = JSON.parse(data);

  // Find the hospital with the matching name
  const hospital = hospitals.find(h => h.name === req.params.name);

  // Update the patient count for the hospital
  hospital.patient_count = req.body.patient_count;

  // Write the updated list of hospitals back to the JSON file
  fs.writeFileSync('./hospitals.json', JSON.stringify(hospitals));

  // Send a success response
  res.send({ message: 'Patient count updated successfully' });
});
// Set up a route to delete a hospital
app.delete('/hospitals/:name', (req, res) => {
    // Read the JSON file and parse the data
    const data = fs.readFileSync('./hospitals.json', 'utf8');
    const hospitals = JSON.parse(data);
  
    // Find the index of the hospital with the matching name
    const hospitalIndex = hospitals.findIndex(h => h.name === req.params.name);
  
    // Remove the hospital from the list
    hospitals.splice(hospitalIndex, 1);
  
    // Write the updated list of hospitals back to the JSON file
    fs.writeFileSync('./hospitals.json', JSON.stringify(hospitals));
  
    // Send a success response
    res.send({ message: 'Hospital deleted successfully' });
  });
  
  // Start the server
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
  