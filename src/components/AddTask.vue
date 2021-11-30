<template>
  <form @submit.prevent="onSubmit" class="add-form">
    <div class="form-control">
      <label>Task</label>
      <input type="text" v-model="text" name="text" placeholder="Add Task"/>
    </div>
    <div class="form-control">
      <label>Day & Time</label>
      <input type="text" v-model="day" name="day" placeholder="Add Day & Time"/>
    </div>
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" v-model="reminder" name="reminder"/>
    </div>
    <input type="submit" value="Save Task" class="btn btn-block"/>
  </form>
</template>

<script>
import TaskApi from "../assets/js/api";

export default {
  name: 'AddTask',
  props: {
    selectedTask: Object,
    resetSelectedTask: Function,
    showAddTask: Boolean,
    updateTask: Function
  },
  data() {
    return {
      text: '',
      day: '',
      reminder: false,
    };
  },
  methods: {
    async onSubmit() {
      if (!this.text) {
        alert('Please add a task');
        return;
      }

      const newTask = {
        text: this.text,
        day: this.day,
        reminder: this.reminder,
      };

      const tasks = await TaskApi.getAllTask();

      for (let task of tasks) {
        if (task.id === this.selectedTask.id) {
          this.updateTask({
            ...newTask, id: task.id
          });
          this.resetData();
          return;
        }
      }

      this.$emit('add-task', newTask);
      this.resetData();
    },
    resetData() {
      this.text = '';
      this.day = '';
      this.reminder = false;
      this.resetSelectedTask();
    }
  },
  watch: {
    selectedTask(task) {
      if (this.selectedTask.length !== 0) {

      }
      this.text = task.text;
      this.day = task.day;
      this.reminder = task.reminder;
    },
    showAddTask() {
      !this.showAddTask && this.resetSelectedTask();
    }
  }
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control input:focus {
  outline: none;
}

.form-control-check {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>