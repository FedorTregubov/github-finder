<template>
  <div class="infinite-scroll"></div>
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

  data() {
    return {
      el: null,
      listElm: null
    }
  },

  mounted: {
    disabled() {
      return this.page.length >= this.repos.length;
    }
  },
  methods: {
    loadMore() {
      this.$store.commit('loadMore');
    },
    scrollHandler() {
      if (this.listElm.scrollTop + this.listElm.clientHeight >= this.listElm.scrollHeight) {
        if(!this.disabled) {
          this.loadMore();
        }
      }
    }
  },

  mounted() {
    this.el = document.querySelector('.infinite-scroll');
    this.listElm = this.el.parentElement;

    this.listElm.style.height = '270px';
    this.listElm.style.overflow = 'auto';

    this.listElm.addEventListener('scroll', this.scrollHandler)
  },
  
  destroyed() {
    this.listElm.style.height = 'auto';
    this.listElm.style.overflow = 'visible';
    this.listElm.removeEventListener('scroll', this.scrollHandler, true);
  }
}
</script>

<style lang="scss" scoped>

</style>