<template>
  <div class="wrapper">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">Github Finder</div>
          </div>
        </div>
      </div>
    </header>
    
    <router-view></router-view>

    <footer></footer>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.navbar-link {
  &.router-link-exact-active{
    color: blue;
  }
}
</style>
