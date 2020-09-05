<template>
  <div class="wrapper-content wrapper-content--fixed">
      <section>
        <div class="container">
          <div class="error" v-if="error">
            <div>{{ error }}</div>
          </div>

          <searchComponent :value="search" 
            placeholder="Type username..." 
            @search="search = $event"
          />
          <button v-if="!repos.length" class="btn btnPrimary" @click="getUser">Search!</button>
          <button v-else class="btn btnPrimary" @click="getUser">Search Again</button>

          <userComponent v-if="user && Object.keys(user).length" :user="user" />

          <reposComponent v-if="repos && repos.length" :repos="repos" />

          <modeChanger />
        </div><!--container-->
      </section>
  </div>
</template>

<script>
import searchComponent from '@/components/Search.vue';
import userComponent from '@/components/User.vue';
import {default as reposComponent} from '@/components/Repos.vue';
import modeChanger from '@/components/pagination/modeChanger.vue';

export default {
  components: {
    searchComponent,
    userComponent,
    reposComponent,
    modeChanger
  },

  data() {
    return {
      search: '',
    }
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
    repos() {
      return this.$store.getters.repos;
    },
    error() {
      return this.$store.getters.error;
    }
  },

  methods: {
    getUser() {
      this.$store.dispatch('fetchUser', { search: this.search });
      this.$store.dispatch('fetchRepos', { search: this.search });
    },
    
  }
}
</script>

<style lang="scss" scoped>
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btn{
    margin-top: 40px;
  }
  .error {
    margin-bottom: 20px;
    color: #f00;
  }
</style>