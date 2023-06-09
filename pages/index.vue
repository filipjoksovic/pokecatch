<template>
  <!-- TEMPLATE CODE GOES HERE -->
  <pokemon-details></pokemon-details>

  <v-container class='mt-4'>
    <v-row justify='end'>
      <v-btn class='mr-2' color='green' @click='keepPokemon' prepend-icon='mdi-plus-box'>Keep</v-btn>
      <v-btn color='blue' @click='search' prepend-icon='mdi-magnify'>Search</v-btn>
    </v-row>
  </v-container>
</template>
<script setup lang='ts'>
  // SCRIPT CODE GOES HERE
  import { reactive, ref } from 'vue'
  import { useContextStore } from '~/store'
  import { getRandomNumber } from '~/helpers/getRandomNumber'

  const store = useContextStore()

  store.loadRandomPokemon()

  const search = ()=>{
    store.loadRandomPokemon();
  }

  const keepPokemon = ()=>{
    store.keepPokemon();
    store.loadRandomPokemon();
  }
</script>
