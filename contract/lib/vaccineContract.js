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
//let Vaccine = require('./Vaccine.js');

class MyVaccineContract extends Contract{
    /**
     * this function creates initial data and gets application ready
     * @param ctx context of transaction
     * @returns the data which is added to world state
     */
    async init(ctx){
        console.log("init method called");
        
        let persons = [];

        // create persons
        let person1 = await new Person("12345", "Fixie", "Hartmann", 01012001,"patient","fixie@web.de", "015893655487");
        let person2 = await new Person("67890", "Hugo", "Boss", 01011999,"doctor","derboss@freenet.de", "01576783337");


        persons.push(person1);
        persons.push(person2);
        //add the voters to the world state, the election class checks for registered voters
        await ctx.stub.putState(person1.personID, Buffer.from(JSON.stringify(person1))); 
        await ctx.stub.putState(person2.personID, Buffer.from(JSON.stringify(person2)));

    }
}