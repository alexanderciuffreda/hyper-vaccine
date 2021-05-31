<template>
  <div class="posts">
    <h1>Hyper Vaccine</h1>
    <h2>Vaccination portal based on IBM Hyperledger Blockchain</h2>
    <h3>If you are a registered person, enter your ID below</h3>
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="validatePerson">
      <input type="text" v-model="loginData.personID" placeholder="Enter Person ID">
      <br>

      <input type="submit" value="Login">
      <br>
      <br>
      <span v-if="loginReponse">
        <b>{{ loginReponse.data }}</b>
      </span>
      <br>
    </form>

    <br>
    <h3>Otherwise, fill out the form below to register!</h3>
    <form v-on:submit="registerPerson">
      <input type="text" v-model="registerData.personID" placeholder="Enter ID">
      <br>
      <input type="text" v-model="registerData.firstName" placeholder="Enter first name">
      <br>
      <input type="text" v-model="registerData.lastName" placeholder="Enter last name">
      <br>
      <input type="text" v-model="registerData.dateOfBirth" placeholder="Enter date of birth">
      <br>
      <input type="text" v-model="registerData.email" placeholder="Enter email">
      <br>
      <input type="text" v-model="registerData.phone" placeholder="Enter phone number">
      <br>
      <input type="submit" value="Register">
    </form>
    <br>
    <span v-if="registerReponse">
      <b>{{ registerReponse.data }}</b>
    </span>
    <br>
    <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>
<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      loginData: {},
      registerData: {},
      registerReponse: {
        data: ""
      },
      loginReponse: {
        data: ""
      }
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async registerPerson() {

      await this.runSpinner();
      const apiResponse = await PostsService.registerPerson(
        this.registerData.personID,
        this.registerData.firstName,
        this.registerData.lastName,
        this.registerData.dateOfBirth,
        this.registerData.email,
        this.registerData.phone,
        this.registerData.type = "patient"
      );

      console.log(apiResponse);
      this.registerReponse = apiResponse;
      await this.hideSpinner();
    },

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
        } else if (apiResponse.data.type == "patient") {
            console.log(apiResponse);
            console.log("Patient");
            this.$router.push("Patient");
        } else if (apiResponse.data.type == "doctor") {
            console.log(apiResponse);
            console.log("Doctor");
            this.$router.push("Doctor");
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
