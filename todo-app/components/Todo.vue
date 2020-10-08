<template>
  <div class="todo" :class="{ todo__selected: selected }">
    <div class="todo_head" @click="handleClick">
      <div class="todo_icon" :style="{ color }">
        <i :class="['fa', `fa-${todo.icon}`]"></i>
      </div>
      <div class="todo_menu"><i class="fa fa-ellipsis-v"></i></div>
    </div>
    <div class="todo_body">
      <p class="todo_tips" v-if="todo.tasks">{{ todo.tasks.length }} Tasks</p>
      <h3 class="todo_title" v-if="editing == false">{{ todo.name }} <i v-if="selected != null" @click="enable_editing" class="fa fa-pencil-square-o"></i></h3>
      <h3 class="todo_title" v-if="editing == true"><input class="editing_toggles" v-model="todo.name" /><i v-if="selected != null" @click="save_editing" class="fa fa-save"></i></h3>
      <div class="todo_progress">
        <span class="todo_progress_line">
          <i :style="{ width: progress, backgroundImage: progressColor }"></i>
        </span>
        <span class="todo_progress_num">{{ progress }}</span>
      </div>
      <div class="todo_tasks">
        <h4 class="todo_subtitle" v-if="todayTasks.length">Today</h4>
        <ul class="columns">
          <draggable v-model="todo.tasks">
          <li v-for="task in todayTasks" :key="task.id" class="column"> 
            <task :todo="todo" :task="task" />
          </li>
        </draggable>
        </ul>
        <h4 class="todo_subtitle" v-if="tomorrowTasks.length">Tomorrow</h4>
        <ul>
          <draggable v-model="todo.tasks">
          <li v-for="task in tomorrowTasks" :key="task.id">
            <task :todo="todo" :task="task" />
          </li>
          </draggable>
        </ul>
        <h4 class="todo_subtitle" v-if="outdatedTasks.length">Outdated</h4>
        <ul>
          <draggable v-model="todo.tasks">
          <li v-for="task in outdatedTasks" :key="task.id">
            <task :todo="todo" :task="task" />
          </li>
          </draggable>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Task from './Task.vue'
import draggable from 'vuedraggable';
import { today, tomorrow } from '../shared'
export default {
  components: {
    Task,draggable
  },
  data () {
        return {
          editing: false,
        }
  },
  props: {
    todo: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean
    }
  },
  computed: {
    color () {
      return (this.todo && this.todo.colors) ? this.todo.colors[0] : '#ff6262';
    },
    progress () {
      const totalCount = this.todo.tasks.filter(t => !t.deleted).length
      const doneCount = this.todo.tasks.filter(t => !t.deleted && t.done).length
      return totalCount > 0 ? `${Math.round((doneCount / totalCount) * 100)}%` : 0;
    },
    progressColor () {
      const colorLeft = `color-stop(30%, ${(this.todo && this.todo.colors) ? this.todo.colors[0] : '#ff6262'})`
      const colorRight = `to(${(this.todo && this.todo.colors) ? this.todo.colors[1] : '#ffa947'})`
      return `-webkit-gradient(linear, left bottom, right bottom, ${colorLeft}, ${colorRight})`
    },
    todayTasks () {
      return this.todo.tasks.filter(task => {
        return task.date >= today && task.date < tomorrow
      })
    },
    tomorrowTasks () {
      return this.todo.tasks.filter(task => {
        return task.date >= tomorrow
      })
    },
    outdatedTasks () {
      return this.todo.tasks.filter(task => {
        return task.date < today
      })
    }
  },
  methods: {
    enable_editing(){
      this.editing = true;
    },
    save_editing(){
      this.editing = false;
    },
    handleClick () {
      const appRect = document.querySelector('#app').getBoundingClientRect()
      const elRect = this.$el.getBoundingClientRect()
      const todo = this.todo
      const rect = {}
      rect.top = elRect.top - appRect.top
      rect.left = elRect.left - appRect.left
      rect.width = elRect.width
      rect.height = elRect.height
      rect.appWidth = appRect.width
      rect.appHeight = appRect.height
      this.$emit('select', { rect, todo })
    }
  }
}
</script>

<style lang="scss">
.editing_toggles{
      width: 90%;
    height: 100%;
    font-size: 22px;
}
.fa-save{
  width: 10%;
    margin: 1px 4px;
}
.fa-pencil-square-o{
      font-size: 19px;
    margin: 15px 9px;
}
.todo {
  flex: 1;
  margin: 0 8px;
  overflow: hidden;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #666;
}
.todo__selected {
  visibility: hidden;
}
.todo_head {
  display: flex;
  padding: 20px;
  height: 44px;
  justify-content: space-between;
  align-items: flex-start;
  transform: translate3d(0, 0, 0);
  will-change: transform;
}
.todo_body {
  padding: 0 20px;
  transform: translate3d(0, 189px, 0);
  will-change: transform;
}
.todo_icon {
  display: flex;
  width: 44px;
  height: 44px;
  border: 1px solid #eee;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.todo_menu {
  color: #eee;
}
.todo_tips {
  opacity: 0.6;
  font-size: 13px;
  font-weight: 600;
}
.todo_title {
  margin-top: 6px;
  font-size: 32px;
  display: inline-flex;
}
.todo_progress {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.todo_progress_line {
  margin-right: 10px;
  flex: 1;
  height: 3px;
  background-color: #eee;

  i {
    display: block;
    height: 100%;
    transition: all 0.3s ease;
  }
}
.todo_progress_num {
  font-size: 12px;
}
.todo_tasks {
  opacity: 0;
  transform: scale3d(1, 0, 1);
  // transform-origin: top;
  // will-change: transform opacity;
}
.todo_subtitle {
  margin-top: 32px;
  margin-bottom: 8px;
  color: #999;
}
</style>
var dragSrcEl = null;

function handleDragStart(e) {
  // Target (this) element is the source node.
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);

  this.classList.add('dragElem');
}
function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  this.classList.add('over');

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    //alert(this.outerHTML);
    //dragSrcEl.innerHTML = this.innerHTML;
    //this.innerHTML = e.dataTransfer.getData('text/html');
    this.parentNode.removeChild(dragSrcEl);
    var dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin',dropHTML);
    var dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
    
  }
  this.classList.remove('over');
  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  this.classList.remove('over');

  /*[].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });*/
}

function addDnDHandlers(elem) {
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragenter', handleDragEnter, false)
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragend', handleDragEnd, false);

}

var cols = document.querySelectorAll('#columns .column');
[].forEach.call(cols, addDnDHandlers);

