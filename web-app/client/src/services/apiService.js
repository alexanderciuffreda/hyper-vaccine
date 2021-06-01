import Api from '@/services/api'
export default{
    queryAll() {
        return Api().get('queryAll')
      },
    registerPerson(personID, firstName, lastName, dateOfBirth, email, phone, type) {
        return Api().post('registerPerson', {
          personID: personID,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          email: email,
          phone: phone,
          type: type
        
      }) 
    },
    validatePerson(personID) {
      return Api().post('validatePerson', {
        personID: personID
      }) 
    },
    
    queryByKey(key) {
      return Api().post('queryByKey', {
        key: key
      }) 
    },

    vaccinatePerson(personID, vaccineName, batchID, doctorID) {
      return Api().post('vaccinatePerson', {
        personID: personID,
        vaccineName: vaccineName,
        batchID: batchID,
        doctorID: doctorID
      }) 
    },
}