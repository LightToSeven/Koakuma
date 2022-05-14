<template>
  <div class="wrapper__admin">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <router-link :to="`/`" style="color: #fff">
          <span class="hidden-sm-and-down">Альфа корзина</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-avatar size="36px" item>
          <v-img src="/img/no-avatar.png" alt="Vuetify"></v-img>
        </v-avatar>
      </v-btn>
      <v-btn icon @click="logOut">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  name: 'TheUser',
  data () {
    return {
      seoText: false,
      drawer: null,
      items: [
        {
          icon: 'mdi-store',
          text: 'Подписки',
          link: '/user/subscriptions'
        },
        {
          icon: 'mdi-settings-outline',
          text: 'Настройки',
          link: '#'
        }
      ]
    }
  },
  components: {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    ...mapMutations({
      logout: 'auth/REMOVE_TOKEN'
    }),
    logOut: function () {
      this.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang="scss">
.wrapper{
  &__login{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
