<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      justify="center"
    >
      <v-col cols="12" sm="5" md="5">
        <v-form>
          <h2>Social Setting</h2>
          <v-text-field
            label="discord"
            v-model="discord"
            prepend-icon="mdi-account"
            type="text"
          ></v-text-field>
          <v-text-field
            label="telegram"
            v-model="telegram"
            prepend-icon="mdi-account"
            type="text"
          ></v-text-field>
          <v-text-field
            label="twitter"
            v-model="twitter"
            prepend-icon="mdi-account"
            type="text"
          ></v-text-field>
          <v-text-field
            label="facebook"
            v-model="facebook"
            prepend-icon="mdi-account"
            type="text"
          ></v-text-field>
          <v-text-field
            label="facebook"
            v-model="facebook"
            prepend-icon="mdi-account"
            type="text"
          ></v-text-field>
          <v-text-field
            label="social"
            v-model="social"
            prepend-icon="mdi-account"
            type="text"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'TheDashboard',
  props: {
    source: String
  },
  data: () => ({
    discord: '',
    telegram: '',
    twitter: '',
    facebook: '',
    youTube: '',
    social: ''
  }),
  methods: {
    logOut: function () {
      this.$router.push('/login')
    },
  }
}
</script>
<style lang="scss">
.wrapper {
  &__login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
