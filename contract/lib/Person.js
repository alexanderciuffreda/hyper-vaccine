'use strict';

//const { runInThisContext } = require('node:vm');

class Person{
    /**
    * Person
    *
    * Constructor for Person object. Person has
    * personID (personalausweisnummer)
    * firstName
    * lastName
    * dateOfBirth
    * vaccinations(Array)
    * type = ‘person’ | ‘doctor’
    * email
    * phone
    * @param personID
    * @param firstName
    * @param lastName
    * @param dateOfBirth
    * @param type
    * @param email
    * @param phone
    *
    * @returns person object
    */
    constructor(personID, firstName, lastName, dateOfBirth, type, email, phone, vaccinations = []){
        // check if person is valid
        if (this.validatePerson(personID)){
            this.personID = personID;
            this.firstName = firstName;
            this.lastName = lastName;
            this.dateOfBirth = dateOfBirth;
            this.vaccinations = vaccinations;
            this.type = type;
            this.email = email;
            this.phone = phone;
            return this;
        // throw error if person is not valid
        } else if (!this.validatePerson(personID)){
            throw new Error('Person is not valid');
        }


    }
    async validatePerson(personID){
        if (personID){
            return true;
        } else {
            return false;
        }
    }



}
module.exports = Person;
