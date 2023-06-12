<template>
  <v-container>
    <p>Species name: {{ species && species.name }}</p>
    <p>Capture rate: {{ species && species.captureRate }}</p>
  </v-container>
</template>
<script setup lang='ts'>
  import { PokemonDetailsSpecies } from '~/utils/types'

  defineProps<{
    species:PokemonDetailsSpecies
  }>()
</script>