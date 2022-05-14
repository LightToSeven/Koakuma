<template>
  <div class=""></div>
</template>
<script>
export default {
  name: 'NotFoundRedirect',
  mounted () {
    window.location.href = '/error/404'
  },
  locale () {
    return this.$store.state.locale
  }
}
</script>
