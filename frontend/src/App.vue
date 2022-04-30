<template>
  <header class="header">
    <div class="container space-between">
      <h1>Landingpage</h1>
      <div class="login">
        <button>Zum Login</button>
      </div>
    </div>
  </header>
  <div>
    <ul class="container space-around">
      <service-component />
      <service-component />
      <service-component />
      <service-component />
      <service-component />
    </ul>
    <ul class="container space-around">
      <service-component />
      <service-component />
      <service-component />
      <service-component />
      <service-component />
    </ul>
  </div>
</template>

<style lang="scss">
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
<script>
import ServiceComponent from '@/components/service'

export default {
  components: { ServiceComponent }
}
</script>
