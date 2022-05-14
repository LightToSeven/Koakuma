<template>
  <div class="productSub">
      <div class="productSub__image">
        <img :src="product.images.length ? imageUrl(product.images[0].path) : '/img/no-image.jpg'" alt="">
      </div>
      <div class="productSub__name">{{ product.name }}</div>
      <div class="productSub__count">
        <div class="count">
          Кол-во: {{item.count}}
        </div>
      </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'TheSubProductView',
  props: ['item'],
  data: () => ({
    product: {
      images: [],
      name: '---'
    }
  }),
  mounted () {
    this.fetchData()
  },
  computed: {
  },
  methods: {
    ...mapActions({
      requestProduct: 'catalog/REQUEST_PRODUCT'
    }),
    fetchData () {
      this.requestProduct(this.item.id)
        .then(result => {
          this.product = result.data
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
}
</style>
