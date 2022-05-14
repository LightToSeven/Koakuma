<template>
  <div class="wrapper__registration">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Регистрация</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <div class="step" v-if="step===1">
                    <v-text-field
                      label="Имя"
                      v-model="formData.name"
                      :error-messages="nameErrors"
                      @input="$v.formData.name.$touch()"
                      @blur="$v.formData.name.$touch()"
                      prepend-icon="mdi-account-box"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      label="Фамилия"
                      v-model="formData.lastname"
                      :error-messages="lastnameErrors"
                      @input="$v.formData.lastname.$touch()"
                      @blur="$v.formData.lastname.$touch()"
                      prepend-icon="mdi-account-box"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      label="Телефон"
                      v-model="formData.phone"
                      return-masked-value
                      v-mask="'+# (###) ###-##-##'"
                      prepend-icon="mdi-cellphone"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      label="Email"
                      v-model="formData.email"
                      prepend-icon="mdi-at"
                      type="text"
                      :error-messages="emailErrors"
                      @input="$v.formData.email.$touch()"
                      @blur="$v.formData.email.$touch()"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      label="Пароль"
                      v-model="formData.password"
                      :error-messages="passwordErrors"
                      @input="$v.formData.password.$touch()"
                      @blur="$v.formData.password.$touch()"
                      prepend-icon="mdi-lock"
                      type="password"
                    ></v-text-field>
                  </div>
                  <div class="step registerCode" v-else>
                    <h3>Введите код </h3>
                    <v-text-field
                      v-model="formData.code"
                      :error-messages="codeErrors"
                      @input="$v.formData.code.$touch()"
                      @blur="$v.formData.code.$touch()"
                      type="number"
                    ></v-text-field>
                    <p>Код подтверждения был отправленый на ваш E-mail</p>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions v-if="step===1">
                <router-link color="primary" to="/login">Авторизация</router-link>
                <v-spacer></v-spacer>
                <v-btn color="primary" class="load-btn" @click="sendInviteCode" :data-progress="loadingRegistration" :disabled="loadingRegistration || validationErrors.length < 1">
                  <div class="load-btn__label">
                    Регистрация
                  </div>
                  <span class="load-btn__loader">
                    <loader/>
                  </span>
                </v-btn>
              </v-card-actions>
              <v-card-actions v-if="step===2">
                <v-btn color="primary" @click="step = 1">Назад</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" class="load-btn" @click="sendRegistration" :data-progress="loadingRegistration" :disabled="loadingRegistration || validationErrors.length < 1">
                  <div class="load-btn__label">
                    Подтвердить
                  </div>
                  <span class="load-btn__loader">
                    <loader/>
                  </span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { mapActions, mapGetters } from 'vuex'

const validPhone = (value) => value.replace(/[^+\d]/g, '').length === 12

export default {
  name: 'TheRegistration',
  mixins: [validationMixin],
  data () {
    return {
      step: 1,
      formData: {
        // email: 'jaxon17926@ampswipe.com',
        // name: 'test',
        // lastname: 'test',
        // phone: '79780312311',
        // password: '12345678',
        // code: '36085'
        email: '',
        name: '',
        lastname: '',
        phone: '',
        password: '',
        code: ''
      },
      validationErrors: {}
    }
  },
  validations () {
    return {
      formData: {
        email: {
          required,
          email
        },
        name: {
          required,
          minLength: minLength(3)
        },
        lastname: {
          required,
          minLength: minLength(3)
        },
        password: {
          required,
          minLength: minLength(8)
        },
        phone: {
          required,
          validPhone
        },
        code: {
          required
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      loadingRegistration: 'auth/loadingRegistration'
    }),
    nameErrors () {
      const errors = []
      if (!this.$v.formData.name.$dirty) return errors
      !this.$v.formData.name.minLength && errors.push('Имя должно быть от 3 символов')
      !this.$v.formData.name.required && errors.push('Имя обязательно')
      return errors
    },
    lastnameErrors () {
      const errors = []
      if (!this.$v.formData.lastname.$dirty) return errors
      !this.$v.formData.lastname.minLength && errors.push('Фамилия должна быть от 3 символов')
      !this.$v.formData.lastname.required && errors.push('Фамилия обязательна')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.formData.email.$dirty) return errors
      !this.$v.formData.email.email && errors.push('E-mail введен не верно')
      !this.$v.formData.email.required && errors.push('E-mail обязательный')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.formData.password.$dirty) return errors
      !this.$v.formData.password.minLength && errors.push('Пароль должен быть от 8 символов')
      !this.$v.formData.password.required && errors.push('Пароль обязательный')
      return errors
    },
    codeErrors () {
      const errors = []
      if (!this.$v.formData.code.$dirty) return errors
      if (!this.$v.formData.code.required) errors.push('Введите код')

      return errors
    }
  },
  methods: {
    ...mapActions({
      inviteCode: 'auth/INVITE_CODE_CLIENT',
      register: 'auth/REGISTRATION'
    }),
    sendInviteCode () {
      this.$v.formData.email.$touch()
      this.$v.formData.name.$touch()
      this.$v.formData.lastname.$touch()
      this.$v.formData.phone.$touch()
      this.$v.formData.password.$touch()
      if (!this.$v.formData.email.$invalid && !this.$v.formData.name.$invalid && !this.$v.formData.lastname.$invalid && !this.$v.formData.phone.$invalid && !this.$v.formData.password.$invalid) {
        this.inviteCode(this.formData.email)
          .then(result => {
            if (result.data) {
              this.step = 2
            }
          }).catch(error => {
            console.log('error - sendInviteCode : ', error)
            if (error.data.message === 'Email is already invitated') {
              this.$toasted.error('Email уже зарегистрирован').goAway(5000)
            }
          })
      }
    },
    sendRegistration () {
      this.$v.formData.$touch()
      if (!this.$v.formData.$invalid) {
        this.register(this.formData)
          .then(result => {
            if (result.data.userData) {
              this.$toasted.success('Авторизация успешна').goAway(5000)
              this.$router.push({ name: 'admin-dashboard' })
            }
          }).catch(error => {
            console.log('error - sendRegistration : ', error)
            if (error.data.message === 'Invitation not found.') {
              this.$toasted.error('Введите правильный код').goAway(5000)
            }
          })
      }
    }
  },
  components: {
    // InputMask
  }
}
</script>
<style lang="scss">
.wrapper {
  &__registration {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .registerCode {
      padding: 20px 0;

      .v-input {
        max-width: 140px;
        margin: 0 auto;

        input {
          text-align: center;
        }
      }

      h3 {
        text-align: center;
      }

      p {
        text-align: center;
      }
    }
  }
}
</style>
