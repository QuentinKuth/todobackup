<template>
  <div class="home">
    <app-bar title="TODO" left="bars" right="search" />
    <avatar />
    <gradient />
    <todo-list />
    <todo-detail />
    <todo-editing  />
    <floating-button />
    <quick-add />
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue'
import Avatar from '../components/Avatar.vue'
import Gradient from '../components/Gradient.vue'
import TodoList from '../components/TodoList.vue'
import TodoDetail from '../components/TodoDetail.vue'
import TodoEditing from '../components/TodoEditing.vue'
import FloatingButton from '../components/FloatingButton.vue'
import QuickAdd from '../components/QuickAdd.vue'
export default {
  components: {
    AppBar,
    Avatar,
    Gradient,
    TodoList,
    TodoDetail,
    TodoEditing,
    FloatingButton,
    QuickAdd
  }
}
</script>

<style>
.home {
  height: 120vh;
  width: 100%;
  overflow-x: hidden;
  color: white;
}
</style>
