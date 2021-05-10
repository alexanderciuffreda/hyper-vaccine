'use strict';

class Vaccination{
    /**
     * If a person is vaccinated a this object is appended to the person object
     * @param vaccineName
     * @param doctorID
     * @param batchID
     * @returns - vaccination object of date and vaccination name
     */
    constructor(vaccineName, doctorID, batchID){
        this.vaccineName = vaccineName;
        this.vaccinationDate = new Date().toLocaleDateString();
        this.doctorID = doctorID;
        this.batchID = batchID;
        this.vaccinationID;
        return this;
    }


}
module.exports = Vaccination;