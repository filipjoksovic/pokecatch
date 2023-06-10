<template>
  <pokemon-details></pokemon-details>
</template>
<script setup lang='ts'>
  import { useContextStore } from '~/store'

  const store = useContextStore()
  store.loadRandomPokemon()
</script>
