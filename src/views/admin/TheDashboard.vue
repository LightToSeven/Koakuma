<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      justify="center"
    >
      <v-col cols="12" sm="12" md="12">
        <h2>Social Setting</h2>

        <v-form>
          <v-text-field
            label="Login"
            v-model="discord"
            prepend-icon="mdi-account"
            type="text"
          ></v-text-field>
          <v-text-field
            id="password"
            label="Password"
            v-model="password"
            prepend-icon="mdi-lock"
            type="password"
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
    twiter: '',
    facebook: '',
    youTube: '',
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
