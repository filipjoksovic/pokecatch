<script setup lang='ts'>
  import { useContextStore } from '~/store'
  import { PokemonModel } from '~/utils/types'

  defineProps<{
    pokemon: PokemonModel
  }>()

  const store = useContextStore()
</script>

<template>
  <v-card>
    <v-img v-bind:src='pokemon.img' width='191' height='191'></v-img>
    <v-divider v-bind:horizontal=true></v-divider>
    <v-container class='d-flex align-center flex-column justify-space-between'>
      <p class='pa-2'>{{ pokemon.name }}</p>
      <v-container class='w-100 d-flex justify-space-between'>
        <NuxtLink v-bind:to='"/pokemon-detailed/"+pokemon.id'>
          <v-btn icon='mdi-eye' size='x-small' color='blue'></v-btn>
        </NuxtLink>
        <v-btn icon='mdi-delete' size='x-small' color='red' @click='(event)=>store.removePokemon(pokemon)'></v-btn>
      </v-container>
    </v-container>
  </v-card>
</template>

<style scoped>

</style>