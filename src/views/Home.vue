<template>
  <AddTask
      v-show="showAddTask"
      @add-task="addTask"
      :showAddTask="showAddTask"
      :selectedTask="selectedTask"
      :resetSelectedTask="resetSelectedTask"
      :updateTask="updateTask"
  />
  <Tasks
      @toggle-reminder="toggleReminder"
      @show-selected-task="showSelectedTask"
      @delete-task="deleteTask"
      :tasks="tasks"
  />
</template>

<script>
import AddTask from '../components/AddTask';
import Tasks from '../components/Tasks';

import TaskApi from '../assets/js/api';

export default {
  name: 'Home',
  props: {
    showAddTask: Boolean,
    toggleAddTask: Function
  },
  components: {
    AddTask,
    Tasks,
  },
  data() {
    return {
      tasks: [],
      selectedTask: {}
    };
  },
  methods: {
    async render() {
      this.tasks = await TaskApi.getAllTask();
    },
    async addTask(task) {
      await TaskApi.addTask(task);
      await this.render();
    },
    async deleteTask(id) {
      if (confirm('Are you sure?')) {
        const res = await TaskApi.deleteTask(id);
        res.status === 200 ? await this.render() : null
      }
    },
    async updateTask(task) {
      await TaskApi.updateTask(task);
      await this.render();
    },
    async toggleReminder(task) {
      const updTask = { ...task, reminder: !task.reminder };
      await TaskApi.updateTask(updTask);
      await this.render();
    },
    showSelectedTask(task) {
      if (!this.showAddTask) this.toggleAddTask();
      this.selectedTask = task;
    },
    resetSelectedTask() {
      this.selectedTask = {};
    },
  },
  async created() {
    this.tasks = await TaskApi.getAllTask();
  },
};
</script>