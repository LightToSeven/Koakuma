<template>
  <div class="section-multiBanner">
    <div class="section-multiBanner__block">
      <div class="grid">
        <div class="grid__item" v-for="(item, index) in banners" :key="index">
          <a class="box inner--light" href="#">
            <div class="box__image">
              <img class="grid-view-item__image" :src="imageUrl(item)">
            </div>
            <div class="box__content" :class="[item.description_horizontal_position, item.description_vertical_position]">
              <h1>{{item.localeTitle}}</h1>
              <router-link class="cta primary--light" :to="item.localeFirstButtonLink" v-if="item.localeFirstButtonText">{{item.localeFirstButtonText}}</router-link>
              <router-link class="cta secondary"  :to="item.localeSecondButtonLink" v-if="item.localeSecondButtonText">{{item.localeSecondButtonText}}</router-link>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheMultiBanner',
  props: ['banners'],
  methods: {
    imageUrl (item) {
      const img = item.image && `${process.env.VUE_APP_ROOT_IMAGE}${item.image}`
      return img || ''
    }
  }
}
</script>

<style scoped lang="scss">
  .section-multiBanner{
    &__block{
      padding: 0 20px;
      .grid{
        margin: 0 0 20px;
        &__item{
          &:first-child {
            margin-bottom: 10px;
          }
          .box{
            color: black;
            display: flex;
            height: auto;
            overflow: hidden;
            position: relative;
            width: 100%;
            &.inner--light{
              color: #fff;
            }
            &__image{
              height: 290px;
              width: 100%;
              img{
                object-position: top;
                height: 100%;
                max-height: 730px;
                min-height: 450px;
                object-fit: cover;
                width: 100%;
              }
            }
            &__content{
              position: absolute;
              z-index: 100;
              top: 50%;
              transform: translate(0, -50%);
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              h1{
                font-family: "Montserrat", Helvetica, Arial, sans-serif;
                font-size: 32px;
                font-weight: 700;
                letter-spacing: 0.5px;
                line-height: 38px;
                margin: 0 0 20px;
                padding: 0;
                text-align: inherit;
                text-transform: uppercase;
              }
              .cta{
                width: max-content;
                display: block;
              }
              &.horizontal_align_center.vertical_align_center{
                transform: translate(-50%,-50%);
              }
              &.horizontal_align_left{
                left: 20px;
                right: auto;
                text-align: left;
                flex-direction: column;
                align-items: flex-start;
              }
              &.horizontal_align_center{
                left: 50%;
                right: auto;
                transform: translateX(-50%);
                text-align: center;
              }
              &.horizontal_align_right{
                left: auto;
                right: 20px;
                text-align: right;
                flex-direction: column;
                align-items: flex-end;
              }

              &.vertical_align_top {
                top: 20px;
                bottom: auto;
              }
              &.vertical_align_center {
                top: 50%;
                bottom: auto;
                transform: translateY(-50%);
              }
              &.vertical_align_bottom {
                top: auto;
                bottom: 20px;
              }
            }
          }
        }
      }
    }
  }
  @media only screen and (min-width: 750px){
    .section-multiBanner{
      &__block {
        padding: 0 30px;
        .grid{
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          &__item{
            width: calc(50% - 5px);
            &:first-child {
              margin-bottom: 0;
            }
            .box{
              &__image{
                height: 240px;
              }
              &__content{
                &.box-right{
                  right: 30px;
                }
                &.box-left{
                  left: 30px;
                }
              }
            }
          }
        }
      }
    }
  }
  @media only screen and (min-width: 990px) {
    .section-multiBanner{
      &__block{
        .grid{
          &__item{
            .box{
              &__image{
                height: 350px;
              }
            }
          }
        }
      }
    }
  }
  @media only screen and (min-width: 1400px){
    .section-multiBanner{
      &__block{
        padding: 0 60px;
        .grid{
          &__item{
            .box{
              &__image{
                height: 430px;
                img{
                  max-height: none;
                }
              }
              &__content{
                &.box-right{
                  right: 60px;
                }
                &.box-left{
                  left: 60px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
