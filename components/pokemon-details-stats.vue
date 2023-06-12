<script setup lang='ts'>
  import { PokemonDetailsStats } from '~/utils/types'

  defineProps<{
    stats: Partial<PokemonDetailsStats>[];
  }>()
</script>

<template>
  <v-list lines='one'>
    <v-list-item v-for='stat in stats' :key='stat.name'
                 :title='stat.name'
                 :subtitle='stat.value'>
    </v-list-item>
  </v-list>
</template>
