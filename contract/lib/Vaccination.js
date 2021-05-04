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
        this.vaccinationDate = Date.now.toString();
        this.doctorID = doctorID;
        this.batchID = batchID;
        this.vaccinationID;
        return this;
    }

    createVaccination(){
        
    }
}
module.exports = Vaccination;