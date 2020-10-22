<template>
  <!--Quelle fuer die Projektstruktur und Aufbau der Applikation https://github.com/lizzz0523/limni/tree/master/todo-app -->
  <div class="home">
    <Slide>
        <router-link to="Kalender"><h1>Kalender</h1></router-link>
        <router-link to="Todotinder"><h1>To-Do-Tinder</h1></router-link>
        <router-link to="Einstellungen"><h1>Einstellungen</h1></router-link>
    </Slide>
    <app-bar title="TODO"/>
    <avatar />
    <gradient />
    <todo-list />
    <todo-detail />
    <todo-editing  />
    <floating-button />
    <quick-add />
    <router-view />
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'  // import the CSS transitions you wish to use, in this case we are using `Slide`
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
    Slide,
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

.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  left: 20px;
  top: 20px;
  cursor: pointer;
}
.bm-burger-bars {
  background-color: #ffffff;
}

.line-style {
  position: absolute;
  height: 20%;
  left: 0;
  right: 0;
}
.cross-style {
  position: absolute;
  top: 12px;
  right: 2px;
  cursor: pointer;
}
.bm-cross {
  background: #ffffff;
}
.bm-cross-button {
  height: 24px;
  width: 24px;
}
.bm-menu {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Stay on top */
  top: 0;
  left: 0;
  background-color: rgb(63, 63, 65); /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}

.bm-overlay {
  background: rgba(0, 0, 0, 0);
}
.bm-item-list {
  color: #b8b7ad;
  margin-left: 10%;
  font-size: 20px;
}
.bm-item-list > * {
  display: flex;
  text-decoration: none;
  padding: 0.7em;
}
.bm-item-list > * > span {
  margin-left: 10px;
  font-weight: 700;
  color: white;
}

h1 {
  color: white;
}

</style>
