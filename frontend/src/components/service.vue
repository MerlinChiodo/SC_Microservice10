<template>
  <div class="flex-item">
    <a :href="service.url" >
      <h2 class="title">{{getServiceName(service)}}</h2>
      <img :src="service.picture" alt="">
      <p class="description">
        {{getServiceDescription(service)}}
      </p>
    </a>
  </div>
</template>

<script>
export default {
  name: 'service-component',
  props: ['service'],
  methods: {
    getServiceName (service) {
      if (service == null || service.service_name == null) {
        return ''
      }
      return service.service_name
    },
    getServiceDescription (service) {
      if (service == null || service.about_us == null || service.about_us === '') {
        return 'Leider existiert keine Beschreibung für diesen Service.'
      }
      return service.about_us
    }
  }
}
</script>

<style scoped>

.title {
  background-color: #05ff97;
  padding: 10px;
}

.description {
  background-color: #05ff97;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  /*margin: 0;*/
}

.flex-item {
  max-width: 405px;
  min-width: 405px;
  min-height: 250px;
  /*justify-items: end;*/
  margin: 0 20px 10px 20px;
  overflow: hidden;
  border: 1px solid #05ff97;
}

p, h2 {
  margin:0
}

a {
  color:black;
  text-decoration: none;
}

img {
  width: 100%;
  align-content: center;
  height: 250px;
}

</style>
