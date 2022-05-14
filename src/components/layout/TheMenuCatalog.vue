<template>
  <div class="menu-catalog" v-if="categories">
    <div class="menu-catalog__item" v-if="categories">
      <div class="link">Продукция</div>
      <div class="menu-catalog__item-box">
        <div class="menu-catalog__item-list">
          <ul>
            <li v-for="category in categories">
              <span>{{ category.localeName }}</span>
              <ul>
                <li v-for="childrenCategory in category.children">
                  <router-link :to="{ name: 'catalog', params: {slug: childrenCategory.localeSlug}}">{{childrenCategory.localeName}}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="menu-catalog__item-featured">
          <div class="featured__title">Рекомендуемые</div>
          <div class="featured__box" v-for="category in categories">
            <router-link :to="{ name: 'catalog', params: {slug: item.localeSlug}}"  v-for="item in featuredCategories(category.children)">
              <div class="name">{{item.localeName}}</div>
              <div class="image" :style="imageStyle(item.image)"></div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
<!--    <div class="menu-catalog__item" v-if="maleCategories(categories)">-->
<!--      <div class="link">Наборы</div>-->
<!--      <div class="menu-catalog__item-box">-->
<!--        <div class="menu-catalog__item-list">-->
<!--          <ul>-->
<!--            <li v-for="category in maleCategories(categories)">-->
<!--              <span>{{ category.localeName }}</span>-->
<!--              <ul>-->
<!--                <li v-for="childrenCategory in maleCategories(category.children)">-->
<!--                  <router-link :to="{ name: 'catalog', params: {id: childrenCategory.id, slug: childrenCategory.localeSlug}}">{{childrenCategory.localeName}}</router-link>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
<!--        <div class="menu-catalog__item-featured">-->
<!--          <div class="featured__title">Featured</div>-->
<!--          <div class="featured__box" v-for="category in categories">-->
<!--            <router-link :to="{ name: 'catalog', params: {id: item.id, slug: item.localeSlug}}"  v-for="item in featuredCategories(category.children)">-->
<!--              <div class="name">{{item.localeName}}</div>-->
<!--              <div class="image" :style="imageStyle(item.image)"></div>-->
<!--            </router-link>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { REQUEST_CATEGORIES } from '@/store/action-types'

export default {
  name: 'TheMenuCatalog',
  mounted () {
    this.fetchData()
  },
  computed: {
    ...mapGetters({
      categories: 'home/categories'
    })
  },
  methods: {
    ...mapActions({
      requestCategories: `home/${REQUEST_CATEGORIES}`
    }),
    fetchData () {
      this.requestCategories()
    },
    maleCategories (list) {
      return list.filter(category => category.is_male === 1 || category.is_male === 0 && category.is_female === 0)
    },
    femaleCategories (list) {
      return list.filter(category => category.is_female === 1 || category.is_female === 0 && category.is_male === 0)
    },
    featuredCategories (list) {
      return list.filter(category => category.is_featured === 1)
    },
    imageStyle (image) {
      const img = image && `${process.env.VUE_APP_ROOT_IMAGE}${image}`
      return `background-image: url(${img})` || ''
    }
  }
}
</script>

