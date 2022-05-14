<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div class="pageTitle">
          <h2 style="text-align: left;text-transform: none;">Товары</h2>
          <div class="buttons">
            <v-select
              label='Категория'
              v-model="filter.category"
              :items='categoryFilter'
              item-value='id'
              item-text='name'
              @change="filterProducts"
            >
              <template slot='selection' slot-scope='{ item }'>
                {{ item.name }}
              </template>
            </v-select>
            <import-product class="ml-5"  :category="category" @event="reloadList"></import-product>
            <v-btn class="ml-2" color="success" dark @click="openDialog('Новый товар', false, false)">
              Создать товар
            </v-btn>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{dialogTitle}}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col col="12" sm="6">
                          <v-img :src="imageUrl" height="194" style="margin-bottom: 20px"></v-img>
                          <v-file-input
                            :rules="rules"
                            v-model="formData.image"
                            @change="previewImage"
                            accept="image/png, image/jpeg, image/bmp"
                            prepend-icon="mdi-camera"
                            label="Изображение"
                          ></v-file-input>
                      </v-col>
                      <v-col col="12" sm="6">
                        <v-text-field
                          label="Название товара"
                          v-model="formData.name"
                          :error-messages="nameErrors"
                          @input="$v.formData.name.$touch()"
                          @blur="$v.formData.name.$touch()"
                          type="text"
                        ></v-text-field>
                        <v-text-field
                          v-model="formData.price"
                          :error-messages="priceErrors"
                          @input="$v.formData.price.$touch()"
                          @blur="$v.formData.price.$touch()"
                          type="number"
                          label="Цена"
                        ></v-text-field>
                        <v-text-field
                          v-model="formData.article"
                          :error-messages="articleErrors"
                          @input="$v.formData.article.$touch()"
                          @blur="$v.formData.article.$touch()"
                          label="Артикул"
                        ></v-text-field>
                        <v-select
                          label='Категория'
                          v-model="formData.categoryId"
                          :items='category'
                          item-value='id'
                          item-text='name'
                          :error-messages="categoryIdErrors"
                          @input="$v.formData.categoryId.$touch()"
                          @blur="$v.formData.categoryId.$touch()"
                          return-object
                        >
                          <template slot='selection' slot-scope='{ item }'>
                            {{ item.name }}
                          </template>
                        </v-select>
                      </v-col>
                      <v-col
                        col="12"
                      >
                        <v-textarea
                          v-model="formData.description"
                          :error-messages="descriptionErrors"
                          @input="$v.formData.description.$touch()"
                          @blur="$v.formData.description.$touch()"
                          label="Описание товара"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeDialog"
                  >
                    Отмена
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    Сохранить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
        <v-data-table
          :headers="headers"
          :items="products"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="openDialog('Редагування товару', item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn
              color="primary"
              @click="fetchData"
            >
              Reset
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { mapActions } from 'vuex'
import ImportProduct from '../../components/import/ImportProduct.vue'

