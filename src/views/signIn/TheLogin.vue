<template>
  <div class="wrapper__login">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Sig In</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    v-model="email"
                    prepend-icon="mdi-account"
                    type="text"
                    :error-messages="emailErrors"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :error-messages="passwordErrors"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="onSubmit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { mapActions } from 'vuex'

export default {
  name: 'TheLogin',
  mixins: [validationMixin],
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations () {
    return {

      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    ...mapActions({
      loginUser: 'auth/GET_TOKEN'
    }),
    onSubmit () {
      // Initialize Vuelodate
      this.$v.$touch()
      // Invalid
      if (!this.$v.$invalid) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.loginUser(user)
          .then(() => {
            this.$toasted.success('You are logged!').goAway(5000)
            this.$router.push({ name: 'admin-dashboard' })
          })
          .catch(err => {
            this.$toasted.error(err.message).goAway(5000)
          })
      }
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Email is not correct')
      !this.$v.email.required && errors.push('Field is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
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
