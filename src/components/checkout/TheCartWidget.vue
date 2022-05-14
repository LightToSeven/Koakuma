<template>
  <div class="module-cart">
    <div @click="toggleCart()" class="module-cart__close"></div>
    <div class="module-cart__header">
      <div class="title" @click="goToCart()">Ваша Корзина</div>
    </div>
    <div class="module-cart__content">
      <div class="module-cart__list" v-if="cartList.length">
          <div class="item" v-for="(item, index) in cartList" :key="index">
            <div class="item__image">
              <router-link :to="{ name: 'product', params: {id: item.id}}"><img :src="imageUrl(item)" alt=""></router-link>
            </div>
            <div class="item__cart">
              <router-link class="name" :to="{ name: 'product', params: {id: item.id}}">
                <h2>{{item.localeName}}</h2>
              </router-link>
              <div class="meta">
                <p>Размер: {{item.size}}</p>
                <span> {{item.price.toLocaleString('ru-RU')}} KZT </span>
              </div>
              <div class="quantity">
                <div class="quantity__minus" :class="{disable: item.quantity < 2}" @click="decreaseProductCartCount(item)">-</div>
                <div class="quantity__input">{{item.quantity}}</div>
                <div class="quantity__plus" @click="increaseProductCartCount(item)">+</div>
              </div>
              <div class="remove" @click="removeProduct(item.id)">Удалить</div>
              <div class="error" v-show="item.quantity > item.count">
                Превышено максимальное количество товаров на складе
              </div>
            </div>
          </div>
      </div>
      <div class="module-cart__text" v-else>
        <h2>ВАША КОРЗИНА В НАСТОЯЩЕЕ ВРЕМЯ ПУСТА.</h2>
      </div>
      <div class="module-cart__footer">
        <div class="total">
          <div class="total__title">Итого</div>
          <div class="total__price"> {{totalPrice(cartList)}} KZT</div>
        </div>
        <div class="buttons">
          <button :disabled="maxQuantity(cartList)" @click="goToCheckout()" class="buttons__checkout cta product">Оформить заказ</button>
          <div @click="goToCart()" class="buttons__cart cta secondary">Ваша Корзина</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { UPDATE_STATUS_CART, REMOVE_PRODUCT_CART } from '@/store/action-types'

export default {
  name: 'TheCartModule',
  data: () => {
    return {
      list: true,
      total: 0
    }
  },
  computed: {
    ...mapGetters({
      cartList: 'cart/cartList'
    })
  },
  methods: {
    ...mapActions({
      updateStatusCart: `cart/${UPDATE_STATUS_CART}`,
      removeProductCart: `cart/${REMOVE_PRODUCT_CART}`
    }),
    toggleCart () {
      this.updateStatusCart()
    },
    goToCart () {
      this.updateStatusCart()
      this.$router.push({ name: 'cart' })
    },
    goToCheckout () {
      this.updateStatusCart()
      this.$router.push({ name: 'checkout' })
    },
    imageUrl (item) {
      const img = Array.isArray(item.images) && item.images.length && `${process.env.VUE_APP_ROOT_IMAGE}${item.images[0].image}`
      return img || ''
    },
    removeProduct (id) {
      this.removeProductCart(id)
    },
    maxQuantity (products) {
      return products.find(item => item.quantity > item.count)
    },
    totalPrice (items) {
      let total = 0
      items.map(item => {
        total += item.price * item.quantity
      })
      return total.toLocaleString('ru-RU')
    },
    decreaseProductCartCount (item) {
      if (item.quantity > 1) {
        this.$store.commit('cart/DECREASE_PRODUCT_CART_COUNT', item.id)
      }
    },
    increaseProductCartCount (item) {
      this.$store.commit('cart/INCREASE_PRODUCT_CART_COUNT', item.id)
    }
  }
}
</script>

