<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div class="pageTitle">
          <h2 style="text-align: left;text-transform: none;">Подписки</h2>
          <div class="buttons">
            <v-btn color="success" dark @click="toCreate">
              Создать подписку
            </v-btn>
          </div>
        </div>
        <v-data-table
          :headers="headers"
          :items="itemSubs"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:item.name="{ item }">
            {{ item.name || 'Ручная подписка' }}
          </template>
          <template v-slot:item.period="{ item }">
            {{ item.carts.length }} мес.
          </template>
          <template v-slot:item.createdAt="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon v-if="item.status === 'canceled'"
                    style="opacity: 0.5"
            >
              mdi-eye
            </v-icon>
            <router-link v-else color="success" small :to="{ name: 'user-subscriptions-view', params: {id: item.id }}">
              <v-icon
              >
                mdi-eye
              </v-icon>
            </router-link>
          </template>
          <template v-slot:item.status="{ item }">
            <span :class="item.status">{{item.status}}</span>
          </template>
          <template v-slot:no-data>
            <v-btn
              color="primary"
              @click="fetchData"
            >
              Обновить
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  name: 'TheSubscriptions',
  data: () => ({
    rules: [
      value => !value || value.size < 2000000 || 'Размер изображения должен быть меньше 2 MB!'
    ],
    itemSubs: [],
    headers: [
      {
        text: 'Название',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Длительность', value: 'period', sortable: false },
      { text: 'Дата', value: 'createdAt', sortable: false },
      { text: 'Статус', value: 'status', sortable: false },
      { text: '', value: 'actions', align: 'end', sortable: false }
    ]
  }),
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions({
      getSubList: 'subs/GET_SUB_LIST'
    }),
    formatDate (value) {
      moment.locale('ru')
      return moment(value).locale('ru').format('DD MMMM YYYY, HH:mm')
    },
    toCreate () {
      this.$router.push({ name: 'user-subscriptions-add' }).catch(e => {})
    },
    fetchData () {
      this.getSubList()
        .then(result => {
          console.log('GET_SUB_LIST: ', result.data)
          this.itemSubs = result.data
        })
    }
  }
}
</script>
<style lang="scss">
span{
  &.active{
    color: #4caf50;
  }
  &.canceled{
    color: #EF3124;
  }
}
</style>
