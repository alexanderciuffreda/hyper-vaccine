<template>
<b-container fluid>
  <div id="app">

      <img alt="Vue logo" src="./assets/hyperledger.png" style="width:400px;height:400px;">

        
        <!-- <router-link to="/QueryAll">QueryAll</router-link>
        <router-link to="/Home">Home</router-link> -->
        <router-view></router-view>
    </div>
  </b-container>
</template>
<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
