<template>
  <div :key="task.id" v-for="task in tasks">
    <Task @toggle-reminder="$emit('toggle-reminder', task)"
          @show-selected-task="$emit('show-selected-task', task)"
          @delete-task="$emit('delete-task', task.id)"
          :task="task" />
  </div>
</template>

<script>
import Task from './Task';

export default {
  name: 'Tasks',
  props: {
    tasks: Array,
  },
  components: {
    Task,
  },
  emits: ['delete-task', 'toggle-reminder', 'show-selected-task'],
};
</script>