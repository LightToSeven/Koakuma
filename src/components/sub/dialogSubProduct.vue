<template>
  <div></div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'dialogSubProduct',
  data: () => ({
    form: {
      range: 6
    },
    category: []
  }),
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions({
      requestCategory: 'catalog/REQUEST_CATEGORY_LIST'
    }),
    open () {
      console.log('open!!!!')
    },
    fetchData () {
      this.requestCategory()
        .then(result => {
          console.log('category: ', result.data)
          this.category = result.data
        })
    }
  }
}
</script>
<style lang="scss">
</style>
