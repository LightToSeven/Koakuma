<template>
  <div class="header">
    <div class="header__mobNav">
<!--      <div class="btn btn-mobalMenu" @click="mobalMenu = !mobalMenu">-->
<!--        <svg width="50px" height="50px" viewBox="0 0 24 16" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="925b337d-9d9c-4091-a810-5f8027089f6b"><path d="M0,18 L24,18 L24,16 L0,16 L0,18 Z M0,10 L24,10 L24,8 L0,8 L0,10 Z M0,0 L0,2 L24,2 L24,0 L0,0 Z"></path></svg>-->
<!--      </div>-->
<!--      <div class="btn btn-search">-->
<!--        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="1cd436a5-be17-4bd9-9bf5-1f469037a726"><title id="1cd436a5-be17-4bd9-9bf5-1f469037a726">Search</title><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-1217.000000, -57.000000)" fill="#000000" fill-rule="nonzero"><g><path d="M1236.59048,75.4247619 L1231.82238,70.6566667 C1233.00429,69.2157143 1233.71667,67.37 1233.71667,65.3583333 C1233.71667,60.7440476 1229.97262,57 1225.35833,57 C1220.74,57 1217, 60.7440476 1217,65.3583333 C1217,69.972619 1220.74,73.7166667 1225.35833,73.7166667 C1227.37,73.7166667 1229.21167,73.0083333 1230.65262,71.8264286 L1235.42071,76.5904762 C1235.74452,76.9142857 1236.26667,76.9142857 1236.59048,76.5904762 C1236.91429,76.2707143 1236.91429,75.7445238 1236.59048,75.4247619 Z M1225.35833,72.0530952 C1221.66286,72.0530952 1218.65952,69.0497619 1218.65952,65.3583333 C1218.65952,61.6669048 1221.66286,58.6595238 1225.35833,58.6595238 C1229.04976,58.6595238 1232.05714,61.6669048 1232.05714,65.3583333 C1232.05714,69.0497619 1229.04976,72.0530952 1225.35833,72.0530952 Z"></path></g></g></g></svg>-->
<!--      </div>-->
    </div>
    <div class="header__logo">
      <router-link class="link" to="/">
        <img class="logos" src="/logo.svg" alt="">
      </router-link>
<!--      <div class="header__catalog" :class="{active: mobalMenu}">-->
<!--        <div class="header__catalog-mobal">-->
<!--          <div class="btn btn-close" @click="mobalMenu = !mobalMenu">-->
<!--            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="f207ceec-4e58-4d22-9235-ebdba039ced0"><title id="f207ceec-4e58-4d22-9235-ebdba039ced0">Close</title><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5273 1.41613L16.4667 0.355469L8.99998 7.82214L1.53332 0.355469L0.472656 1.41613L7.93932 8.8828L0.472656 16.3495L1.53332 17.4101L8.99998 9.94346L16.4667 17.4101L17.5273 16.3495L10.0606 8.8828L17.5273 1.41613Z" fill="black"></path></svg>          </div>-->
<!--          <div class="btn btn-account">-->
<!--            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="3e27727b-8e9d-4555-9e40-baba944286cd"><title id="3e27727b-8e9d-4555-9e40-baba944286cd">Account</title><path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 4.79092C13.5 2.53192 11.4849 0.700012 9 0.700012L8.782 0.704731C6.39831 0.808141 4.5 2.59836 4.5 4.79092V5.6091C4.5 7.8681 6.5151 9.70001 9 9.70001L9.218 9.69529C11.6017 9.59188 13.5 7.80166 13.5 5.6091V4.79092ZM8.84702 2.20332L9.014 2.19901L9.18583 2.20488C10.7822 2.28873 12 3.44567 12 4.79092V5.6091L11.9946 5.76395C11.9049 7.04676 10.7094 8.12918 9.15298 8.1967L8.96754 8.20036L8.78519 8.19546C7.21783 8.1113 6 6.95435 6 5.6091V4.79092L6.0054 4.63607C6.09507 3.35326 7.29059 2.27084 8.84702 2.20332ZM15.3594 12.6468C13.6548 12.1815 11.3274 11.7 9 11.7C6.6726 11.7 4.3452 12.1815 2.6406 12.6468C1.0773 13.0725 0 14.4972 0 16.1172V18H18V16.1172L17.9949 15.9238C17.913 14.3848 16.8602 13.0555 15.3594 12.6468ZM3.03471 14.0941C5.07704 13.5366 7.12428 13.2 9 13.2C10.8757 13.2 12.923 13.5366 14.9644 14.0939L15.1214 14.1434C15.9428 14.4386 16.5 15.2247 16.5 16.1172V16.499H1.5V16.1172L1.50646 15.9512C1.57496 15.0735 2.1823 14.3262 3.03471 14.0941Z" fill="black"></path></svg>-->
<!--          </div>-->
<!--        </div>-->
<!--        <the-menu-catalog></the-menu-catalog>-->
<!--      </div>-->
    </div>
    <div class="page-promo__menu"  v-if="!$route.meta.requiresComponents">
      <div class="menu">
