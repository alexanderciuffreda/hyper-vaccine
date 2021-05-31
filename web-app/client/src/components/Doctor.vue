<template>
    <div>
        <h1>DOCTOR</h1>
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
            <span v-if="vaccineReponse">
                <b>{{ vaccineReponse.data }}</b>
            </span>
            <br>
        </form>        
    </div>
</template>
<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
        queryData: {},
        queryReponse: {
            data: ""
        },

        vaccineData: {},
        vaccineReponse: {
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

      if (!this.loginData.personID) {
        console.log("!thislogin");
        let response = 'Please enter a Person ID';
        this.loginReponse.data = response;
        await this.hideSpinner();
      } else {
        const apiResponse = await PostsService.validatePerson(
          this.loginData.personID
        );
        console.log("apiResponse");
        console.log(apiResponse.data);

        if (apiResponse.data.error) {
          // console.log(apiResponse);
          console.log(apiResponse.data.error);
          this.loginReponse = apiResponse.data.error;
        } 
          
        console.log(apiResponse);
        this.loginReponse = apiResponse;
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
