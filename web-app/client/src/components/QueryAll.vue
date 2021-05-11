<template>
  <div class="posts">
    <h1>CQuery All: All Key-Value Pairs in World State</h1>
    <b-button v-on:click="queryAll()">Query All Assets</b-button>
<p></p>
    <b-container fluid>
      <b-row>
      <div v-bind:key="carEntry.Key" v-for="carEntry in response" class="col">

        <b-card
            v-bind:title="carEntry.Record.firstName + ' '+ carEntry.Record.lastName"
            v-bind:sub-title="'ID: ' + carEntry.Key"
            style="min-width: 20rem; max-width: 40rem;"
            class="mb-5"
        >

          <b-list-group flush>
            <b-list-group-item>Geburtsdatum: {{carEntry.Record.dateOfBirth}}</b-list-group-item>
            <b-list-group-item>Email: {{carEntry.Record.email}}</b-list-group-item>
            <b-list-group-item>Telefon: {{carEntry.Record.phone}}</b-list-group-item>
            <b-list-group-item>Typ: {{carEntry.Record.type}}</b-list-group-item>
            <b-list-group-item>
              <p>Impfungen:</p>

              <div v-for="vaccination in carEntry.Record.vaccinations" :key="vaccination.vaccineName">
                <b-list-group deck>
                  <b-list-group-item>{{vaccination.vaccineName}}</b-list-group-item>
                  <b-list-group-item>Datum: {{vaccination.vaccinationDate}}</b-list-group-item>
                  <b-list-group-item>Batch ID: {{vaccination.batchID}}</b-list-group-item>
                  <b-list-group-item>Doktor ID: {{vaccination.doctorID}}</b-list-group-item>
                </b-list-group>
                <p></p>
              </div>
            </b-list-group-item>

          </b-list-group>
        </b-card>

        <!-- <p>{{ carEntry.Key }} | {{ carEntry.Record }}</p> -->
      </div>
      </b-row>
    </b-container>

    <vue-instant-loading-spinner id = 'loader' ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      response: {}
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async queryAll() {
      this.response = null;
      this.runSpinner();
      const apiResponse = await PostsService.queryAll();
      this.response = apiResponse.data;
      this.hideSpinner();
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
