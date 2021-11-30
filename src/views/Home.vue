<template>
  <AddTask
      v-show="showAddTask"
      @add-task="addTask"
  />
  <Tasks
      @toggle-reminder="toggleReminder"
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
  },
  components: {
    AddTask,
    Tasks,
  },
  data() {
    return {
      tasks: [],
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
    async toggleReminder(task) {
      const updTask = { ...task, reminder: !task.reminder };
      await TaskApi.updateTask(updTask);
      await this.render();
    }
  },
  async created() {
    this.tasks = await TaskApi.getAllTask();
  },
};
</script>