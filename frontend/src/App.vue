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
    <ul class="container space-around"
        v-for="index in getColNumber()"
        :key="index"
    >
      <service-component
        v-for="service in getRowNumbers(index)"
        :key="(index - 1) * getColWidth() + (service - 1)"
        :service="services[(service - 1) + getColWidth() * (index - 1)]"
      />
    </ul>
  </div>
</template>

<script>
import ServiceComponent from '@/components/service'

export default {
  components: { ServiceComponent },
  data () {
    return {
      services: [],
      windowWidth: window.innerWidth
    }
  },
  methods: {
    getColNumber () {
      const colWidth = this.getColWidth()
      const num = (this.services.length / colWidth) + 1
      return parseInt(num.toString())
    },
    getRowNumbers (colNumber) {
      const colWidth = this.getColWidth()
      const serviceAmount = this.services.length
      const doneServices = (colNumber - 1) * colWidth
      const rest = serviceAmount - doneServices
      return (rest > colWidth ? colWidth : rest)
    },
    getColWidth () {
      return Math.floor(this.windowWidth / 300)
    }
  },
  async mounted () {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
    this.services = [
      {
        service_name: 'Bürgerbüro',
        about_us: 'Was ein tolles Ding'
      },
      {
        service_name: 'Kita',
        about_us: 'Hier finden Kinder immer was'
      },
      {
        service_name: 'Kita',
        about_us: 'Hier finden Kinder immer was'
      },
      {
        service_name: 'Kita',
        about_us: 'Hier finden Kinder immer was'
      },
      {
        service_name: 'Kita',
        about_us: 'Hier finden Kinder immer was'
      },
      {
        service_name: 'Kita',
        about_us: 'Hier finden Kinder immer was'
      },
      {
        service_name: 'Kita',
        about_us: 'Hier finden Kinder immer was'
      },
      {
        service_name: 'Kita',
        about_us: 'Hier finden Kinder immer was'
      },
      {
        service_name: 'Bürgerbüro',
        about_us: 'Was ein tolles Ding'
      }
    ]
  }
}
</script>

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
