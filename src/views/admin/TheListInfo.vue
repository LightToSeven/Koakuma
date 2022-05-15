<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div class="pageTitle">
          <h2 style="text-align: left;text-transform: none;">TheListInfo</h2>
          <div class="pageTitle__buttons">
            <v-btn color="success" class="mr-2" @click="onAdd">Add</v-btn>
            <v-btn color="primary" @click="onSubmit">Save</v-btn>
          </div>
        </div>
        <v-form>
          <div class="itemInfo" v-for="(item, index) in listInfo" :key="index">
            <v-row>
              <v-col cols="12" sm="8" md="8">
                <v-text-field
                  label="image"
                  v-model="item.image"
                  type="text"
                ></v-text-field>
                <v-text-field
                  label="name"
                  v-model="item.name"
                  type="text"
                ></v-text-field>
                <v-textarea
                  label="description"
                  v-model="item.description"
                  type="text"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <img class="itemInfo-img" :src="item.image" alt="">
                <v-btn color="error" style="margin: 0 0 0 auto; display: block" class="mt-5" @click="listInfo.splice(index, index+1);">delay</v-btn>
              </v-col>

            </v-row>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { getDatabase, ref, set, onValue } from 'firebase/database'

export default {
  name: 'TheListInfo',
  data: () => ({
    listInfo: []
  }),
  mounted () {
    this.fetchData()
  },
  methods: {
    async onSubmit () {
      const db = getDatabase()
      await set(ref(db, 'listInfo'), this.listInfo)
        .then(() => {
          this.$toasted.success('List info updated!').goAway(5000)
        })
        .catch(err => {
          this.$toasted.error(err.message).goAway(5000)
          console.log(err)
        })
    },
    async fetchData () {
      const db = getDatabase()
      await onValue(ref(db, 'listInfo'), (snapshot) => {
        console.log('snapshot', snapshot.val())
        const data = snapshot.val()
        this.listInfo = data
      })
    },
    onAdd () {
      this.listInfo.unshift({
        name: '',
        description: '',
        image: ''
      })
    }
  }
}
</script>
<style lang="scss">
.itemInfo{
  margin-bottom: 10px;
  border: 1px solid #000;
  padding: 20px;
  &-img{
    width: 100%;
    height: 300px;
    object-fit: contain;
    object-position: center;
  }
}
</style>
