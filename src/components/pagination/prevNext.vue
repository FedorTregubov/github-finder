<template>
  <div class="button-list">
    <div class="btn btnPrimary" @click="prevPage" :disabled="prevDisabled">&#8592;</div>
    <div class="btn btnPrimary" @click="nextPage" :disabled="nextDisabled">&#8594;</div>
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
    prevDisabled() {
      return this.page.curr <= 1;
    },
    nextDisabled() {
      return (this.page.curr * this.page.length) >= this.repos.length;
    }
  },

  methods: {
    prevPage() {
      this.$store.commit('prevPage');
    },
    nextPage() {
      this.$store.commit('nextPage');
    },
  }
}
</script>

<style lang="scss" scoped>
  .button-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
  }
  .btn[disabled] {
    opacity: 0.5;
    cursor: default;
  }
</style>