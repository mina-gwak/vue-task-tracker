<template>
  <button @click="onClick" :style="{background: color}" class="btn">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
    color: String,
  },
  methods: {
    onClick() {
      // not reusable
      // this.$emit('toggle-add-task')
      this.$emit('btn-click');
    },
  },
};
</script>