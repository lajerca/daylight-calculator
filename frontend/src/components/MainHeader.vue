<script setup lang="ts">
import { toRefs } from 'vue'
import { DateTime } from 'luxon'
import Card from 'primevue/card'
import { localeStringOptions } from '../constants/dates'
import { type CoordsI } from '../types'

const date = DateTime.now().toLocaleString(localeStringOptions)
const props = defineProps<{ position: CoordsI }>()
const { position } = toRefs(props)
</script>
<template>
  <header>
    <h1 class="col-12 text-center">Day light calculator</h1>
    <div class="grid flex-wrap">
      <Card class="mx-2 col">
        <template #title> Current date </template>
        <template #content>
          <p>{{ date }}</p>
        </template>
      </Card>
      <Card class="mx-2 col">
        <template #title> Current location </template>
        <template #content>
          <p>lat: {{ position.lat || '---' }} lng: {{ position.lng || '---' }}</p>
        </template>
      </Card>
    </div>
  </header>
</template>
