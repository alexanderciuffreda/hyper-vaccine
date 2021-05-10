'use strict';
//swagger imports
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const path = require('path');
const fs = require('fs');

let network = require('./fabric/network.js');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);

//use this identity to query
const appAdmin = config.appAdmin;
// swagger endpoint
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//get all assets in world state
app.get('/queryAll', async (req, res) => {

  let networkObj = await network.connectToNetwork(appAdmin);
  let response = await network.invoke(networkObj, true, 'queryAll', '');
  let parsedResponse = await JSON.parse(response);
  res.send(parsedResponse);

});

//registerPerson -> Registers a new Person.
app.post('/registerPerson', async (req, res) => {
    console.log('req.body: ');
    console.log(req.body);
    let personID = req.body.personID;
  
    //first create the identity for the person and add to wallet
    let response = await network.registerPerson(personID, req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.type, req.body.email, req.body.phone);
    console.log('response from registerPerson: ');
    console.log(response);
    if (response.error) {
      res.send(response.error);
    } else {
      console.log('req.body.personID');
      console.log(req.body.personID);
      let networkObj = await network.connectToNetwork(personID);
      console.log('networkobj: ');
      console.log(networkObj);
  
      if (networkObj.error) {
        res.send(networkObj.error);
      }
      console.log('network obj');
      console.log(util.inspect(networkObj));
  
  
      req.body = JSON.stringify(req.body);
      let args = [req.body];
      //connect to network and update the state with voterId  
  
      let invokeResponse = await network.invoke(networkObj, false, 'createPerson', args);
      
      if (invokeResponse.error) {
        res.send(invokeResponse.error);
      } else {
  
        console.log('after network.invoke ');
        let parsedResponse = JSON.parse(invokeResponse);
        parsedResponse += '. Use personID to login above.';
        res.send(parsedResponse);
  
      }
  
    }
  
  });

//vaccinatePerson -> Vaccinates the person by adding the vaccination to the “vaccinations” list in the Person object and then pushing the “new” Person object to the world state. 
app.post('/vaccinatePerson', async (req, res) => {
    console.log('req:');
    console.log(req);
    console.log('res:');
    console.log(res);
    console.log('personID:' ,req.body.personID)
    let networkObj = await network.connectToNetwork(req.body.personID);
    console.log('util inspecting');
    console.log(util.inspect(networkObj));
    req.body = JSON.stringify(req.body);
    console.log('req.body');
    console.log(req.body);
    let args = [req.body];
  
    let response = await network.invoke(networkObj, false, 'vaccinatePerson', args);
    if (response.error) {
      res.send(response.error);
    } else {
      console.log('response: ');
      console.log(response);
      // let parsedResponse = await JSON.parse(response);
      res.send(response);
    }
  });



//queryByKey -> Looks through the world state for a person (PersoID),  
app.post('/queryByKey', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);

  let networkObj = await network.connectToNetwork(appAdmin);
  console.log('after network OBj');
  let response = await network.invoke(networkObj, true, 'readMyAsset', req.body.key);
  response = JSON.parse(response);
  if (response.error) {
    console.log('inside eRRRRR');
    res.send(response.error);
  } else {
    console.log('inside ELSE');
    res.send(response);
  }
});


app.listen(process.env.PORT || 8081);