<template>
  <transition name="edit">
    <div class="todo-editing" v-if="!!adding">
      <app-bar title="New Tasks" left="close" @left="togglequickAdding" />
      <div class="todo-editing_head">
        <p>What tasks are you planning to perform?</p>
      </div>
      <div class="todo-editing_body">
        <textarea rows="3" v-model="adding.text"></textarea>
      </div>
      <button class="floating-button floating-button__editing" @click="togglequickAdding" :style="{ background: gradientColor }"></button>
    </div>
    </transition>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import AppBar from './AppBar.vue'
export default {
  components: {
    AppBar
  },
  computed: {
    ...mapState(['selected', 'adding']),
    ...mapGetters(['currentTodo']),
    gradientColor () {
      const colorLeft = `color-stop(30%, ${this.currentTodo ? this.currentTodo.colors[0] : "#ff6262"})`
      const colorRight = `to(${this.currentTodo ? this.currentTodo.colors[1]  : '#ffa947'})`
      return `-webkit-gradient(linear, left bottom, right top, ${colorLeft}, ${colorRight})`
    }
  },
  methods: {
    ...mapMutations(['toggleAdding','togglequickAdding']),
    togglequickAdding1(e){
        
    }
  }
}
</script>

<style lang="scss">
.todo-editing {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
  background-color: white;
  color: #666;
  will-change: transform;
}
.todo-editing textarea {
  margin: 6px 0;
  border: none;
  outline: none;
  width: 100%;
  resize: none;
  // background: #eee;
  color: #666;
  font-size: 32px;
  line-height: 1.2em;
}
.todo-editing_head {
  padding: 40px 40px 0;
  color: #999;
}
.todo-editing_body {
  padding: 0 40px;
}
.todo-editing_meta {
  display: flex;
  height: 44px;
  align-items: center;
  border-bottom: 1px solid #eee;
  color: #999;

  i {
    padding-right: 10px;
  }
}
.edit-leave-to,
.edit-enter {
  transform: translateY(100%);
}
.edit-enter-to,
.edit-leave {
  transform: translateY(0);
}
.edit-enter-active {
  transition: all 0.5s ease;
}
.edit-leave-active {
  transition: all 0.5s ease;
}
</style>
