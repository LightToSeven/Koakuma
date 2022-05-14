<template>
  <div class="import-product">
    <v-btn color="blue" dark @click="openDialog">
      Импорт
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Испорт Товаров</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col class="col-12">
                <v-file-input
                  v-model="file"
                  accept=".xlsx"
                  prepend-icon="mdi-file"
                  :error-messages="fileErrors"
                  :hide-details="!fileErrors.length"
                  label="Файл"
                ></v-file-input>
              </v-col>
              <v-col class="col-6">
                <v-select
                  label='Категория'
                  v-model="categoryId"
                  :items='category'
                  item-value='id'
                  item-text='name'
                  :error-messages="categoryIdErrors"
                  :hide-details="!categoryIdErrors.length"
                  @input="$v.categoryId.$touch()"
                  @blur="$v.categoryId.$touch()"
                  return-object
                >
                  <template slot='selection' slot-scope='{ item }'>
                    {{ item.name }}
                  </template>
                </v-select>
              </v-col>
              <v-col class="col-6">
                <v-switch
                  v-model="isCategoryInclude"
                  label="Обновить категории"
                  color="success"
                  hide-details
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error darken-1"
            dark
            @click="closeDialog"
          >
            Отмена
          </v-btn>
          <v-btn
            color="success "
            dark
            @click="save"
          >
            Начать импорт
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { mapActions } from 'vuex'

export default {
  name: 'ImportProduct',
  mixins: [validationMixin],
  data: () => ({
    dialog: false,
    file: null,
    categoryId: '',
    isCategoryInclude: false
  }),
  mounted () {
  },
  computed: {
    categoryIdErrors () {
      const errors = []
      if (!this.$v.categoryId.$dirty) return errors
      !this.$v.categoryId.required && errors.push('Выберите категорию')
      return errors
    },
    fileErrors () {
      const errors = []
      if (!this.$v.file.$dirty) return errors
      !this.$v.file.required && errors.push('Выберите файл')
      return errors
    }
  },
  validations () {
    return {
      categoryId: {
        required
      },
      file: {
        required
      }
    }
  },
  props: ['category'],
  methods: {
    ...mapActions({
      importProducts: 'import/POST_IMPORT_PRODUCTS'
    }),
    openDialog () {
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
    },
    clearData () {
      this.file = null
      this.categoryId = ''
      this.isCategoryInclude = false
    },
    async save () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log('this.categoryId', this.categoryId)
        const formData = new FormData()
        formData.append('file', this.file)
        formData.append('categoryId', this.categoryId.id)
        formData.append('isCategoryInclude', this.isCategoryInclude)
        const response = await this.importProducts(formData)
        console.log('respons', response.data)
        if (response.data.success) {
          this.clearData()
          this.closeDialog()
          this.$toasted.success('Импорт завершен').goAway(5000)
          this.$emit('event')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .import-product{

  }
</style>
