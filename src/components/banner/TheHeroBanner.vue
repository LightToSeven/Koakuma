<template>
  <div class="section-heroBanner__slider">
    <div v-if="banners.length > 1" @click="swiperPrev()" class="btn-prev">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.06 73.11"><title>arrow</title><polyline points="4.5 4.5 36.56 36.56 4.5 68.61" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:9px"/></svg>
    </div>
    <div v-if="banners.length > 1" @click="swiperNext()" class="btn-next">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.06 73.11"><title>arrow</title><polyline points="4.5 4.5 36.56 36.56 4.5 68.61" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:9px"/></svg>
    </div>
    <swiper ref="mySwiper" :options="swiperOptions"
    >
      <swiper-slide v-for="(item, index) in banners" :key="index">
          <div class="section-heroBanner full-page-hero " :class="[item.description_horizontal_position, item.description_vertical_position]" >
            <div class="section-heroBanner__image mod-hide-mobile">
              <img class="grid-view-item__image" :src="imageUrl(item)">
              <div class="section-heroBanner__box desktop-light" :class="[item.description_horizontal_position, item.description_vertical_position]">
                <h1>{{item.localeTitle}}</h1>
                <p class="rte" v-html="item.localeDescription"></p>
                <div class="button-wrap">
                  <router-link class="cta primary--light" :to="item.localeFirstButtonLink" v-if="item.localeFirstButtonText">{{item.localeFirstButtonText}}</router-link>
                  <router-link class="cta secondary"  :to="item.localeSecondButtonLink" v-if="item.localeSecondButtonText">{{item.localeSecondButtonText}}</router-link>
                </div>
              </div>
            </div>
            <div class="section-heroBanner__image mod-show-mobile">
              <img class="grid-view-item__image" :src="imageUrl(item)">
              <div class="section-heroBanner__box desktop-light" :class="[item.description_horizontal_position, item.description_vertical_position]">
                <h1>{{item.localeTitle}}</h1>
                <p class="rte" v-html="item.localeDescription"></p>
                <div class="button-wrap">
                  <router-link class="cta primary--light" :to="item.localeFirstButtonLink" v-if="item.localeFirstButtonText">{{item.localeFirstButtonText}}</router-link>
                  <router-link class="cta secondary"  :to="item.localeSecondButtonLink" v-if="item.localeSecondButtonText">{{item.localeSecondButtonText}}</router-link>
                </div>
              </div>
            </div>
          </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  name: 'TheHeroBanner',
  props: ['banners'],
  data () {
    return {
      swiperOptions: {
        slidesPerView: 1,
        simulateTouch: false,
        direction: 'horizontal',
        spaceBetween: 0,
        speed: 500
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    swiperNext () {
      this.swiper.slideNext()
    },
    swiperPrev () {
      this.swiper.slidePrev()
    },
    imageUrl (item) {
      const img = item.image && `${process.env.VUE_APP_ROOT_IMAGE}${item.image}`
      return img || ''
    }
  }
}
</script>

<style scoped lang="scss">
  .section-heroBanner{
    position: relative;
    color: black;
    display: flex;
    height: 100%;
    overflow: hidden;
    width: 100%;
    &__slider{
      margin-bottom: 30px;
      position: relative;
      &:hover{
        .btn-next , .btn-prev{
          opacity: 1;
        }
      }
      .btn-next{
        opacity: 0;
        z-index: 3;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        width: 40px;
        height: 160px;
        background-color:rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-content: center;
        transition: all .3s ease;
        cursor: pointer;
        svg{
          width: 20px;
          height: auto;
        }
      }
      .btn-prev{
        opacity: 0;
        z-index: 3;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: 40px;
        height: 160px;
        background-color:rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-content: center;
        transition: all .3s ease;
        cursor: pointer;
        svg{
          transform: rotate(-180deg);
          width: 20px;
          height: auto;
        }
      }
    }
    &.full-page-hero{
      position: relative;
      .section-heroBanner__image{
        position: relative;
        width: 100%;
      }
      .section-heroBanner__box{
        p{
          font-size: 16px;
          margin-bottom: 20px;
        }
      }
    }
    .mod-hide-mobile{
      display: none;
    }
    .mod-show-mobile {
      display: none;
      max-height: calc(var(--vh, 1vh) * 100 - 60px);
    }
    &::before {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 75%;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0, rgba(0, 0, 0, 0.8) 100%);
      content: '';
      z-index: 1;
      transition: opacity 1s;
    }
    &__image{
      position: relative;
      width: 100%;
      height: 100%;
      display: block;
      img{
        height: 100%;
        max-height: 730px;
        min-height: 450px;
        object-fit: cover;
        width: 100%;
      }
    }
    &__box{
      position: absolute;
      width: 100%;
      z-index: 100;
      h1{
        font-family: Montserrat, Helvetica, Arial, sans-serif;
        font-size: 32px;
        font-weight: 600;
        letter-spacing: 0.5px;
        line-height: 38px;
        margin: 0 0 20px;
        padding: 0;
        text-align: inherit;
        text-transform: uppercase;
      }
      p{
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 25px;
        margin-top: 0;
      }
      .button-wrap{
        display: inline-flex;
        .primary--light{
          margin-right: 20px;
        }
      }
      &.desktop-light{
        color: #ffffff;
      }
    }
  }
  @media only screen and (min-width: 750px){
    .section-heroBanner{
      &.full-page-hero{
        .section-heroBanner__box{
          h1{
            font-size: 30px;
            line-height: 35px;
            font-weight: 700;
          }
          p{
            font-size: 16px;
          }
        }
      }
      &::before {
        left: 0;
        bottom: auto;
        width: 50%;
        height: 100%;
        background: linear-gradient(to left, rgba(255, 255, 255, 0) 35%, rgba(0, 0, 0, 0.8) 100%);
      }
      &__box {
        border-bottom: none;
        margin-bottom: 0;
        padding: 0;
        text-align: left;
        left: 40px;
        top: 50%;
        transform: translate(0, -50%);
        h1{
          margin-bottom: 20px;
        }
      }
      .mod-hide-mobile {
        display: block;
      }
      .mod-show-mobile {
        display: none;
      }
    }
  }
  @media only screen and (min-width: 990px) {
    .section-heroBanner {
      &.full-page-hero {
        .section-heroBanner__box {
          h1 {
            font-size: 40px;
            line-height: 45px;
          }
        }
      }
      &.horizontal_align_left.vertical_align_center:before,&.horizontal_align_left.vertical_align_top:before,
      &.horizontal_align_left.vertical_align_bottom:before{
        left: 0;
        bottom: auto;
        width: 50%;
        height: 100%;
        background: linear-gradient(to left, rgba(255, 255, 255, 0) 35%, rgba(0, 0, 0, 0.8) 100%);
      }
      &.horizontal_align_right.vertical_align_center:before,&.horizontal_align_right.vertical_align_top:before,
      &.horizontal_align_right.vertical_align_bottom:before{
        left: auto;
        right: 0;
        bottom: auto;
        width: 50%;
        height: 100%;
        background: linear-gradient(to right, rgba(255, 255, 255, 0) 35%, rgba(0, 0, 0, 0.8) 100%);
      }
      &.horizontal_align_center.vertical_align_center:before{
        left: 0;
        bottom: auto;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 35%, rgba(0, 0, 0, 0.8) 100%);
      }
      &::before {
        bottom: 0;
        left: auto;
        width: 100%;
        height: 50%;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
      }
      &__box {
        border-bottom: none;
        margin-bottom: 0;
        padding: 0;
        text-align: left;
        transform: translate(0);
        &.horizontal_align_center.vertical_align_center{
          transform: translate(-50%,-50%);
        }
        &.horizontal_align_left{
          left: 60px;
          right: auto;
          text-align: left;
        }
        &.horizontal_align_center{
          left: 50%;
          right: auto;
          transform: translateX(-50%);
          text-align: center;
        }
        &.horizontal_align_right{
          left: auto;
          right: 60px;
          text-align: right;
        }

        &.vertical_align_top {
          top: 60px;
          bottom: auto;
        }
        &.vertical_align_center {
          top: 50%;
          bottom: auto;
          transform: translateY(-50%);
        }
        &.vertical_align_bottom {
          top: auto;
          bottom: 60px;
        }
      }
    }
  }
  @media only screen and (min-width: 1400px){
    .section-heroBanner__image img{
      max-height: none;
    }
  }
  @media only screen and (max-width: 750px){
    .section-heroBanner{
      .mod-show-mobile {
        display: block;
      }
      &__box{
        left: 30px;
        right: 30px;
        bottom: 30px;
        width: auto;
        h1{
          font-size: 20px;
          line-height: 25px;
          margin-bottom: 15px;
          font-weight: 700;
        }
        p{
          font-size: 16px;
          margin-bottom: 20px;
        }
        .button-wrap{
          flex-wrap: wrap;
          .cta{
            margin-top: 5px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
</style>