export default {
  name: 'TheCategory',
  mixins: [validationMixin],
  data: () => ({
    rules: [
      value => !value || value.size < 2000000 || 'Размер изображения должен быть меньше 2 MB!'
    ],
    products: [],
    headers: [
      {
        text: 'Название товара',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Артикул', value: 'article', sortable: false },
      { text: 'Цена', value: 'price', sortable: false },
      { text: 'Действие', value: 'actions', align: 'end', sortable: false }
    ],
    category: {},
    dialog: false,
    statusDialog: false,
    dialogTitle: '',
    imageUrl: '/img/no-image.jpg',
    categoryFilter: {},
    filter: {
      category: null
    },
    formData: {
      id: '',
      name: '',
      description: '',
      article: '',
      price: '',
      categoryId: '',
      image: null
    }
  }),
  components: {
    ImportProduct
  },
  validations () {
    return {
      formData: {
        name: {
          required
        },
        article: {
          required
        },
        price: {
          required
        },
        categoryId: {
          required
        },
        description: {
          required
        }
      }
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.formData.name.$dirty) return errors
      !this.$v.formData.name.required && errors.push('Название обязательно')
      return errors
    },
    articleErrors () {
      const errors = []
      if (!this.$v.formData.article.$dirty) return errors
      !this.$v.formData.article.required && errors.push('Артикул обязательный')
      return errors
    },
    priceErrors () {
      const errors = []
      if (!this.$v.formData.price.$dirty) return errors
      !this.$v.formData.price.required && errors.push('Цена обязательна')
      return errors
    },
    categoryIdErrors () {
      const errors = []
      if (!this.$v.formData.categoryId.$dirty) return errors
      !this.$v.formData.categoryId.required && errors.push('Название обязательно')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.formData.description.$dirty) return errors
      !this.$v.formData.description.required && errors.push('Описание обязательно')
      return errors
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions({
      requestCategory: 'catalog/REQUEST_CATEGORY_LIST',
      requestProducts: 'catalog/REQUEST_PRODUCT_LIST',
      requestProductsFilter: 'catalog/REQUEST_PRODUCT_LIST_FILTER',
      delayProduct: 'catalog/DELAY_PRODUCT',
      requestCreateProduct: 'catalog/REQUEST_CREATE_PRODUCT',
      requestUpdateProduct: 'catalog/REQUEST_UPDATE_PRODUCT',
      requestSaveProductImage: 'catalog/REQUEST_SAVE_PRODUCT_IMAGE'
    }),
    closeDialog () {
      this.dialog = false
      this.formData = {
        id: '',
        name: '',
        description: '',
        article: '',
        price: ''
      }
    },
    openDialog (title, item) {
      this.$v.formData.$reset()
      this.dialogTitle = title
      this.imageUrl = '/img/no-image.jpg'
      this.dialog = true
      this.statusDialog = false
      if (item) {
        this.statusDialog = true
        this.formData.id = item.id
        this.formData.name = item.name
        this.formData.description = item.description
        this.formData.article = item.article
        this.formData.price = item.price
        if (item.images.length) {
          this.imageUrl = process.env.VUE_APP_ROOT_IMAGE + item.images[item.images.length - 1].path
        }
        this.formData.categoryId = item.category != null ? item.category.id : ''
      }
    },
    previewImage () {
      if (this.formData.image === undefined) {
        this.imageUrl = '/img/no-image.jpg'
      } else {
        this.imageUrl = URL.createObjectURL(this.formData.image)
      }
    },
    filterProducts () {
      console.log('filterProducts', this.filter.category)
      this.reloadList()
    },
    reloadList () {
      if (this.filter.category !== null) {
        this.fetchData(true)
      } else {
        this.fetchData()
      }
    },
    save () {
      console.log(this.formData)
      this.$v.formData.$touch()
      if (!this.$v.formData.$invalid) {
        console.log('yraaaaaaaaaaaaa')
        console.log(this.formData)
        let categoryId
        if (this.formData.categoryId.id) {
          categoryId = this.formData.categoryId.id
        } else {
          categoryId = this.formData.categoryId
        }

        const data = {
          id: this.formData.id,
          name: this.formData.name,
          description: this.formData.description,
          article: this.formData.article,
          price: this.formData.price,
          image: this.formData.image,
          categoryId: categoryId
        }
        console.log('asdasda', data)
        if (this.statusDialog) {
          console.log('update', data)
          this.updateProduct(data)
        } else {
          console.log('create', data)
          this.createProduct(data)
        }
      }
    },
    deleteItem (item) {
      const data = {
        productId: item.id,
        categoryId: item.category.id
      }
      this.delayProduct(data)
        .then(result => {
          console.log(result)
          this.$toasted.success('Товар удалена').goAway(5000)
          this.fetchData()
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchData (filter) {
      if (filter) {
        this.requestProductsFilter(this.filter.category)
          .then(result => {
            this.products = result.data.data
            // console.log('this.products: ', this.products)
          })
      } else {
        this.requestProducts()
          .then(result => {
            console.log('products: ', result.data)
            this.products = result.data.data
            // console.log('this.products: ', this.products)
          })
      }

      this.requestCategory()
        .then(result => {
          // console.log('category: ', result.data)
          const category = []
          // this.category = result.data
          result.data.map(item => {
            category.push(item)
            if (item.children.length) {
              item.children.map(item => {
                category.push(item)
              })
            }
          })
          this.category = category
          this.categoryFilter = [
            {
              name: 'Все',
              id: null
            },
            ...category
          ]
          // console.log('this.category: ', this.category)
        })
    },
    createProduct (data) {
      this.requestCreateProduct(data)
        .then(result => {
          // console.log('createProduct - result: ', result)
          if (result.data.id) {
            this.$toasted.success('Товар успешно создана').goAway(5000)
            console.log('requestSaveProductImage: ', data)
            data.id = result.data.id
            if (data.image) {
              const data2 = {
                categoryId: data.categoryId,
                id: data.id,
                image: data.image
              }
              console.log('requestSaveProductImage: true', data.image)
              this.requestSaveProductImage(data2)
                .then(result => {
                  console.log('requestSaveProductImage - result: ', result)
                  if (result.data.id) {
                    this.$toasted.success('Изображение успешно сохранено').goAway(5000)
                    this.fetchData()
                    this.dialog = false
                  }
                })
                .catch(e => {
                  console.log('createCategory - error: ', e)
                })
            } else {
              this.fetchData()
              this.dialog = false
            }
          }
        })
        .catch(e => {
          console.log('createCategory - error: ', e)
        })
    },
    updateProduct (data) {
      this.requestUpdateProduct(data)
        .then(result => {
          console.log('updateProduct - result: ', result)
          if (result.data.id) {
            this.$toasted.success('Товар успешно обновлен').goAway(5000)
            data.id = result.data.id
            if (data.image) {
              const data2 = {
                categoryId: data.categoryId,
                id: data.id,
                image: data.image
              }
              console.log('requestSaveProductImage: true', data.image)
              this.requestSaveProductImage(data2)
                .then(result => {
                  console.log('requestSaveProductImage - result: ', result)
                  if (result.data.id) {
                    this.$toasted.success('Изображение успешно сохранено').goAway(5000)
                    this.fetchData()
                    this.dialog = false
                  }
                })
                .catch(e => {
                  console.log('createCategory - error: ', e)
                })
            } else {
              this.fetchData()
              this.dialog = false
            }
          }
        })
        .catch(e => {
          console.log('createCategory - error: ', e)
        })
    }
  }
}
</script>
