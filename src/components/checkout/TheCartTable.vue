<template>
  <div class="section-cart">
    <div class="section-cart__title">
      <h1>КОРЗИНА ДЛЯ ПОКУПОК</h1>
    </div>
    <div class="section-cart__null" v-if="!cartList.length">
      <p>
        Ваша корзина в настоящее время пуста.<br>
        Продолжить просмотр <a class="classic-link" href="/">здесь</a>.
      </p>
    </div>
    <div class="section-cart__form" v-else>
      <div class="section-cart__table">
        <table>
          <thead>
          <tr>
            <th class="th-label" colspan="2">Продукт</th>
            <th>Количество</th>
            <th>Сумма</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in cartList" :key="index">
            <td class="td-image">
              <router-link :to="{ name: 'product', params: {id: item.id}}"><img :src="imageUrl(item)" alt="">
              </router-link>
            </td>
            <td class="td-content">
              <div class="box-product">
                <router-link class="name" :to="{ name: 'product', params: {id: item.id}}">
                  <h2>{{ item.localeName }}</h2>
                </router-link>
                <div class="meta">
                  <p>Размер: {{ item.size }}</p>
                  <span> {{ item.price.toLocaleString('ru-RU') }} KZT </span>
                </div>
                <div class="error" v-show="item.quantity > item.count">
                  Превышено максимальное количество товаров на складе
                </div>
              </div>
            </td>
            <td class="td-quantity">
              <div class="quantity">
                <div class="quantity__minus" :class="{disable: item.quantity < 2}"
                     @click="decreaseProductCartCount(item)">-
                </div>
                <div class="quantity__input">{{ item.quantity }}</div>
                <div class="quantity__plus" @click="increaseProductCartCount(item)">+</div>
              </div>
              <div class="remove" @click="removeProduct(item.id)">Удалить</div>
            </td>
            <td class="td-total">
              {{ (item.quantity * item.price).toLocaleString('ru-RU') }} KZT
            </td>
          </tr>
          </tbody>
        </table>
        <table>
          <tfoot>
          <tr>
            <td>
              <router-link to="/">Продолжить покупки</router-link>
            </td>
            <td class="td-message">
              <p></p>
            </td>
            <td class="td-total">Итого</td>
            <td class="td-total-price">
              <p> {{ totalPrice(cartList) }} KZT</p>
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
      <div class="section-cart__message">
        <h3>Бесплатная доставка по Великобритании, если вы потратите более 35 фунтов стерлингов *</h3>
      </div>
      <div class="section-cart__action">
        <div class="section-cart__action-payment">
          <ul>
            <li><img
              src="//cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/master-173035bc8124581983d4efa50cf8626e8553c2b311353fbf67485f9c1a2b88d1.svg">
            </li>
            <li><img
              src="//cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4fdbdb1a35ce83b89cca12a187f00.svg">
            </li>
          </ul>
        </div>
        <div class="section-cart__action-buttons">
          <button :disabled="maxQuantity(cartList)" @click="goToCheckout()" class="cta product btn--checkout">
            Продолжить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { REMOVE_PRODUCT_CART } from '@/store/action-types'

