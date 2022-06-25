<template>
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
      return (Math.floor(this.windowWidth / 300) > 3 ? 3 : Math.floor(this.windowWidth / 300))
    }
  },
  async mounted () {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
    fetch('/api/service')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.services = data.msg

        for (const i in this.services) {
          if (this.services[i] == null || this.services[i].picture == null || this.services[i].picture === '') {
            this.services[i].picture = 'https://raw.githubusercontent.com/SmartCityProjectGroup/SmartCity/main/Logo_4.png'
          }
          fetch(this.services[i].picture)
            .then(response => {
              if (response.status === 404) {
                this.services[i].picture = 'https://raw.githubusercontent.com/SmartCityProjectGroup/SmartCity/main/Logo_4.png'
              }
            })
            .catch(() => {
              this.services[i].picture = 'https://raw.githubusercontent.com/SmartCityProjectGroup/SmartCity/main/Logo_4.png'
            })
        }
      })
  }
}
</script>

<style scoped>
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
