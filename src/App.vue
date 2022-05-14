<template>
  <div id="app">
    <v-app id="inspire">
      <div class="wrapper">
        <router-view/>
      </div>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    // TheHeader,
    // TheFooter,
    // TheCartWidget,
    // TheMessageSlider
  }
}
</script>

  <style lang="scss">
  @import './assets/sass/main.scss';
.wrapper{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