<!--        <router-link to="/medori" class="menu__item">-->
<!--          Medori-->
<!--        </router-link>-->
        <a href="#promo__forWhom" class="menu__item">
          Для кого
        </a>
        <a href="#promo__components" class="menu__item">
          Особенности
        </a>
        <a href="https://kaiyolifescience.com/" target="_blank" class="menu__item">
          О компании
        </a>
        <a href="#promo__questions"  class="menu__item">
          Вопросы-ответы
        </a>
        <a href="#promo__ficozan" class="menu__item">
          Заказ
        </a>
<!--        <div class="menu__item">-->
<!--          Отзыв-->
<!--        </div>-->
      </div>
    </div>
<!--    <div class="header__catalog">-->
<!--      <the-menu-catalog></the-menu-catalog>-->
<!--    </div>-->
    <div class="header__nav">
<!--      <router-link to="/search" class="btn btn-search">-->
<!--        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="1cd436a5-be17-4bd9-9bf5-1f469037a726"><title id="1cd436a5-be17-4bd9-9bf5-1f469037a726">Search</title><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-1217.000000, -57.000000)" fill="#000000" fill-rule="nonzero"><g><path d="M1236.59048,75.4247619 L1231.82238,70.6566667 C1233.00429,69.2157143 1233.71667,67.37 1233.71667,65.3583333 C1233.71667,60.7440476 1229.97262,57 1225.35833,57 C1220.74,57 1217, 60.7440476 1217,65.3583333 C1217,69.972619 1220.74,73.7166667 1225.35833,73.7166667 C1227.37,73.7166667 1229.21167,73.0083333 1230.65262,71.8264286 L1235.42071,76.5904762 C1235.74452,76.9142857 1236.26667,76.9142857 1236.59048,76.5904762 C1236.91429,76.2707143 1236.91429,75.7445238 1236.59048,75.4247619 Z M1225.35833,72.0530952 C1221.66286,72.0530952 1218.65952,69.0497619 1218.65952,65.3583333 C1218.65952,61.6669048 1221.66286,58.6595238 1225.35833,58.6595238 C1229.04976,58.6595238 1232.05714,61.6669048 1232.05714,65.3583333 C1232.05714,69.0497619 1229.04976,72.0530952 1225.35833,72.0530952 Z"></path></g></g></g></svg>-->
<!--      </router-link>-->
<!--      <router-link to="/login" class="btn btn-account">-->
<!--        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="3e27727b-8e9d-4555-9e40-baba944286cd"><title id="3e27727b-8e9d-4555-9e40-baba944286cd">Account</title><path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 4.79092C13.5 2.53192 11.4849 0.700012 9 0.700012L8.782 0.704731C6.39831 0.808141 4.5 2.59836 4.5 4.79092V5.6091C4.5 7.8681 6.5151 9.70001 9 9.70001L9.218 9.69529C11.6017 9.59188 13.5 7.80166 13.5 5.6091V4.79092ZM8.84702 2.20332L9.014 2.19901L9.18583 2.20488C10.7822 2.28873 12 3.44567 12 4.79092V5.6091L11.9946 5.76395C11.9049 7.04676 10.7094 8.12918 9.15298 8.1967L8.96754 8.20036L8.78519 8.19546C7.21783 8.1113 6 6.95435 6 5.6091V4.79092L6.0054 4.63607C6.09507 3.35326 7.29059 2.27084 8.84702 2.20332ZM15.3594 12.6468C13.6548 12.1815 11.3274 11.7 9 11.7C6.6726 11.7 4.3452 12.1815 2.6406 12.6468C1.0773 13.0725 0 14.4972 0 16.1172V18H18V16.1172L17.9949 15.9238C17.913 14.3848 16.8602 13.0555 15.3594 12.6468ZM3.03471 14.0941C5.07704 13.5366 7.12428 13.2 9 13.2C10.8757 13.2 12.923 13.5366 14.9644 14.0939L15.1214 14.1434C15.9428 14.4386 16.5 15.2247 16.5 16.1172V16.499H1.5V16.1172L1.50646 15.9512C1.57496 15.0735 2.1823 14.3262 3.03471 14.0941Z" fill="black"></path></svg>-->
<!--      </router-link>-->
      <div @click="toggleCart()" class="btn btn-cart"  v-if="$route.meta.requiresComponents">
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="33ee27e6-b765-4df3-819e-38fe60a328ab"><title id="33ee27e6-b765-4df3-819e-38fe60a328ab">Bag</title><path fill-rule="evenodd" clip-rule="evenodd" d="M12.2121 3.55H15.8V18H0.5V3.55H4.08793C4.4824 1.6705 6.15692 0.25 8.15 0.25C10.1431 0.25 11.8176 1.6705 12.2121 3.55ZM10.6589 3.55C10.3193 2.55725 9.40342 1.8238 8.31676 1.75525L8.15 1.75C6.99106 1.75 5.99789 2.50685 5.64105 3.55H10.6589ZM14.299 5.049H1.999V16.499H14.299V5.049Z" fill="black"></path></svg>
        <span>{{cartListCount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import TheMenuCatalog from '@/components/layout/TheMenuCatalog.vue'
import { mapActions, mapGetters } from 'vuex'
import { UPDATE_STATUS_CART } from '@/store/action-types'

export default {
  name: 'TheHeader',
  data: () => {
    return {
      mobalMenu: false
    }
  },
  components: {
    TheMenuCatalog
  },
  computed: {
    ...mapGetters({
      cartListCount: 'cart/cartListCount'
    })
  },
  watch: {
    $route (to, from) {
      this.mobalMenu = false
    }
  },
  mounted () {
    this.$store.commit('cart/UPDATE_PRODUCT_CART_COUNT')
  },
  methods: {
    ...mapActions({
      updateStatusCart: `cart/${UPDATE_STATUS_CART}`
    }),
    toggleCart () {
      this.updateStatusCart()
    }
  }
}
</script>

<style scoped lang="scss">
  .header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 60px;
    background-color: rgb(255, 255, 255);
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    border-bottom: 1px solid rgb(210, 210, 210);
    height: 70px;
    z-index: 1111;
    &__mobNav{
      display: none;
    }
    &__logo{
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      //position: relative;
      flex: 1 1 0;
      justify-content: flex-start;
      a{
        font-family: "Montserrat", Helvetica, Arial, sans-serif;
        color: black;
        text-decoration: none;
      }
      img.logos{
        width: 100px;
      }
    }
    &__catalog{
      display: flex;
      //flex: 1 1 0;
      padding-left: 40px;
      justify-content: center;
      &-mobal{
        display: none;
      }
    }
    &__nav{
      display: flex;
      margin-left: auto;
      flex: 1 1 0;
      justify-content: flex-end;
      .btn{
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        &.btn-cart{
          position: relative;
          cursor: pointer;
          span{
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: rgb(0, 125, 181);
            color: rgb(255, 255, 255);
            font-family: Roboto, Arial, sans-serif;
            font-weight: 500;
            line-height: 18px;
            font-size: 12px;
            text-align: center;
            bottom: 18px;
            right: 6px;
            border: 1px solid rgb(255, 255, 255);
            box-shadow: rgb(0 0 0 / 10%) 0 0 6px;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .header{
      padding: 10px;
      &__mobNav{
        display: flex;
        align-items: center;
        flex: 1 1 0;
        justify-content: flex-start;
        .btn{
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          &.btn-mobalMenu{
            svg{
              width: 19px;
              height: auto;
            }
          }
        }
      }
      &__logo{
        justify-content: center;
        img.logos{
          width: 75px;
        }
      }
      &__catalog{
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
        overflow-x: hidden;
        display: block;
        position: fixed;
        background-color: #fff;
        z-index: 11;
        padding: 0;
        transform: translateX(-100%);
        transition: all .3s ease;
        &.active{
          transform: translateX(0);
        }
        &-mobal{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px 20px 10px;
          .btn{
            display: flex;
            width: 40px;
            justify-content: center;
            align-items: center;
            &.btn-close{
              width: auto;
              svg{
                width: 19px;
                height: auto;
              }
            }
          }
        }
      }
      &__nav{
        .btn-search, .btn-account{
          display: none;
        }
      }
    }
  }
</style>
