<script setup lang='ts'>
  import { useContextStore } from '~/store'
  import { useToasterStore } from '~/store/toaster.store'

  defineProps<{
    pokemon: PokemonModel
  }>()


  const store = useContextStore()
  const toasterStore = useToasterStore()
  const removePokemon = (pokemon: PokemonModel) => {
    if (!pokemon) {
      console.error('no pokemon selected')
    }
    store.removePokemon(pokemon)
    toasterStore.success('Pokemon successfully removed', 2000)
  }
</script>

<template>
  <v-card>
    <v-img v-bind:src='pokemon.img' width='191' height='191'></v-img>
    <v-divider v-bind:horizontal=true></v-divider>

    <v-container class='d-flex align-center justify-space-between'>
      <p class='pa-2'>{{ pokemon.name }}</p>
      <v-btn icon='mdi-delete' size='x-small' color='red' @click='(event)=>removePokemon(pokemon)'></v-btn>
    </v-container>
  </v-card>
</template>

<style scoped>

</style>