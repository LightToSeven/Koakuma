<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      justify="center"
    >
      <v-col cols="12" sm="5" md="5">
        <v-form>
          <h2>Btn Register</h2>
          <v-text-field
            label="Url"
            v-model="registerLink.link"
            prepend-icon="mdi-link"
            type="text"
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onSubmitRegisterLink">Save</v-btn>
          </v-card-actions>
          <br>
          <br>
          <h2>Footer Menu</h2>
          <v-text-field
            label="Contact"
            v-model="footerMenu.contact"
            prepend-icon="mdi-link"
            type="text"
          ></v-text-field>
          <v-text-field
            label="Litepaper"
            v-model="footerMenu.litepaper"
            prepend-icon="mdi-link"
            type="text"
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onSubmitFooterMenu">Save</v-btn>
          </v-card-actions>
          <br>
          <br>
          <h2>Social Setting</h2>
          <v-text-field
            label="discord"
            v-model="social.discord"
            prepend-icon="mdi-discord"
            type="text"
          ></v-text-field>
          <v-text-field
            label="telegram"
            v-model="social.telegram"
            prepend-icon="mdi-telegram"
            type="text"
          ></v-text-field>
          <v-text-field
            label="twitter"
            v-model="social.twitter"
            prepend-icon="mdi-twitter"
            type="text"
          ></v-text-field>
          <v-text-field
            label="facebook"
            v-model="social.facebook"
            prepend-icon="mdi-facebook-box"
            type="text"
          ></v-text-field>
          <v-text-field
            label="youTube"
            v-model="social.youTube"
            prepend-icon="mdi-play-circle"
            type="text"
          ></v-text-field>
          <v-text-field
            label="social"
            v-model="social.social"
            prepend-icon="mdi-hexagon-multiple"
            type="text"
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onSubmitSocial">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-form>
          <h2>Video Setting</h2>
          <v-text-field
            label="Video (id youTobe)"
            v-model="videoSettings.videoUrl"
            prepend-icon="mdi-play-circle"
            type="text"
          ></v-text-field>
<!--          <LazyYoutubeVideo :thumbnail="{ webp: '/img/no-image.jpg', jpg: '/img/no-image.jpg'}" src="https://www.youtube.com/embed/4JS70KB9GS0" />-->
          <LazyYoutubeVideo :src="'https://www.youtube.com/embed/'+videoSettings.videoUrl" />
          <v-text-field
            label="Placeholder image (url)"
            v-model="videoSettings.placeholderUrl"
            prepend-icon="mdi-presentation-play"
            type="text"
          ></v-text-field>
          <img class="video-image" :src="`${videoSettings.placeholderUrl.length ? videoSettings.placeholderUrl : '/img/no-image.jpg'}`" alt="">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onSubmitVideo">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LazyYoutubeVideo from 'vue-lazy-youtube-video'
import 'vue-lazy-youtube-video/dist/style.simplified.css'

import { getDatabase, ref, set, onValue } from 'firebase/database'

export default {
  name: 'TheDashboard',
  props: {
    source: String
  },
  components: {
    LazyYoutubeVideo
  },
  data: () => ({
    registerLink: {
      link: ''
    },
    footerMenu: {
      contact: '',
      litepaper: ''
    },
    videoSettings: {
      videoUrl: '',
      placeholderUrl: ''
    },
    social: {
      discord: '',
      telegram: '',
      twitter: '',
      facebook: '',
      youTube: '',
      social: ''
    }
  }),
  mounted () {
    this.fetchData()
  },
  methods: {
    async onSubmitFooterMenu () {
      const db = getDatabase()
      await set(ref(db, 'footerMenu'), this.footerMenu)
        .then(() => {
          this.$toasted.success('Register link updated!').goAway(5000)
        })
        .catch(err => {
          this.$toasted.error(err.message).goAway(5000)
          console.log(err)
        })
    },
    async onSubmitRegisterLink () {
      const db = getDatabase()
      await set(ref(db, 'registerLink'), this.registerLink)
        .then(() => {
          this.$toasted.success('Register link updated!').goAway(5000)
        })
        .catch(err => {
          this.$toasted.error(err.message).goAway(5000)
          console.log(err)
        })
    },
    async onSubmitSocial () {
      const db = getDatabase()
      await set(ref(db, 'social'), this.social)
        .then(() => {
          this.$toasted.success('Social networks updated!').goAway(5000)
        })
        .catch(err => {
          this.$toasted.error(err.message).goAway(5000)
          console.log(err)
        })
    },
    async onSubmitVideo () {
      const db = getDatabase()
      await set(ref(db, 'videoSettings'), this.videoSettings)
        .then(() => {
          this.$toasted.success('Video options updated!').goAway(5000)
        })
        .catch(err => {
          this.$toasted.error(err.message).goAway(5000)
          console.log(err)
        })
    },
    async fetchData () {
      const db = getDatabase()
      await onValue(ref(db, 'social'), (snapshot) => {
        console.log('snapshot', snapshot.val())
        const data = snapshot.val()
        this.social = data
      })
      await onValue(ref(db, 'videoSettings'), (snapshot) => {
        console.log('snapshot', snapshot.val())
        const data = snapshot.val()
        this.videoSettings = data
      })
      await onValue(ref(db, 'registerLink'), (snapshot) => {
        console.log('snapshot', snapshot.val())
        const data = snapshot.val()
        this.registerLink = data
      })
      await onValue(ref(db, 'footerMenu'), (snapshot) => {
        console.log('footerMenu', snapshot.val())
        const data = snapshot.val()
        this.footerMenu = data
      })
    }
  }
}
</script>
<style lang="scss">
.video-image{
  height: 300px;
  width: 100%;
  object-fit: cover;
  border: 1px solid ;
}
</style>
