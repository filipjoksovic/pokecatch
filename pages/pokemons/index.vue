<template>
  <v-container>
    <v-row style='gap:1rem'>
      <template v-for='pokemon in storedPokemons'>
        <saved-pokemon :pokemon='pokemon'></saved-pokemon>
      </template>
    </v-row>

  </v-container>

</template>
<script setup lang='ts'>
  import { storeToRefs } from 'pinia'
  import { useContextStore } from '~/store'

  const { storedPokemons } = storeToRefs(useContextStore())
</script>
