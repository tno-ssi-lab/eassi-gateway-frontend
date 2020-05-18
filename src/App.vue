<template>
  <div id="app">
    <b-container tag="main">
      <router-view />
    </b-container>

    <the-footer />
  </div>
</template>

<script>
import TheFooter from "./components/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheFooter,
  },
};
</script>

<style>
html {
  position: relative;
  min-height: 100%;
}

body {
  margin-bottom: 60px; /* Margin bottom by footer height */
}

.navbar-custom {
  background-color: #649dc9;
}
/* change the brand and text color */
.navbar-custom .navbar-brand,
.navbar-custom .navbar-text {
  color: white;
}
</style>
