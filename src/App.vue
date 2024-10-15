<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <RouterView :key="$route.fullPath"/>
</template>

<style scoped lang="scss">

#app {
  width: 100%;
}
</style>