export default {
  name: 'TheCartTable',
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters({
      cartList: 'cart/cartList'
    })
  },
  methods: {
    ...mapActions({
      removeProductCart: `cart/${REMOVE_PRODUCT_CART}`
    }),
    goToCheckout () {
      this.$router.push({ name: 'checkout' })
    },
    imageUrl (item) {
      const img = Array.isArray(item.images) && item.images.length && `${process.env.VUE_APP_ROOT_IMAGE}${item.images[0].image}`
      return img || ''
    },
    removeProduct (id) {
      this.removeProductCart(id)
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
    },
    maxQuantity (products) {
      return products.find(item => item.quantity > item.count)
    }
  }
}
</script>
<style scoped lang="scss">
.section-cart {
  margin: 0 auto;
  padding: 0 20px;
  max-width: none;

  &__table {
    border-collapse: collapse;
    width: 100%;

    .quantity {
      margin-top: 10px;
      width: auto;
      display: flex;
      text-align: center;
      justify-content: center;

      &__minus {
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

      &__input {
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

      &__plus {
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

    .remove {
      color: #6E6E6E;
      display: inline-block;
      font-size: 12px;
      margin-top: 6px;
      text-align: left;
      cursor: pointer;
    }

    .box-product {
      text-align: left;
      padding-right: 5px;

      .name {
        color: black;

        h2 {
          font-size: 16px;
          font-weight: 400;
          text-transform: capitalize;
          font-family: "Roboto", Helvetica, Arial, sans-serif;
          margin: 20px 0 0;
          color: #444444;
          line-height: 24px;
          letter-spacing: 0;
        }
      }

      .error {
        color: red;
        font-size: 11px;
      }

      .meta {
        color: #6e6e6e;

        p, span {
          font-size: 14px;
          font-weight: 400;
          margin: 0;
          line-height: 24px;
          color: #6e6e6e;
          text-transform: capitalize;
        }
      }
    }

    table {
      border-spacing: 0;
      width: 100%;
      display: table;
      text-indent: initial;
      border-color: grey;

      thead {
        tr {
          background: #eeeeee;

          th {
            background: #eeeeee;
            display: none;
            font-family: "Montserrat", Helvetica, Arial, sans-serif;
            font-size: 11px;
            font-weight: 400;
            padding: 17px 20px;
            text-transform: uppercase;

            &.th-label {
              display: table-cell;
              text-align: left;
            }
          }
        }
      }

      tbody {
        vertical-align: top;

        tr {
          border: 1px solid #eeeeee;
          position: relative;
        }

        td {
          font-family: "Roboto", Helvetica, Arial, sans-serif;

          &:first-child {
            text-align: center;
          }

          &.td-image {
            border-right: none;
            float: none;
            padding-right: 0;
            width: 90px;

            a {
              display: block;
              padding: 20px;
              width: 130px;
            }
          }

          &.td-content {
            border-left: none;
            display: inherit;
            vertical-align: top;
            width: 100%;
          }

          &.td-total {
            display: none;
          }

          &.td-quantity {
            display: inline-block;
            margin-bottom: 15px;
            margin-top: 8px;
            width: auto;
          }
        }
      }

      tfoot {
        border: 1px solid #eeeeee;
        text-align: center;

        td {
          padding: 17px 0;

          &:first-child {
            display: none;

            a {
              font-size: 12px;
              cursor: pointer;
              text-decoration: underline;
              vertical-align: inherit;
              font-family: "Roboto", Helvetica, Arial, sans-serif;
            }
          }

          &.td-message {
            color: #6e6e6e;
          }

          &.td-total {
            font-size: 16px;
            font-weight: 600;
            padding-left: 20px;
            text-align: left;
            text-transform: uppercase;
            width: 50%;
            font-family: "Roboto", Helvetica, Arial, sans-serif;
          }

          &.td-total-price {
            color: black;
            font-size: 16px;
            font-weight: 600;
            width: 50%;
            font-family: "Roboto", Helvetica, Arial, sans-serif;
          }
        }
      }
    }
  }

  &__title {
    margin-bottom: 20px;
    margin-top: 20px;
    text-align: center;

    h1 {
      font-size: 26px;
      margin: 0;
    }
  }

  &__null {
    text-align: center;
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 25px;

    a {
      cursor: pointer;
      text-decoration: underline;
      vertical-align: inherit;

      &:hover {
        text-decoration: none;
      }
    }
  }

  &__form {
    max-width: 1206px;
    margin: auto;
  }

  &__message {
    h3 {
      font-size: 11px;
      font-weight: 400;
      line-height: 17px;
      margin-top: 20px;
      text-align: center;
      text-transform: uppercase;
    }
  }

  &__action {
    margin-top: 20px;
    text-align: center;

    &-payment {
      margin-bottom: 30px;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;

      ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
          display: inline-block;
          margin-top: 5px;
          vertical-align: middle;
          margin-right: 2px;

          img {
            width: 40px;
          }
        }
      }
    }

    &-buttons {
      .btn--checkout {
        min-width: 350px;
        width: 100%;
        margin-bottom: 15px;

        &[disabled=disabled] {
          cursor: default;
          opacity: .5;

          &:hover {
            background-color: #007db5;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 750px) {
  .section-cart {
    padding: 0 30px;

    &__table {
      margin: 0;

      .box-product {
        .name {
          h2 {
            margin: 0;
          }
        }
      }

      table {
        thead {
          tr {
            th {
              border: 1px solid #eeeeee;
              display: table-cell;
            }
          }
        }

        tbody {
          tr {
            border-bottom: none;
            border-top: none;
            display: table-row;
            position: inherit;

            &:first-child {
              border-top: none;

              td {
                border-top: none;

              }
            }

            &:last-child {
              border-top: none;

              td {
                border-bottom: 1px solid #eeeeee;
              }
            }
          }

          td {
            border: 1px solid #eeeeee;
            border-bottom: none;
            border-left: none;
            padding: 20px;
            text-align: center;

            &:first-child {
              border-left: 1px solid #eeeeee;
            }

            &.td-image {
              border-right: none;
              float: none;
              padding-right: 0;
              width: 90px;

              a {
                padding: 0;
                width: 90px;
              }
            }

            &.td-content {
              display: table-cell;
              width: auto;
              vertical-align: middle;
            }

            &.td-total {
              color: #444444;
              display: table-cell;
              font-family: "Roboto", Helvetica, Arial, sans-serif;
              font-size: 14px;
              font-weight: 400;
              width: 140px;
              vertical-align: middle;
              line-height: 19px;
            }

            &.td-quantity {
              display: table-cell;
              margin: 0;
              width: 165px;
              vertical-align: middle;
            }
          }
        }

        tfoot {
          border-top: none;

          td {
            border-bottom: 1px solid #eeeeee;

            &:last-child {
              border-right: 1px solid #eeeeee;
            }

            &:first-child {
              border-left: 1px solid #eeeeee;
              display: table-cell;
              padding-left: 20px;
              text-align: left;
            }

            &.td-message {
              border: 0;
            }

            &.td-total {
              padding-left: 0;
              width: 165px;
            }

            &.td-total-price {
              text-align: center;
              width: 140px;
            }
          }
        }
      }
    }

    &__title {
      margin-bottom: 30px;
      margin-top: 30px;
    }

    &__message {
      h3 {
        font-size: 12px;
        line-height: 18px;
        margin-top: 30px;
        text-align: right;
      }
    }

    &__action {
      margin-bottom: 30px;
      margin-top: 30px;
      text-align: left;
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;

      &-payment {
        margin-bottom: 0;
        justify-content: flex-start;
        width: 60%;

        ul {
          li {
            margin-top: 0;
          }
        }
      }

      &-buttons {
        .btn--checkout {
          max-width: none;
          width: 100%;
        }
      }
    }
  }
}

@media only screen and (min-width: 990px) {
  .section-cart {
    &__action {
      align-items: center;

      &-buttons {
        .btn--checkout {
          margin-bottom: 0;
          margin-left: 30px;
          width: auto;
        }
      }
    }
  }
}

@media only screen and (min-width: 1400px) {
  .section-cart {
    padding: 0 60px;
  }
}

@media only screen and (max-width: 768px) {
  .section-cart {
    &__table {
      table {
        border-collapse: collapse;
        border: 1px solid #eeeeee;
      }
    }
  }
}
</style>
