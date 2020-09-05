<template>
  <div class="button-list">
    <div class="btn btnPrimary" @click="loadMore" :disabled="disabled">Load More</div>
  </div>
</template>

<script>
export default {
  props: {
    repos: {
      type: Array,
      required: true
    },
    page: {
      type: Object,
      required: true
    }
  },

  computed: {
    disabled() {
      return this.page.length >= this.repos.length;
    }
  },
  methods: {
    loadMore() {
      this.$store.commit('loadMore');
    },
  }
}
</script>

<style lang="scss" scoped>
  .button-list{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
  .btn[disabled] {
    opacity: 0.5;
    cursor: default;
  }
</style>