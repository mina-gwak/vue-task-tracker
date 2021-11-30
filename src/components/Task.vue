<template>
  <div @dblclick="$emit('toggle-reminder')" :class="[task.reminder ? 'reminder' : '', 'task']">
    <div class="top-container">
      <h3>{{ task.text }}</h3>
      <div class="icon-group">
        <i @click="$emit('show-selected-task')" class="fas fa-edit"></i>
        <i @click="$emit('delete-task')" class="fas fa-times delete"></i>
      </div>
    </div>
    <p>{{ task.day }}</p>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: Object,
  },
};
</script>

<style scoped>
.fas.delete {
  color: red;
}

.task {
  background-color: #f4f4f4;
  cursor: pointer;
  padding: 10px 20px;
  margin-bottom: 5px;
}

.top-container {
  display: flex;
  justify-content: space-between;
}

.icon-group i {
  margin-left: 8px;
}

.task.reminder {
  border-left: 5px solid green;
}

.task h3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>