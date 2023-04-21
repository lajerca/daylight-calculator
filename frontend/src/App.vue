<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useQueryProvider } from 'vue-query'

useQueryProvider({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false
    }
  }
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
