<script setup lang="ts">
import { DateTime } from 'luxon'
import { onMounted, ref } from 'vue'
import MainHeader from '../components/MainHeader.vue'
import SunlightCard from '../components/SunlightCard.vue'
import getGeolocation from '../utils/getGeolocation'
import type { CardConfigI, CoordsI } from '../types'

const monthsNumber = 12
const monthsToCalculateDate = [...Array(monthsNumber).keys()]
const dates = monthsToCalculateDate.map((i) => DateTime.now().plus({ months: i }))

const initialCards = dates.map((date) => ({ date, id: date.toISO() || '' }))

const cards = ref<CardConfigI[]>(initialCards)
const coords = ref<CoordsI>({ lat: undefined, lng: undefined })

onMounted(() => {
  const handlePosition = (position: GeolocationPosition) => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }

    coords.value = pos

    cards.value = dates.map((date) => {
      const id = date.toISODate() + JSON.stringify(pos)
      return { id, date, ...pos }
    })
  }
  getGeolocation(handlePosition)
})
</script>

<template>
  <main class="p-5">
    <MainHeader :position="coords" />
    <br />
    <div class="grid">
      <SunlightCard v-for="card in cards" :key="card.id" :card="card" />
    </div>
  </main>
</template>
