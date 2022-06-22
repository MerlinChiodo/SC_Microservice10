<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <div class="container space-between">
        <h1><RouterLink to="/">SmartCity</RouterLink></h1>
      <div class="login">
        <button>Zum Login</button>
      </div>
    </div>
  </header>
  <RouterView />
  <footer class="footer">
    <h2><RouterLink to="/imprint">Impressum</RouterLink></h2>
    <h2><RouterLink to="/data_protection">Datenschutzerklärung</RouterLink></h2>
  </footer>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

.login {
  position: relative;
  top: 50%;
  transform: translateY(25%);
}

button {
  padding: 10px;
  margin-right: 0;
}

body {
  margin: 0;
  background-color: #2c3e50;
}

.header {
  background-color: #05ff97;
  color: inherit;
  margin-top: 0;
  margin-bottom: 50px;
  padding: 10px 0 10px 30px;
}

.footer {
  background-color: #05ff97;
  color: inherit;
  margin-top: 0;
  padding: 1px 0 1px 30px;
  display: flex;
  justify-content: space-around;
}

.container {
  display: flex;
  margin-right: 30px;
}

.container.space-around {
  justify-content: space-around;
}

.container.space-between {
  justify-content: space-between;
}

</style>
