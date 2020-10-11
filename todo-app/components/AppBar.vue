
<template>
  <div class="app-bar">

    <router-link to=""><h1 style="text-align:center; margin-top: 0.67em; font-size: 1.5em;">Todo</h1></router-link>

  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">

</style>
