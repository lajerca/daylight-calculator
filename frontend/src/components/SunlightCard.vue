<script setup lang="ts">
import { localeStringOptions } from '@/constants/dates'
import { type SunlightItemResponseI } from '@/types'

import Card from 'primevue/card'
import { toRefs } from 'vue'
import { useQuery } from 'vue-query'
import { type CoordsI, type CardConfigI } from '../types'

const API_URL = import.meta.env.VITE_API_BASE_URL

interface PropsI {
  card: CardConfigI & CoordsI
}

const props = defineProps<PropsI>()

const { date, lat, lng } = toRefs(props.card)

const getData = () => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lat: lat?.value,
      lng: lng?.value,
      date: date.value.toISODate()
    })
  }

  // not needed to install axios for a single request
  return fetch(API_URL, requestOptions)
    .then((response) => response.json())
    .then((data) => data)
}

const queryOptions = {
  queryKey: ['getSunlightData', date.value.toISODate(), lat?.value, lng?.value],
  queryFn: getData,
  enabled: Boolean(lat?.value && lng?.value)
}

const { isFetching, data } = useQuery<SunlightItemResponseI>(queryOptions)
</script>

<template>
  <Card class="m-2 col sunlight-card" :key="props.card.date.toISODate() || ''">
    <template #title>
      <h5>
        <b>{{ props.card.date.toLocaleString(localeStringOptions) }}</b>
      </h5>
    </template>
    <template #content>
      <div>Day length:</div>
      <div v-if="isFetching">Loading...</div>
      <div v-else>
        <h5>
          <b>
            {{ data?.day_length || '---' }}
          </b>
        </h5>
      </div>
    </template>
  </Card>
</template>

<style>
.sunlight-card {
  min-width: 200px;
}
</style>
