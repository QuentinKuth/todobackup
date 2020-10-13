<template>
  <div>
  <router-link to="/"><h1 style="text-align:center; margin-top: 0.67em; font-size: 1.5em; color: black">Zurück</h1></router-link>
    <img src="../assets/kalender.jpg" class="kalenderCss"/>
  </div>

</template>

<script>
export default {
  name: "Kalender"
}
</script>

<style>

.kalenderCss {
  display: block;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}

</style>
