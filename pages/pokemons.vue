<template>
  <v-container>
    <v-row style='gap:1rem'>
      <template v-for='pokemon in keptPokemons'>
        <saved-pokemon :pokemon='pokemon'></saved-pokemon>
      </template>
    </v-row>

  </v-container>

</template>
<script setup lang='ts'>
  import { storeToRefs } from 'pinia'
  import { useContextStore } from '~/store'

  const { keptPokemons } = storeToRefs(useContextStore())
</script>
