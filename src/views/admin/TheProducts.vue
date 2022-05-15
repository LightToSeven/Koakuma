<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div class="pageTitle">
          <h2 style="text-align: left;text-transform: none;">Game items</h2>
          <div class="pageTitle__buttons">
            <v-btn color="success" class="mr-2" @click="onAdd">Add</v-btn>
            <v-btn color="primary" @click="onSubmit">Save</v-btn>
          </div>
        </div>
        <v-form>
          <div class="itemInfo" v-for="(item, index) in listItem" :key="index">
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
                  rows="2"
                ></v-textarea>
                <v-select v-model="item.rarity" :items="selectRarity" item-text="name" item-value="value"></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <img class="itemInfo-img" :src="item.image" alt="">
                <v-btn color="error" style="margin: 0 0 0 auto; display: block" class="mt-5" @click="listItem.splice(index, index+1);">delay</v-btn>
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
  name: 'TheCategory',
  data: () => ({
    listItem: [],
    selectRarity: [
      {
        name: 'Delicate',
        value: 2
      },
      {
        name: 'Rare',
        value: 1
      },
      {
        name: 'Epic',
        value: 4
      },
      {
        name: 'Legendary',
        value: 3
      }
    ]
  }),
  mounted () {
    this.fetchData()
  },
  methods: {
    async onSubmit () {
      const db = getDatabase()
      await set(ref(db, 'listGameItem'), this.listItem)
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
      await onValue(ref(db, 'listGameItem'), (snapshot) => {
        console.log('snapshot', snapshot.val())
        const data = snapshot.val()
        this.listItem = data
      })
    },
    onAdd () {
      this.listItem.unshift({
        name: '',
        description: '',
        image: '',
        rarity: ''
      })
    }
  }
}
</script>
