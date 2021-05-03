class Vaccination{
    /**
     * If a person is vaccinated a this object is appended to the person object
     * @param vaccineName
     * @returns - vaccination object of date and vaccination name
     */
    constructor(vaccineName){
        this.vaccineName = vaccineName;
        this.vaccinationDate = Date.now.toString()
        return this
    }
}
module.exports = Vaccination;