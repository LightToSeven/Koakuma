<template>
  <div class="wrapper__login">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Авторизация</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    v-model="authDetails.email"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="authDetails.password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <router-link color="primary" to="/registration">Регистрация</router-link>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="loginUser">Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { GET_TOKEN } from '../../store/action-types'

export default {
  name: 'TheLogin',
  data () {
    return {
      authDetails: {
        email: 'root@root.com',
        password: 'ajadam12'

      }

    }
  },
  methods: {
    ...mapActions({
      login: `auth/${GET_TOKEN}`
    }),
    loginUser () {
      this.login(this.authDetails)
        .then((result) => {
          if (result) {
            this.$toasted.success('Авторизация успешна').goAway(5000)
            if (result.data.userData.role === 'CLIENT') {
              this.$router.push({ name: 'user-dashboard' })
            } else {
              this.$router.push({ name: 'admin-dashboard' })
            }
          }
        })
        .catch(error => {
          if (error.data.message === 'Wrong credentials') {
            this.$toasted.error('Невернные данные').goAway(5000)
          }
        })
    }
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
