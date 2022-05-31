<template>
  <a :href="service.url">
    <div class="flex-item">
      <h2 class="title">{{getServiceName(service)}}</h2>
      <p class="description">
        {{getServiceDescription(service)}}
      </p>
      <img :src="getPictureURL(service)" alt="">
    </div>
  </a>
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
        return 'Leider existiert keine Beschreibung für diesen Service. Wenn Sie das stört, dann schreiben Sie bitte ' +
          'keine Email an uns.'
      }
      return service.about_us
    },
    getPictureURL (service) {
      if (service == null || service.picture == null || service.picture === '') {
        return 'https://cdn.discordapp.com/attachments/960888966226268240/981121537715355658/Logo_4.png'
      }
      return service.picture
    }
  }
}
</script>

<style scoped>

.title {
  background-color: #05ff97;
  color:inherit;
  padding: 10px;
}

.description {
  background-color: white;
  padding: 10px;
}

.flex-item {
  height: 300px;
  width: 250px;
  /*background-color: #05ff97;*/
  margin: 0 10px 20px 0;
  overflow: hidden;
}

a {
  color:black;
  text-decoration: none;
}

img {
  width: 100%;
}

</style>
