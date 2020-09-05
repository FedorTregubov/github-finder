<template>
  <div class="repos__wrapper">
    <!--filter-->
    <div class="repo-filter__wrapper">
      <div class="repo-info">
        <div class="repo-filter" @click="sortRepos('name')">Name &#8595; &#8593;</div>
        <div class="repo-filter" @click="sortRepos('stargazers_count')">Rate &#8595; &#8593;</div>
      </div>
    </div>
    <!-- item -->
    <div class="repo-item" v-for="repo in reposSorted" :key="repo.id">
      <div class="repo-info">
        <a :href="repo.html_url" 
          :title="repo.name" 
          target="_blank"
          rel="noopener"
        >{{ repo.name }}</a> 
        <span>{{ repo.stargazers_count }} ⭐</span>
      </div>
    </div>

    <prevNext v-if="page.mode ==='prevNext'" :repos="repos" :page="page" />
    <loadMore v-else-if="page.mode ==='loadMore'" :repos="repos" :page="page" />
    <numeric v-else-if="page.mode ==='numeric'" :maxBtns="5" :page="page" />
    <infinite v-else-if="page.mode ==='infinite'" :repos="repos" :page="page" />
  </div><!--repos__wrapper-->
</template>

<script>
import prevNext from '@/components/pagination/prevNext.vue';
import loadMore from '@/components/pagination/loadMore.vue';
import numeric from '@/components/pagination/numeric.vue';
import infinite from '@/components/pagination/infinite.vue';

export default {
  components: { 
    prevNext, 
    loadMore, 
    numeric, 
    infinite 
  },

  props: {
    repos: {
      type: Array,
      required: true
    }
  },

  computed: {
    reposSorted() {
      return this.$store.getters.reposSorted;
    },
    page() {
      return this.$store.getters.page;
    }
  },

  methods: {
    sortRepos(attr) {
      this.$store.commit('sortRepos', attr);
    },
  }
  
}
</script>

<style>
  .repos__wrapper{
    width: 400px;
    margin: 40px auto 0;
  }
  .repo-filter__wrapper{
    background: #eee;
  }
    .repo-filter{
      cursor: pointer;
    }
  .repo-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #dbbbdb;
  }
</style>