<style scoped lang="scss">
.menu-catalog {
  display: flex;
  justify-content: center;
  align-items: center;

  &__item {
    height: 100%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    border-bottom: 2px solid transparent;
    border-top: 2px solid transparent;
    cursor: pointer;
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    color: rgb(0, 0, 0);
    font-size: 14px;
    font-weight: 500;

    .link {
      position: relative;
      color: rgb(0, 0, 0);
      padding: 20px 0;
      margin: 0 25px;
      transition: color 0.15s ease 0s;
      font-weight: 700;
      text-decoration: none;

      &:hover {
        &:after {
          transform: scaleX(1);
        }
      }

      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background: rgb(0, 0, 0);
        position: absolute;
        bottom: -4px;
        left: 0;
        transform: scaleX(0);
        transition: transform 0.15s ease-in 0s;
        z-index: 110;
      }
    }

    &:hover {
      .menu-catalog__item-box {
        opacity: 1;
        left: 0;
        z-index: 102;
      }
    }

    &-box {
      width: 100%;
      position: absolute;
      top: 70px;
      border-bottom: 1px solid rgb(210, 210, 210);
      left: -9990px;
      opacity: 0;
      transition: opacity 150ms ease-in 0.05s;
      background-color: rgb(255, 255, 255);
      display: flex;
      cursor: default;
    }

    &-list {
      flex: 2 1 0%;
      padding: 25px 0 0;

      ul {
        list-style-type: none;
        margin-block: 0;
        column-count: 3;
        padding-left: 20px;

        li {
          font-family: Montserrat, Helvetica, Arial, sans-serif;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 16px;
          padding: 0 16px 28px;
          break-inside: avoid;

          span {
            display: inline-block;
            margin-bottom: 5px;
          }

          ul {
            list-style-type: none;
            margin: 0px;
            column-count: 1;
            padding: 0px;

            li {
              font-size: 16px;
              font-weight: 500;
              font-family: Roboto, Arial, sans-serif;
              text-transform: capitalize;
              line-height: 30px;
              padding: 0;

              a {
                color: rgb(83, 86, 90);
                text-decoration: none;
                transition: 0.1s cubic-bezier(0.44, 0.13, 0.48, 0.87);

                &:hover {
                  color: rgb(0, 0, 0);
                }
              }
            }
          }
        }
      }
    }

    &-featured {
      font-weight: 700;
      font-family: Montserrat, Helvetica, Arial, sans-serif;
      text-transform: uppercase;
      margin: 10px 0 16px 16px;
      width: 320px;
      max-width: 320px;
      height: 350px;
      flex: 1 1 0%;
      display: block;
      position: relative;

      .featured__title {
        margin-bottom: 10px;
      }

      .featured__box {
        position: relative;
        display: flex;
        height: 100%;
        flex-direction: row;
        overflow-x: scroll;

        a {
          position: relative;
          display: block;
          height: 100%;
          overflow-x: scroll;
          min-width: 80vw;
          margin: 10px 16px 16px;

          &:first-of-type {
            margin: 10px 0;
          }

          .name {
            font-size: 16px;
            margin: 16px;
            position: absolute;
            bottom: 0;
            color: rgb(255, 255, 255);
          }

          .image {
            background-size: cover;
            background-position: center center;
            background-color: grey;
            min-height: 130px;
          }
        }
      }
    }
  }
}

// -> 48em
@media only screen and (min-width: 768px) {
  .menu-catalog {
    &__item {
      &-list {
        ul {
          li {
            span {
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
}

// -> 64em
@media only screen and (min-width: 1024px) {
  .menu-catalog {
    &__item {
      &-list {
        display: flex;
        justify-content: center;
        flex: 1.9 1 0%;

        ul {
          column-count: 4;

          li {
            span {
              padding: 0px;
            }

            ul {
              li {
                font-size: 14px;
                line-height: 21px;
                margin-bottom: 3px;
              }
            }
          }
        }
      }

      &-featured {
        background-color: rgb(245, 245, 245);
        margin: 0;
        padding: 20px;
        display: flex;
        flex-direction: column;

        .featured__title {
          margin-bottom: 0;
        }

        .featured__box {
          flex-direction: column;
          overflow-x: visible;

          a {
            min-width: auto;
            overflow-x: visible;
            margin: 10px 0px;

            &:first-of-type {
              margin-bottom: 0px;
            }
          }
        }
      }
    }
  }
}

// -> 75em
@media only screen and (min-width: 1200px) {
  .menu-catalog {
    &__item {
      &-featured {
        max-width: 400px;
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .menu-catalog{
    &__item{
      flex-direction: column;
      width: 100%;
      &-box{
        position: relative;
        top: inherit;
        opacity: 1;
        z-index: 1;
        left: inherit;
        flex-direction: column;
      }
      &-list{
        flex: 1;
        width: 100%;
        ul{
          padding: 0;
          column-count: 1;
        }
      }
      &-featured{
        max-width: 100%;
        width: 100%;
        margin: 0;
        flex: 1;
        padding: 10px 0 16px 16px;
        .featured{
          &__box{
            height: auto;
          }
        }
      }
    }
  }
}
</style>
