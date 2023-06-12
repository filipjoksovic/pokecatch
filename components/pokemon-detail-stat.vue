<script setup lang='ts'>
  defineProps<{
    icon: string;
    title: string;
    statValue: number;
    color:string;
  }>()
</script>

<template>
  <p class='mt-2'>
    <v-icon :icon='icon' :color='color'></v-icon>
    {{title}}: {{ statValue }}
  </p>
</template>

<style scoped>

</style>