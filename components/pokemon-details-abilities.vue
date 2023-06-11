<script setup lang='ts'>

  import { PokemonAbility } from '~/utils/types'

  defineProps<{
    abilities: PokemonAbility[];
  }>()
</script>

<template>
  <v-list lines='two'>
    <v-list-item v-for='ability in abilities' :key='ability.name'
                 :title='ability.name + " (" + ability.shortDescription+  ")" '
                 :subtitle='ability.longDescription'>

    </v-list-item>
  </v-list>
</template>

<style scoped>

</style>