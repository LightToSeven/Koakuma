<template>
  <div class="section-seoBlock" v-html="desc"></div>
</template>

<script>
export default {
  name: 'TheSeoBlock',
  props: ['desc']
}
</script>

<style lang="scss">
  .section-seoBlock {
    background-color: #ffffff;
    padding: 24px;
    margin: 16px;
    position: relative;
    text-align: left;
    border: 1px solid #bbbcbc;
    h1{
      font-size: 14px;
      line-height: 19px;
      font-weight: 700;
      text-align: left;
      color: #000000;
      margin: 0 0 16px;
    }
    p {
      font-size: 14px;
      line-height: 21px;
      text-align: left;
      font-family: "Roboto", Helvetica, Arial, sans-serif;
      color: #6e6e6e;
      margin: 0 0 15px;
      &:last-child {
        margin: 0;
      }
    }
  }
  @media only screen and (min-width: 750px) {
    .section-seoBlock {
      margin: 40px 30px;
      padding: 30px;
    }
  }
  @media only screen and (min-width: 990px) {
    .section-seoBlock {
      padding: 32px;
    }
  }
  @media only screen and (min-width: 1400px) {
    .section-seoBlock {
      margin: 56px 60px;
    }
  }

</style>
