<template>
  <!-- https://github.com/goweiwen/vue-swing -->
  <div id="app">
    <router-link to="/"><h1 style="text-align:center; margin-top: 0.67em; font-size: 1.5em; color: black">Zurück</h1></router-link>

    <vue-swing
        @throwout="onThrowout"
        :config="config"
        ref="vueswing"
    >
      <div
          v-for="card in cards"
          :key="card"
          class="card"
      >
        <span>{{ card }}</span>
      </div>
    </vue-swing>

    <img src="../assets/heart.png" class="heart"/>
    <img src="../assets/x.png" class="x"/>

  </div>
</template>

<script>
import VueSwing from 'vue-swing'
export default {
  name: 'todotinder',
  components: { VueSwing },
  data () {
    return {
      config: {
        allowedDirections: [
          VueSwing.Direction.UP,
          VueSwing.Direction.DOWN,
          VueSwing.Direction.LEFT,
          VueSwing.Direction.RIGHT
        ],
        minThrowOutDistance: 250,
        maxThrowOutDistance: 300
      },
      cards: ['Hausarbeit schreiben', 'Hund füttern']
    }
  },
  methods: {
    add () {
      this.cards.push(`${this.cards.length + 1}`)
    },
    remove () {
      this.swing()
      setTimeout(() => {
        this.cards.pop()
      }, 100)
    },
    swing () {
      const cards = this.$refs.vueswing.cards
      cards[cards.length - 1].throwOut(
          Math.random() * 100 - 50,
          Math.random() * 100 - 50
      )
    },
    onThrowout ({ target, throwDirection }) {
      console.log(`Threw out ${target.textContent}!`)
    }
  }
}
</script>

<style>

.x {
  position: absolute;
  bottom: 120px;
  left: 45px;
  width: 20%;
}

.heart {
  width: 12%;
  position: absolute;
  bottom: 140px;
  right: 60px;
}

body {
  background-color: #444;
  margin: 0;
}
.card {
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  font-size: 20px;
  height: 200px;
  justify-content: center;
  left: calc(50% - 100px);
  position: absolute;
  top: calc(50% - 100px);
  width: 200px;
}
</style>
