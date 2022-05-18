<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div class="pageTitle">
          <h2 style="text-align: left;text-transform: none;">Partners items</h2>
          <div class="pageTitle__buttons">
            <v-btn color="success" class="mr-2" @click="onAdd">Add</v-btn>
            <v-btn color="primary" @click="onSubmit">Save</v-btn>
          </div>
        </div>
        <v-form>
          <v-row>
            <v-col
            v-for="(item, index) in partnersList"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card class="">
              <div class="bgImage">
                <v-img
                  :src="`${item.src.length ? item.src : '/img/no-image.jpg'}`"
                  height="200px"
                >
                </v-img>
                <v-btn  class="delay" color="error" @click="delay(item.uuid)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
              <v-card-actions class="white justify-center">
                <v-text-field
                  label="image"
                  v-model="item.src"
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
import { uuidv4 } from '@/utils/uuid'

export default {
  name: 'ThePartners',
  data: () => ({
    partnersList: []
  }),
  mounted () {
    this.fetchData()
  },
  methods: {
    uuidv4,
    delay (uuid) {
      const data = this.partnersList
      this.partnersList = data.filter(item => uuid !== item.uuid )
    },
    async onSubmit () {
      const db = getDatabase()
      await set(ref(db, 'partnersList'), this.partnersList)
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
      await onValue(ref(db, 'partnersList'), (snapshot) => {
        const data = snapshot.val()
        this.partnersList = data
        console.log('this.partnersList', this.partnersList)
      })
    },
    onAdd () {
      this.partnersList.unshift({
        src: '',
        uuid: this.uuidv4()
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
