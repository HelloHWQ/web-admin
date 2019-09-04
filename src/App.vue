<template>
  <div id="app" :class="{'layadmin-side-shrink': this.$store.state.homeShowLeft}">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'app',
  provide() {
    return {
      reload: this.reload
    }
  },
  data: function() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
