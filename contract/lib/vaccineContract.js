//import Hyperledger Fabric 1.4 SDK
const { Contract } = require('fabric-contract-api');
const path = require('path');
const fs = require('fs');

// connect to the vaccine data file
const vaccineDataPath = path.join(process.cwd(), './lib/data/vaccineData.json');
const vaccineDataJson = fs.readFileSync(vaccineDataPath, 'utf8');
const vaccineData = JSON.parse(vaccineDataJson);

//import our file which contains our constructors and auxiliary function
let Vaccination = require('./Vaccination.js');
let Person = require('./Person.js');
let Vaccine = require('./Vaccine.js');