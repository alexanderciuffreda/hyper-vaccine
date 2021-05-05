/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
const { Contract } = require('fabric-contract-api');
//const path = require('path');
//const fs = require('fs');

// connect to the vaccine data file
//const vaccineDataPath = path.join(process.cwd(), './lib/data/vaccineData.json');
//const vaccineDataJson = fs.readFileSync(vaccineDataPath, 'utf8');
//const vaccineData = JSON.parse(vaccineDataJson);

//import our file which contains our constructors and auxiliary function
let Vaccination = require('./Vaccination.js');
let Person = require('./Person.js');

class MyAssetContract extends Contract {


    /**
     * this function creates initial data and gets application ready
     * @param ctx context of transaction
     * @returns the data which is added to world state
     */
    async init(ctx){
        console.log('init method called');

        let persons = [];

        // create persons
        let person1 = await new Person('12345', 'Fixie', 'Hartmann', '01012001','patient','fixie@web.de', '015893655487');
        let person2 = await new Person('67890', 'Hugo', 'Boss', '01212001','doctor','derboss@freenet.de', '01576783337');


        persons.push(person1);
        persons.push(person2);
        //add the persons to the world state
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

    /**
     *
     * @param {*} ctx
     * @param {*} args - Person ID, Vaccine Name, Doctor ID, Batch ID
     * @returns
     */

    async vaccinatePerson(ctx, args){
        args = JSON.parse(args);
        let personID = args.personID;
        let personAsset = await this.readMyAsset(ctx, personID);
        // create person object from worldstate response
        let newPerson = new Person(personAsset.personID, personAsset.personID, personAsset.firstName, personAsset.lastName, personAsset.dateOfBirth, personAsset.type, personAsset.email, personAsset.phone);

        //create vaccination
        let newVaccination = this.createVaccination(args.vaccineName, args.doctorID, args.batchID);
        newPerson.vaccinations.push(newVaccination);

        //update person in world state
        await ctx.stub.putState(newPerson.personID, Buffer.from(JSON.stringify(newPerson)));
        let response = `Person with personID ${newPerson.personID} is vaccinated and updated in the world state`;
        return response;

    }

    async createVaccination(vaccineName, doctorID, batchID){
        let newVaccination = await Vaccination(vaccineName, doctorID, batchID);
        return newVaccination;

    }


    async myAssetExists(ctx, myAssetId) {
        const buffer = await ctx.stub.getState(myAssetId);
        return (!!buffer && buffer.length > 0);
    }

    async createMyAsset(ctx, myAssetId, value) {
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (exists) {
            throw new Error(`The my asset ${myAssetId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(myAssetId, buffer);
    }

    async readMyAsset(ctx, myAssetId) {
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {
            throw new Error(`The my asset ${myAssetId} does not exist`);
        }
        const buffer = await ctx.stub.getState(myAssetId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateMyAsset(ctx, myAssetId, newValue) {
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {
            throw new Error(`The my asset ${myAssetId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(myAssetId, buffer);
    }

    async deleteMyAsset(ctx, myAssetId) {
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {
            throw new Error(`The my asset ${myAssetId} does not exist`);
        }
        await ctx.stub.deleteState(myAssetId);
    }

}

module.exports = MyAssetContract;