<style scoped lang="scss">
  .module-cart {
    display: block;
    bottom: 0;
    right: 0;
    top: 0;
    background: white;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    position: fixed;
    z-index: 1;
    color: black;
    max-width: 440px;
    min-width: 140px;
    width: 280px;
    &__close{
      box-sizing: border-box;
      cursor: pointer;
      display: block;
      height: 40px;
      padding: 10px 12.5px;
      transform: translateY(2px);
      width: 45px;
      position: absolute;
      right: 8px;
      top: 8px;
      z-index: 8;
      &::before, &::after{
        background: black;
        display: block;
        height: 1px;
        left: 50%;
        margin-left: -7.5px;
        position: absolute;
        transition: all 250ms ease-in-out;
        width: 15px;
        top: 19px;
        content: '';
      }
      &::before{
        transform: rotate( 45deg);
      }
      &::after{
        transform: rotate( -45deg);
      }
    }
    &__header{
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      margin: 0 15px 20px;
      .title{
        font-family: "Montserrat", Helvetica, Arial, sans-serif;
        text-align: center;
        line-height: 57px;
        padding: 0 15px;
        font-size: 11px;
        font-weight: 400;
        text-transform: uppercase;
        cursor: pointer;
      }
    }
    &__content{
      max-height: calc(100vh - 78px);
      overflow-y: auto;
      padding: 13px 20px 0;
    }
    &__footer{
      margin-bottom: 15px;
      .total{
        border-bottom: 1px solid #eeeeee;
        color: black;
        font-family: "Montserrat", Helvetica, Arial, sans-serif;
        font-size: 12px;
        font-weight: 600;
        margin: 20px 0 30px;
        padding: 0 2px 17px;
        text-transform: uppercase;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        &__price{
          font-size: 16px;
          font-weight: 600;
        }
      }
      .buttons{
        &__checkout{
          margin-bottom: 10px;
          width: 100%;
          &[disabled=disabled]{
            cursor: default;
            opacity: .5;
            &:hover{
              background-color: #007db5;
            }
          }
        }
      }
    }
    &__list{
      .item{
        border-bottom: 1px solid #eeeeee;
        margin-bottom: 20px;
        padding-bottom: 20px;
        padding-top: 10px;
        position: relative;
        display: flex;
        width: 100%;
        //&.error{
        //  .item__cart{
        //    .name h2{
        //      color: red;
        //    }
        //  }
        //}
        &__image{
          flex: 0 0 90px;
          margin-right: 20px;
          width: 90px;
          a{
            display: block;
          }
        }
        &__cart{
          text-align: left;
          .name{
            h2{
              font-size: 16px;
              font-weight: 400;
              text-transform: capitalize;
              font-family: "Roboto", Helvetica, Arial, sans-serif;
              line-height: 24px;
              margin: -4px 0 2px;
              color: #444444;
              letter-spacing: 0;
              &:hover {
                color: #6e6e6e;
              }
            }
          }
          .meta{
            color: #6e6e6e;
            font-family: "Roboto", Helvetica, Arial, sans-serif;
            p,span{
              font-size: 14px;
              font-weight: 400;
              margin: 0;
              line-height: 24px;
              color: #6e6e6e;
              text-transform: capitalize;
            }
          }
          .quantity{
            margin-top: 10px;
            width: auto;
            display: flex;
            &__minus{
              padding: 0;
              transition: 0.2s all;
              background: #ffffff;
              color: #6E6E6E;
              font-size: 25px;
              font-weight: 400;
              line-height: 36px;
              height: 40px;
              cursor: pointer;
              width: 40px;
              text-align: center;
              border: 1px solid #eeeeee;
              &:hover {
                background: #000;
                color: #ffffff;
              }
              &.disable:hover {
                background: #ffffff;
                color: #6E6E6E;
                cursor: default;
              }
            }
            &__input{
              color: #000000;
              background: #ffffff;
              border: 1px solid #eeeeee;
              width: 40px;
              height: 40px;
              text-align: center;
              display: inline-block;
              border-radius: 0;
              box-shadow: none;
              box-sizing: border-box;
              font-family: "Montserrat", Helvetica, Arial, sans-serif;
              font-size: 12px;
              font-weight: 400;
              line-height: 38px;
              max-width: 100%;
            }
            &__plus{
              padding: 0;
              transition: 0.2s all;
              background: #ffffff;
              color: #6E6E6E;
              font-size: 25px;
              font-weight: 400;
              line-height: 38px;
              height: 40px;
              cursor: pointer;
              width: 40px;
              text-align: center;
              border: 1px solid #eeeeee;
              &:hover {
                background: #000;
                color: #ffffff;
              }
            }
          }
          .remove{
            color: #6E6E6E !important;
            padding: 1px 6px;
            display: inline-block;
            font-family: "Roboto", Helvetica, Arial, sans-serif;
            font-size: 12px;
            margin-top: 6px;
            text-align: left;
            border: none;
            background: none;
            cursor: pointer;
          }
          .error{
            font-size: 10px;
            padding: 4px 0 0;
            color: red;
          }
        }
      }
    }
    &__text{
      h2{
        font-size: 20px;
        margin-bottom: 34px;
      }
    }
  }
  @media only screen and (min-width: 550px) {
    .module-cart{
      width: 440px;
    }
  }
  @media only screen and (min-width: 750px) {
  }
  @media only screen and (min-width: 990px) {
  }
  @media only screen and (min-width: 1400px) {
  }
</style>
