<template>
  <div class="user__wrapper">
    <div class="user-left">
      <a :href="user.html_url" 
        :title="userName" 
        target="_blank" 
        rel="noopener"
      >
        <img class="user-avatar" :src="user.avatar_url" :alt="userName">
      </a>

      <a class="user-name"
        :href="user.html_url" 
        :title="userName" 
        target="_blank" 
        rel="noopener"
      >{{ userName }}</a>
    </div>

    <a class="user-repoCount"
      :href="user.repos_url"
      :title="`${userName}'s repos`"
      target="_blank" 
      rel="noopener"
    >{{ user.public_repos }} {{ (user.public_repos > 1) ? 'repos' : 'repo' }}</a>
  </div><!--user__wrapper-->
</template>

<script>
export default {
  name: 'User',

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  computed: {
    userName() {
      return this.user.name || this.user.login
    }
  }
}
</script>

<style lang="scss" scoped>
  .user__wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    margin: 40px auto 0;
  }
  .user-avatar{
    width: 50px;
    height: 50px;
    margin-right: 15px;
    border-radius: 50%;
  }
</style>