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
        let person1 = await new Person("12345", "Fixie", "Hartmann", "01012001","patient","fixie@web.de", "015893655487");
        let person2 = await new Person("67890", "Hugo", "Boss", "01212001","doctor","derboss@freenet.de", "01576783337");


        persons.push(person1);
        persons.push(person2);
        //add the persins to the world state
        await ctx.stub.putState(person1.personID, Buffer.from(JSON.stringify(person1))); 
        await ctx.stub.putState(person2.personID, Buffer.from(JSON.stringify(person2)));

    }

    /**
    *
    * createPerson
    *
    * Creates a person in the world state, based on the args given.
    *
    * @param args.personID - id from ID
    * @param args.firstName 
    * @param args.lastName
    * @param args.dateOfBirth
    * @param args.type
    * @param args.email
    * @param args.phone
    * @returns - nothing - but updates the world state with a person
    */
    async createPerson(ctx, args) {

        args = JSON.parse(args);

        //create a new person
        let newPerson = await new Person(args.personID, args.firstName, args.lastName, args.dateOfBirth, args.type, args.email, args.phone);

        //update state with new voter
        await ctx.stub.putState(newPerson.personID, Buffer.from(JSON.stringify(newPerson)));

        let response = `Person with personID ${newPerson.personID} is updated in the world state`;
        return response;
    }
    //vaccineName
    //doctorID
    //batchID

    async vaccinatePerson(ctx, args){
        args = JSON.parse(args);
        let personID = args.personID;
        personAsset = await this.readMyAsset(ctx, personID);
        
        let newPerson = new Person(personAsset.personID, per)
        let votableAsBytes = await ctx.stub.getState(votableId);

        


    }

    async createVaccination(vaccineName, doctorID, batchID){
        let newVaccination = await Vaccination(vaccineName, doctorID, batchID);
        return newVaccination;

    }

      /**
   *
   * readMyAsset
   *
   * Reads a key-value pair from the world state, based on the key given.
   *  
   * @param myAssetId - the key of the asset to read
   * @returns - nothing - but reads the value in the world state
   */
  async readMyAsset(ctx, myAssetId) {

    const exists = await this.myAssetExists(ctx, myAssetId);

    if (!exists) {
      // throw new Error(`The my asset ${myAssetId} does not exist`);
      let response = {};
      response.error = `The my asset ${myAssetId} does not exist`;
      return response;
    }

    const buffer = await ctx.stub.getState(myAssetId);
    const asset = JSON.parse(buffer.toString());
    return asset;
  }


}