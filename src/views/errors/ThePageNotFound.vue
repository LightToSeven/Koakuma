<template>
    <div class="page-error">
        <div class="page-error__container">
            <h1>404 Page Not Found</h1>
            <p>Мы не можем найти страницу, которую вы искали</p>
            <router-link to="/" class="cta secondary">Главная</router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ThePageNotFound'
}
</script>

<style lang="scss" >
  .page-error{
    background-color: #ececec;
    min-height: 600px;
    padding: 90px 0;
    &__container{
      position: relative;
      text-align: center;
      width: 90%;
      margin: 10px auto 0;
      h1{
        text-align: center;
        margin: 0 0 30px;
        font-weight: 700;
        font-size: 25px;
      }
      p{
        font-size: 18px;
        margin-bottom: 30px;
      }
      a{
        display: block;
        width: max-content;
        margin: 0 auto;
      }
    }
  }
  @media only screen and (min-width: 750px) {
    .page-error{
      &__container{
        color: black;
        width: 50%;
        h1{
          font-size: 36px;
        }
        p{
          font-size: 16px;
        }
      }
    }
  }
</style>
