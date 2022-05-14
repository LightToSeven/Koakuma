<template>
  <div class="breadcrumbs">
    <ul class="Styles__Breadcrumbs-sc-1so6tut-0 kYCsmu">
      <li>
        <a href="https://row.gymshark.com" title="Home">home</a>
      </li>
      <li>CTY Shorts</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TheBreadcrumbs'
}
</script>

<style scoped lang="scss">
.breadcrumbs{
  max-width: 1440px;
  margin: auto;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  opacity: 0;
  ul{
    padding: 10px 30px;
    display: flex;
    align-items: center;
    list-style: none;
    li{
      margin-right: 5px;
      font-size: 14px;
      color: rgb(68, 68, 68);
      text-transform: capitalize;
      &:after {
        content: "/";
        padding-left: 5px;
      }
      &:last-child{
        &:after{
          display: none;
        }
      }
      a{
        text-decoration: none;
        color: rgb(68, 68, 68);
      }
    }
  }
}
// -> 64em
@media only screen and (min-width: 1024px){
  .breadcrumbs{
    ul{
      padding: 20px 50px 17px;
    }
  }
}
@media only screen and (max-width: 768px){
  .breadcrumbs{
    display: none;
  }
}
</style>
