<template>
  <div>
    <ul @click="pageHandler" class="button-list">
      <!--first page-->
      <li
        v-if="page.totalPages > 1"
        :class="{ active: page.curr === 1 }"
        class="btn btnPrimary btn_first"
      >1</li>
      
      <!--prev page-->
      <li
        class="btn btnPrimary btn_prev"
        v-if="showPrev"
      >&#8592;</li>
      
      <!--pages-->
      <li
        v-for="item in pages"
        :key="item"
        :class="{ active: item === page.curr }"
        class="btn btnPrimary"
      >{{ item }}</li>


      <!--next page-->
      <li
        class="btn btnPrimary btn_next"
        v-if="showNext"
      >&#8594;</li>

      <!--last page-->
      <li
        v-if="page.totalPages > 1"
        :class="{ active: page.curr === page.totalPages }"
        class="btn btnPrimary btn_last"
        >{{ page.totalPages }}</li>
    </ul>

    <!-- <hr>
    <b>Curr Page:</b> {{ page.curr }} <br>
    <b>Length:</b> {{ page.length }} <br>
    <b>Total Count:</b> {{ maxBtns }} <br>
    <b>Total Pages:</b> {{ page.totalPages }}
    <b>Max Btn Count:</b> {{ maxBtns }}
    <hr> -->
  </div>
</template>

<script>
export default {
  props: {
    maxBtns: {
      type: Number,
      required: true
    },
    page: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      showPrev: false,
      showNext: false,
    }
  },

  computed: {
    pages() {
      //Wasted so much time on it, decided to plug in this peace of code with my vars
      //https://element.eleme.io/#/en-US/component/pagination
      const array = [];
      const pagerCount = this.maxBtns;
      const halfPagerCount = (pagerCount - 1) / 2;
      const currentPage = Number(this.page.curr);
      const pageCount = Number(this.page.totalPages);

      let showPrevMore = false;
      let showNextMore = false;
      
      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true;
        }

        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true;
        }
      }

      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2);
        for (let i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i);
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset ; i <= currentPage + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i);
        }
      }

      this.showPrev = showPrevMore;
      this.showNext = showNextMore;

      return array;
    }
  },


  methods: {
    pageHandler(event) {
      const target = event.target;
      if (target.tagName === 'UL') {
        return;
      }
      let {curr, totalPages} = {...this.page};

      let newPage = Number(event.target.textContent);;

      if (target.className.indexOf('btn_prev') !== -1) {
        newPage =  curr - 1;
      } else if(target.className.indexOf('btn_next') !== -1) {
        newPage =  curr + 1;
      }

      if(!isNaN(newPage)) {
        if(newPage < 1) return;
        if(newPage > totalPages) return;
        if(newPage === curr) return;

        this.$store.commit('setPage', newPage);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-list {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
  .btn {
    margin: 0 10px;
    padding: 0.2em 0.4em;
    border-radius: 0;
    text-align: center;
    &[disabled] {
      opacity: 0.5;
      cursor: default;
    }
    &.active{
      border-color: red;
      background: red;
    }
  }

</style>