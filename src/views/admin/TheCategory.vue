<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div class="pageTitle">
          <h2 style="text-align: left;text-transform: none;">Категории</h2>
          <div class="buttons">
            <v-btn color="success" dark @click="openDialog('Новая категория', false, false)">
              Создать категорию
            </v-btn>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{dialogTitle}}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Название категории"
                          v-model="formData.name"
                          :error-messages="nameErrors"
                          @input="$v.formData.name.$touch()"
                          @blur="$v.formData.name.$touch()"
                          type="text"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-text-field
                          v-model="formData.position"
                          type="number"
                          label="Позиция категории"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-select
                          label='Родительская категория'
                          v-model="formData.parentId"
                          :items='category'
                          item-value='id'
                          item-text='name'
                          return-object
                        >
                          <template slot='selection' slot-scope='{ item }'>
                            {{ item.name }}
                          </template>
                        </v-select>
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
        <div class="section-categoryList">
          <div class="section-categoryList__table">
            <div class="custom-table">
              <div class="custom-table__header">
                <div class="custom-table__tr">
                  <div class="custom-table__td">
                    Название категории
                  </div>
                  <div class="custom-table__td">
                    Порядок сортировки
                  </div>
                  <div class="custom-table__td">
                    Действие
                  </div>
                </div>
              </div>
              <div class="custom-table__body" v-if="category.length">
                <div class="custom-table__box" :ref="`child_${index}`" v-for="(item, index) in category" :key="index">
                  <div class="custom-table__tr">
                    <div class="custom-table__td">
                      <span v-if="item.children.length < 1">{{ item.name }}</span>
                      <span v-else class="mainChild" @click="open(`child_${index}`)">
                          {{ item.name }}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true"
                               class="v-icon__svg"><path
                            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path></svg>
                        </span>
                    </div>
                    <div class="custom-table__td">
                      {{ item.position }}
                    </div>
                    <div class="custom-table__td">
                      <v-btn icon @click="openDialog('Редактировать категорию', item, false)">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon @click="delay(item.id, item.children)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div class="custom-table__tr children" v-for="(itemChildren, indexChildren) in item.children"
                       :key="indexChildren">
                    <div class="custom-table__td">
                      {{ itemChildren.name }}
                    </div>
                    <div class="custom-table__td">
                      {{ itemChildren.position }}
                    </div>
                    <div class="custom-table__td">
                      <v-btn icon @click="openDialog('Редактировать категорию', itemChildren, item.id)">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon @click="delay(itemChildren.id, itemChildren.children)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
              <div class="custom-table__noItems" v-else>
                Нет данных!
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { mapActions } from 'vuex'

export default {
  name: 'TheCategory',
  mixins: [validationMixin],
  data: () => ({
    category: {},
    dialog: false,
    statusDialog: false,
    dialogTitle: '',
    formData: {
      id: '',
      name: '',
      parentId: null,
      position: 0
    }
  }),
  validations () {
    return {
      formData: {
        name: {
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
    }
  },
  mounted () {
    this.fetchData()
    // this.delay('8afc9be0-8174-47c0-af0a-4bcdcddd1f52', [])
  },
  methods: {
    ...mapActions({
      requestCategory: 'catalog/REQUEST_CATEGORY_LIST',
      delayCategory: 'catalog/DELAY_CATEGORY',
      requestCreateCategory: 'catalog/REQUEST_CREATE_CATEGORY',
      requestUpdateCategory: 'catalog/REQUEST_UPDATE_CATEGORY'
    }),
    closeDialog () {
      this.dialog = false
      this.formData.parentId = null
      this.formData.name = ''
      this.formData.position = 0
    },
    openDialog (title, item, parentId) {
      this.dialogTitle = title
      this.dialog = true
      this.statusDialog = false
      if (item) {
        this.statusDialog = true
        this.formData.id = item.id
        this.formData.name = item.name
        this.formData.position = item.position
        if (parentId) {
          const parentData = this.category.filter(item => item.id === parentId)
          this.formData.parentId = parentData[0].id
        }
      }
    },
    save () {
      console.log(this.formData)
      this.$v.formData.name.$touch()
      if (!this.$v.formData.name.$invalid) {
        let parentId = null
        if (this.formData.parentId !== null) {
          if (this.formData.parentId.id) {
            parentId = this.formData.parentId.id
          } else {
            parentId = this.formData.parentId
          }
        }
        const data = {
          id: this.formData.id,
          name: this.formData.name,
          parentId: parentId,
          position: this.formData.position
        }
        if (this.statusDialog) {
          console.log('update', data)
          this.updateCategory(data)
        } else {
          console.log('create', data)
          this.createCategory(data)
        }
      }
    },
    delay (id, children) {
      if (children.length < 1) {
        this.delayCategory(id)
          .then(result => {
            console.log(result)
            this.$toasted.success('Категория удалена').goAway(5000)
            this.fetchData()
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$toasted.error('Нельзя удалить категорию в которой есть под категории').goAway(5000)
      }
    },
    open (item) {
      if (this.$refs[item][0].classList.contains('active')) {
        this.$refs[item][0].classList.remove('active')
      } else {
        this.$refs[item][0].classList.add('active')
      }
    },
    fetchData () {
      this.requestCategory()
        .then(result => {
          console.log('category: ', result.data)
          this.category = result.data
        })
    },
    createCategory (data) {
      this.requestCreateCategory(data)
        .then(result => {
          console.log('createCategory - result: ', result)
          if (result.data.id) {
            this.$toasted.success('Категория успешно создана').goAway(5000)
            this.fetchData()
            this.dialog = false
          }
        })
        .catch(e => {
          console.log('createCategory - error: ', e)
        })
    },
    updateCategory (data) {
      this.requestUpdateCategory(data)
        .then(result => {
          console.log('createCategory - result: ', result)
          if (result.data.id) {
            this.$toasted.success('Категория успешно обновлена').goAway(5000)
            this.fetchData()
            this.dialog = false
          }
        })
        .catch(e => {
          console.log('createCategory - error: ', e)
        })
    }
  }
}
</script>
