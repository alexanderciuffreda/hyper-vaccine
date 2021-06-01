<template>
    <div>
        <h1>DOCTOR</h1>

        <h2>{{ propDoctorID }}</h2>

        <form v-on:submit="validatePerson">
            <input type="text" v-model="queryData.personID" placeholder="Enter Person ID">
            <br>
            <input type="submit" value="Query">
            <br>
            <br>
            <span v-if="queryResponse">
                <b>{{ queryResponse.data }}</b>
            </span>
            <br>
        </form>
        <br>
        <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
        <form v-on:submit="vaccinatePerson">
            <input type="text" v-model="vaccineData.personID" placeholder="Enter Person ID">
            <br>
            <input type="text" v-model="vaccineData.vaccineName" placeholder="Enter vaccine name">
            <br>
            <input type="text" v-model="vaccineData.batchID" placeholder="Enter batch id">
            <br>
            <input type="submit" value="Vaccine">
            <br>
            <br>
            <span v-if="vaccineResponse">
                <b>{{ vaccineResponse.data }}</b>
            </span>
            <br>
        </form>        
    </div>
</template>
<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  props: ['propDoctorID'],
  name: "response",
  data() {
    return {
        queryData: {},
        queryResponse: {
            data: ""
        },

        vaccineData: {},
        vaccineResponse: {
            data: ""
        }
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    
    async validatePerson() {
      await this.runSpinner();

      if (!this.queryData.personID) {
        console.log("!thislogin");
        let response = 'Please enter a Person ID';
        this.queryResponse.data = response;
        await this.hideSpinner();
      } else {
        const apiResponse = await PostsService.validatePerson(
          this.queryData.personID
        );
        console.log("apiResponse");
        console.log(apiResponse.data);

        if (apiResponse.data.error) {
          // console.log(apiResponse);
          console.log(apiResponse.data.error);
          this.queryResponse = apiResponse.data.error;
        } 
          
        console.log(apiResponse);
        this.queryResponse = apiResponse;
        // this.$router.push('castBallot')
        await this.hideSpinner();
        }
    },

    async vaccinatePerson(){
      await this.runSpinner();
      // check if fields are empty

      if (!this.vaccineData.vaccineName && !this.vaccineData.personID && !this.vaccineData.batchID) {
        console.log("!thislogin");
        let response = 'Please fill out every field';
        this.vaccineResponse.data = response;

        await this.hideSpinner();
      } else {
        // no field is empty
        const apiResponse = await PostsService.vaccinatePerson(
          this.vaccineData.personID,
          this.vaccineData.vaccineName,
          this.vaccineData.batchID,
          this.propDoctorID

        );

        console.log("apiResponse");
        console.log(apiResponse.data);

        if (apiResponse.data.error) {
          // console.log(apiResponse);
          console.log(apiResponse.data.error);
          this.vaccineResponse = apiResponse.data.error;
        } 
          
        console.log(apiResponse);
        this.vaccineResponse = apiResponse;
        // this.$router.push('castBallot')
        await this.hideSpinner();
        }
    },

    async runSpinner() {
      this.$refs.Spinner.show();
    },
    async hideSpinner() {
      this.$refs.Spinner.hide();
    }
  }
};
</script>
