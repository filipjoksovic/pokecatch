<template>
  <v-list lines='two'>
    <v-list-item v-for='move in moves' :key='move.name'
                 :title='move.name'
                 :subtitle='move.description'>
    </v-list-item>
  </v-list>
</template>
<script setup lang='ts'>
  import { PokemonDetailsMove } from '~/utils/types'

  defineProps<{
    moves: PokemonDetailsMove[]
  }>()
</script>