<template>
  <!-- TEMPLATE CODE GOES HERE -->
  <v-container>
    <v-row style='gap:1rem'>
      <v-card v-for='pokemon in keptPokemons'>
        <v-img v-bind:src='pokemon.img' width='191' height='191'></v-img>
        <v-divider v-bind:horizontal=true></v-divider>

        <v-container class='d-flex align-center justify-space-between'>
          <p class='pa-2'>{{ pokemon.name }}</p>
          <v-btn icon='mdi-delete' size='x-small' color='red' @click='(event)=>removePokemon(pokemon)'></v-btn>
        </v-container>
      </v-card>
    </v-row>

  </v-container>

</template>
<script setup lang='ts'>
  // SCRIPT CODE GOES HERE
  import { storeToRefs } from 'pinia'
  import { useContextStore } from '~/store'

  const store = useContextStore()
  const { keptPokemons } = storeToRefs(useContextStore())

  const removePokemon = (pokemon: PokemonModel) => {
    console.log(pokemon)
    if (!pokemon) {
      console.error('no pokemon selected')
    }
    store.removePokemon(pokemon)
  }
</script>
