<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div class="pageTitle">
          <h2 style="text-align: left;text-transform: none;">Teams items</h2>
          <div class="pageTitle__buttons">
            <v-btn color="success" class="mr-2" @click="onAdd">Add</v-btn>
            <v-btn color="primary" @click="onSubmit">Save</v-btn>
          </div>
        </div>
        <v-form>
          <v-row>
            <v-col
            v-for="(item, index) in teamList"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card class="">
              <div class="bgImage">
                <v-img
                  :src="`${item.src.length ? item.src : '/img/webSite/team/user-default.png'}`"
                  height="200px"
                >
                </v-img>
                <v-btn  class="delay" color="error" @click="delay(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
              <v-card-actions class="white flex-column " style="align-items: normal">
                <v-text-field
                  label="image"
                  v-model="item.src"
                  type="text"
                ></v-text-field>
                <v-text-field
                  label="Name"
                  v-model="item.name"
                  type="text"
                ></v-text-field>
                <v-text-field
                  label="Position"
                  v-model="item.position"
                  type="text"
                ></v-text-field>
                <v-text-field
                  label="Url"
                  v-model="item.link"
                  type="text"
                ></v-text-field>
              </v-card-actions>
            </v-card>
          </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { getDatabase, ref, set, onValue } from 'firebase/database'

export default {
  name: 'ThePartners',
  data: () => ({
    teamList: []
  }),
  mounted () {
    this.fetchData()
  },
  methods: {
    delay (element) {
      console.log('element', element)
      const data = this.teamList
      this.teamList = data.filter(item => element.name !== item.name && element.src !== item.src)
    },
    async onSubmit () {
      const db = getDatabase()
      await set(ref(db, 'teamList'), this.teamList)
        .then(() => {
          this.$toasted.success('List game item updated!').goAway(5000)
        })
        .catch(err => {
          this.$toasted.error(err.message).goAway(5000)
          console.log(err)
        })
    },
    async fetchData () {
      const db = getDatabase()
      await onValue(ref(db, 'teamList'), (snapshot) => {
        console.log('snapshot', snapshot.val())
        const data = snapshot.val()
        this.teamList = data
      })
    },
    onAdd () {
      this.teamList.unshift({
        src: '',
        name: '',
        position: '',
        link: ''
      })
    }
  }
}
</script>
<style lang="scss">
.bgImage{
  background-color: grey;
  position: relative;
  img{
    max-width: 90%;
  }
  .delay{
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
