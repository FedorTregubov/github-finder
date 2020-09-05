<template>
  <div class="modeChanger__wrapper">
    <div class="modeChanger-item" v-for="item in modes" :key="item.value">
      <div class="form-group">
        <input type="radio" :id="item.value" :value="item.value" v-model="mode">
        <label :for="item.value">{{ item.label }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modes: [
        { value: 'prevNext', label: 'Prev-Next Arrows' },
        { value: 'loadMore', label: 'Button Load More' },
        { value: 'numeric', label: 'Numeric Buttons' },
        { value: 'infinite', label: 'Infinite Scroll' },
      ],
    }
  },

  computed: {
    page() {
      return this.$store.getters.page;
    },
    mode: {
      get() {
        return this.page.mode;
      },
      set(val) {
        this.$store.commit('setPaginationMode', val);
      }
    }
  },

}
</script>

<style lang="scss" scoped>
  .modeChanger__wrapper{
    margin-top: 50px;
  }
  .form-group{
    display: flex;
    align-items: center;
    input {
      width: auto;
    }
    label {
      margin: 0 0 0 10px;
    }
  }
</style>