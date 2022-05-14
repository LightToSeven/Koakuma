<template>
  <div class="section-addSub">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <div class="pageTitle">
            <h2 style="text-align: left;text-transform: none;">Создание подписки</h2>
            <div class="buttons">
              <v-btn color="error" dark @click="$router.go(-1)">
                Отмена
              </v-btn>
              <v-btn class="ml-2" color="success" dark @click="createSub">
                Оформить
              </v-btn>
            </div>
          </div>
          <v-row>
            <v-col cols="4">
              <div class="section-addSub__title">Параметры</div>
              <div class="section-addSub__range">
                <div class="name">
                  Период подписки <b>{{form.range}} мес.</b>
                </div>
                <v-slider
                  v-model="form.range"
                  max="24"
                  :hide-details="true"
                ></v-slider>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="section-addSub__title">Каталог</div>
              <div class="section-addSub__catalog">
                <div class="section-addSub__catalog-list">
                  <div class="item">
<!--                    <div class="item__name">{{item.name}}</div>-->
                    <div class="item__products" >
                      <div class="item__products-item" v-for="item in subProduct" :key="item.id">
                        <div class="productSub">
                          <div class="productSub__delay">
                            <v-btn color="error" @click="removeSubItem(item.id)"><v-icon>mdi-delete</v-icon></v-btn>
                          </div>
                          <div class="productSub__image">
                            <img :src="item.images.length ? imageUrl(item.images[0].path) : '/img/no-image.jpg'" alt="">
                          </div>
                          <div class="productSub__name">{{item.name}}</div>
                          <div class="productSub__optionBox">
                            <div class="productSub__optionLabel"><b>Расход</b></div>
                            <div class="productSub__option">
                              <div class="count">
                                <v-text-field
                                  v-model="item.count"
                                  type="number"
                                  aria-valuemin="1"
                                  label="Кол-во"
                                  hide-details
                                ></v-text-field>
                              </div>
                              <div class="term">
                                <v-select
                                  label="Периуд"
                                  v-model="item.term"
                                  :items='termOptions'
                                  :item-value="'value'"
                                  :item-text="'name'"
                                  hide-details
                                >
                                  <template slot='selection' slot-scope='{ item }'>
                                    {{ item.name }}
                                  </template>
                                </v-select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="item__products-item add" @click="openDialogProduct">
                        <div class="productSub">
                          <div class="addSub">+</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="12">
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialogProduct" persistent max-width="900px">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col col="12" sm="6">
              <span class="text-h5">Добавить товар</span>
            </v-col>
            <v-col col="12" sm="6">
              <v-select
                label='Категория'
                v-model="categoryId"
                :items='category'
                item-value='id'
                item-text='name'
                return-object
                @change="filterProduct"
              >
                <template slot='selection' slot-scope='{ item }'>
                  {{ item.name }}
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div class="dialogProduct__content">
              <div class="dialog-listProduct" v-if="products.length">
                <div class="dialog-listProduct__item" v-for="item in products" :key="item.id">
                  <div class="image">
                    <img :src="item.images.length ? imageUrl(item.images[0].path) : '/img/no-image.jpg'" alt="">
                  </div>
                  <div class="name">{{item.name}}</div>
                  <div class="add" @click="addSubProduct(item)">
                    <span>+</span>
                  </div>
                </div>
              </div>
              <div class="none" v-else>В этой категории нету товаров!</div>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialogProduct = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'TheSubscriptionsAdd',
  data: () => ({
    form: {
      range: 6
    },
    dialogProduct: false,
    categoryId: {
      id: null,
      name: 'Все'
    },
    category: [],
    products: [],
    subProduct: [],
    termOptions: [
      {
        name: 'Одна неделя',
        value: 0.25
      },
      {
        name: 'Две недели',
        value: 0.5
      },
      {
        name: 'Месяц',
        value: 1
      },
      {
        name: 'Полтора месяца',
        value: 1.5
      },
      {
        name: 'Два месяца',
        value: 2
      }
    ]
  }),
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions({
      requestCategory: 'catalog/REQUEST_CATEGORY_LIST',
      requestProducts: 'catalog/REQUEST_PRODUCT_LIST',
      requestProductsCategory: 'catalog/REQUEST_PRODUCT_CATEGORY',
      requestCreateSub: 'subs/CREATE_SUB'
    }),
    openDialogProduct () {
      this.dialogProduct = true
    },
    addSubProduct (item) {
      console.log('add-item: ', item)
      const testItem = this.subProduct.filter(prod => prod.id === item.id)
      if (!testItem.length) {
        item.count = 1
        item.term = 0.25
        this.subProduct.push(item)
        this.$toasted.success('Товар добавлен успешно').goAway(5000)
        this.dialogProduct = false
      } else {
        this.$toasted.error('Такой товар уже добавлен').goAway(5000)
      }
    },
    fetchData () {
      this.requestProducts()
        .then(result => {
          console.log('products: ', result.data)
          this.products = result.data.data
          // console.log('this.products: ', this.products)
        })
      this.requestCategory()
        .then(result => {
          // console.log('category: ', result.data)
          const category = [
            {
              id: null,
              name: 'Все'
            }
          ]
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
          // console.log('this.category: ', this.category)
        })
    },
    filterProduct () {
      console.log('this.categoryId', this.categoryId)
      if (this.categoryId.id === null) {
        this.requestProducts()
          .then(result => {
            this.products = result.data.data
          })
      } else {
        this.requestProductsCategory(this.categoryId.id)
          .then(result => {
            this.products = result.data.data
          })
      }
    },
    removeSubItem (id) {
      this.subProduct = this.subProduct.filter((item) => item.id !== id)
    },
    imageUrl (val) {
      return process.env.VUE_APP_ROOT_IMAGE + val
    },
    createSub () {
      if (this.subProduct.length) {
        const formData = {
          countOfMonths: this.form.range,
          products: [
            ...this.subProduct
          ]
        }
        this.requestCreateSub(formData)
          .then(result => {
            console.log('result:', result)
            this.$toasted.success('Подписка оформлена успешно').goAway(5000)
            this.$router.go(-1)
          })
      } else {
        this.$toasted.error('Нужно добавить больше товаров').goAway(5000)
      }
    }
  }
}
</script>
<style lang="scss">
.section-addSub{
  &__title{
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 10px;
  }
  &__catalog{
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    background-color: #fff;
    color: rgba(0,0,0,.87);
    border-radius: 5px;
    padding: 16px ;
    &-list{
      .item{
        &__name{
          font-size: 18px;
          margin-bottom: 5px;
        }
        &__products{
          display: flex;
          flex-wrap: wrap;
          margin: 0 -10px 15px;
          &-item{
            width: 20%;
            padding: 10px;
            display: flex;
            .productSub{
              //height: 150px;
              background: #E8F2FE;
              width: 100%;
              border-radius: 8px;
              padding: 8px;
              display: flex;
              flex-direction: column;
              position: relative;
              &:hover{
                .productSub__delay{
                  display: block;
                }
              }
              &__delay{
                display: none;
                position: absolute;
                top: 8px;
                right: 8px;
                .v-btn{
                  min-width: auto!important;
                  padding: 0 5px!important;
                }
              }
              &__image{
                margin-bottom: 10px;
                height: 130px;
                border-radius: 8px;
                img{
                  border-radius: 8px;
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              &__name{
                font-size: 16px;
                line-height: 20px;
                margin-bottom: 15px;
                font-weight: 500;
              }
              &__optionBox{
                background: #fff;
                margin-top: auto;
                padding: 0 8px 16px;
                border-radius: 8px 8px;
              }
              &__optionLabel{
                font-size: 14px;
                margin-bottom: 5px;
                line-height: 16px;
                padding-top: 10px;
              }
              &__option{
                display: flex;
                .count{
                  width: 30%;
                  padding-right: 10px;
                }
                .term{
                  padding-left: 10px;
                  width: 70%;
                  font-size: 10px;
                }
              }
            }
            &.add{
              min-height: 200px;
              opacity: .5;
              transition: all .3s ease;
              cursor: pointer;
              &:hover{
                opacity: 1;
              }
              .productSub{
                display: flex;
                align-items: center;
                justify-content: center;
                .addSub{
                  width: 60px;
                  height: 60px;
                  border-radius: 50%;
                  border: 5px solid #EB4C42;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #EB4C42;
                  font-size: 35px;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
  }
  &__range{
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    background-color: #fff;
    color: rgba(0,0,0,.87);
    border-radius: 5px;
    padding: 16px ;
    .name{

    }
  }
}
.dialogProduct__content{
  max-height: 600px;
  height: 600px;
  overflow: auto;
  .none{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 24px;
  }
}
.dialog-listProduct{
  display: flex;
  flex-wrap: wrap;
  &__item{
    width: 20%;
    background: #E8F2FE;
    padding: 10px;
    border: 2px solid #fff;
    border-radius: 8px;
    position: relative;
    .image{
      margin-bottom: 15px;
    }
    .name{
      line-height: 16px;
      font-size: 14px;
      color: #000;
    }
    &:hover{
      .add{
        opacity: 1;
      }
    }
    .add{
      transition: all .3s ease;
      opacity: 0;
      cursor: pointer;
      border-radius: 8px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 5px solid #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 35px;
        font-weight: bold;
      }
    }
  }
}
</style>
