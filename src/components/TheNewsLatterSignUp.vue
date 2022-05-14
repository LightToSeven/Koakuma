<template>
  <div class="section-newsletter-signup">
    <div class="container">
      <p>Подпишитесь на нашу <span>рассылку</span> для уведомлений про <span>последние новости</span> а также <span>эксклюзивные предложения</span></p>
      <button class="cta secondary" >
        Зарегистрироваться
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheNewsLatterSignUp'
}
</script>

<style scoped lang="scss">
  .section-newsletter-signup{
    background:  0% 0% / cover rgb(245, 245, 245);
    color: rgb(0, 0, 0);
    padding: 40px 0;
    width: 100%;
    .container{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      max-width: 80%;
      min-width: 200px;
      position: relative;
      p{
        font-family: "Montserrat", Helvetica, Arial, sans-serif;
        font-size: 15px;
        text-align: center;
        width: 70%;
        margin-bottom: 10px;
        span {
          font-weight: 700;
        }
      }
      .cta {
        margin: 0 20px;
      }
    }
  }
  @media only screen and (min-width: 750px){
    .section-newsletter-signup{
      .container{
        p{
          width: auto;
          margin-bottom: 0;
        }
        .cta {
          margin-left: 40px;
        }
      }
    }
  }
  @media only screen and (min-width: 990px) {}
  @media only screen and (min-width: 1400px){}
</style>
