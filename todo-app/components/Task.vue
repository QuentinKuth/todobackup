<template>
  <transition name="fade">
    <div class="task" v-if="!task.deleted">
      <input :id="id" type="checkbox" class="input_check" v-model="task.done" v-if="enable_edit == false"/>
      <label :for="id" v-if="enable_edit == false">{{ task.title }}</label> 
      <input type="text" v-if="enable_edit == true" v-model="task.title" class="edit_taskss"/>
      <span class="" @click="editTask({ task })" v-if="enable_edit == false"><i class="fa fa-pencil"></i></span>
      <span class="" @click="savetask()" v-if="enable_edit == true"><i class="fa fa-save"></i></span>
      <transition name="fade">
        <span class="task_delete" v-show="task.done" @click="deleteTask({ task })" ><i class="fa fa-trash"></i></span>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex'
let GID = 1
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      id: `task-${GID++}`,
      enable_edit:false,
      task_data:null,
    }
  },
  methods: {
    ...mapMutations(['deleteTask']),
    editTask(task){
      this.enable_edit = true;
      this.task_data = task;
    },
    savetask(){
      this.enable_edit = false;
      this.task_data = null;
    },
  }
}
</script>

<style lang="scss">
.task {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.edit_taskss{
  width: 100%;
  display: block;
    padding: 0px 4px;
    margin: -13px 0;
}
.task .input_check {
  display: none;
}
.task label {
  flex: 1;
  line-height: 20px;
}
.task label:before,
.task label:after {
  content: '';
  display: inline-block;
  margin-right: 20px;
  margin-top: 1px;
  width: 14px;
  height: 14px;
  vertical-align: top;
}
.task label:before {
  border: 1px solid #ccc;
  border-radius: 2px;
  background-color: white;
}
.task label:after {
  content: '\f00c';
  position: relative;
  display: none;
  z-index: 10;
  margin-right: -16px;
  width: 10px;
  height: 10px;
  padding: 3px;
  border-radius: 2px;
  font: normal normal normal 10px/1 FontAwesome;
  color: white;
  background-color: #20b2aa;
  float: left;
}
.task input:checked + label:after {
  display: inline-block;
}
.task_delete {
  padding: 0 10px;
  color: #ccc;
  font-size: 16px;
}
.fade-leave-to,
.fade-enter {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
</style>
