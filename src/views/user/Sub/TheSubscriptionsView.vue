<template>
  <div class="section-viewSub">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <div class="pageTitle">
            <h2 style="text-align: left;text-transform: none;">Подписка: {{'test'}}</h2>
            <div class="buttons">
              <v-btn color="error" dark @click="cancelSub(id)">
                Отменить подписку
              </v-btn>
              <v-btn class="ml-2"  color="success" dark @click="$router.go(-1)">
                Назад
              </v-btn>
            </div>
          </div>
          <v-row>
            <v-col cols="12">
              <div class="section-viewSub__title">Данные доставки</div>
              <div class="section-viewSub__container">
                <v-form>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        label="Город"
                        v-model="delivery.city"
                        prepend-icon="mdi-city"
                        type="text"
                      ></v-text-field>
                      <v-text-field
                        label="Адрес"
                        v-model="delivery.address"
                        prepend-icon="mdi-map-marker"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="Имя"
                        v-model="delivery.firstname"
                        prepend-icon="mdi-account"
                        type="text"
                      ></v-text-field>
                      <v-text-field
                        label="Фамилия"
                        v-model="delivery.lastname"
                        prepend-icon="mdi-account"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="E-mail"
                        v-model="delivery.email"
                        prepend-icon="mdi-email"
                        type="text"
                      ></v-text-field>
                      <v-text-field
                        label="Тел."
                        v-model="delivery.phone"
                        prepend-icon="mdi-cellphone"
                        type="text"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="section-viewSub__title">Каталог корзин</div>
              <div class="section-viewSub__container">
                <div class="section-viewSub__tabCarts">
                  <div class="tabCart-nav">
                    <v-tabs
                      background-color="primary"
                      dark
                      v-model="tab"
                    >
                      <v-tab
                        v-for="(item, index) in carts"
                        :key="index"
                      >
                        {{ index + 1 }} мес.
                      </v-tab>
                    </v-tabs>
                  </div>
                  <div class="tabCart-content">
                    <v-tabs-items v-model="tab">
                      <v-tab-item
                        v-for="(cart, index) in carts"
                        :key="index"
                      >
                        <div class="section-viewSub__catalog">
                          <div class="section-addSub__catalog-list">
                            <div class="item">
                              <div class="item__products" >
                                <div class="item__products-item" v-for="(item, index) in cart.products" :key="index">
                                  <the-sub-product-view :item="item"></the-sub-product-view>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </v-tab-item>
                    </v-tabs-items>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import TheSubProductView from './TheSubProductView'

export default {
  name: 'TheSubscriptionsView',
  components: { TheSubProductView },
  props: ['id'],
  comments: {
    TheSubProductView
  },
  data: () => ({
    carts: [],
    delivery: {
      firstname: '',
      lastname: '',
      city: '',
      address: '',
      email: '',
      phone: ''
    },
    tab: null
  }),
  mounted () {
    this.fetchData()
    this.userData()
  },
  computed: {
    ...mapGetters({
      user: 'auth/userData'
    })
  },
  methods: {
    ...mapActions({
      requestCancelSub: 'subs/CANCEL_SUB',
      requestCartsSub: 'subs/GET_CARTS_SUB',
      requestCartSub: 'subs/GET_CART_SUB',
      requestProduct: 'catalog/REQUEST_PRODUCT'
    }),
    setName: function (val) {
      console.log('val', val.product)
      return val.product ? val.product.name : 'No name'
    },
    cancelSub (val) {
      this.requestCancelSub(val)
        .then(result => {
          console.log('products: ', result.data)
          this.$router.go(-1)
        })
    },
    userData () {
      this.delivery.email = this.user.email || ''
      this.delivery.phone = this.user.phone || ''
      this.delivery.firstname = this.user.name || ''
    },
    fetchData () {
      this.requestCartsSub(this.id)
        .then(result => {
          console.log('requestCartsSub', result)
          this.carts = result.data
        })
    },
    imageUrl (val) {
      return process.env.VUE_APP_ROOT_IMAGE + val
    }
  }
}
</script>
<style lang="scss">
.section-viewSub{
  &__title{
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 10px;
  }
  &__container{
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    background-color: #fff;
    color: rgba(0,0,0,.87);
    border-radius: 5px;
    padding: 16px ;
  }
  &__tabCarts{
    .tabCart{
      &-nav{
        border-bottom: 5px solid #1976d2;
        padding: 8px 16px 0;
        margin: -16px -16px 0;
        background-color: #1976d2;
        border-radius: 5px 5px 0 0;
      }
      &-content{
      }
    }
  }
  &__catalog{
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
</style>
