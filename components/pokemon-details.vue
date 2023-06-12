<template>
  <v-card class='elevation-6 mt-10'>
    <v-container>
      <v-row align='center'>
        <v-col xs='12' sm='12' md='4' lg='2' xl='2' class='d-flex align-center justify-center'>
          <v-img :src='randomPokemon.img' width='128px' height='128px'></v-img>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col xs='12' sm='12' md='8' lg='10' xl='10'>
          <v-card-text>
            <v-card-title v-text='randomPokemon.name || "Loading"'>
            </v-card-title>

            <v-card-text>
              <pokemon-detail-stat icon='mdi-heart' title='Health points'
                                   :statValue='randomPokemon.stats.hp || 0' color='green'></pokemon-detail-stat>
              <pokemon-detail-stat icon='mdi-sword' title='Attack'
                                   :statValue='randomPokemon.stats.attack || 0' color='red'></pokemon-detail-stat>
              <pokemon-detail-stat icon='mdi-shield' title='Defense'
                                   :statValue='randomPokemon.stats.defense || 0' color='blue'></pokemon-detail-stat>
              <pokemon-detail-stat icon='mdi-fast-forward' title='Speed'
                                   :statValue='randomPokemon.stats.speed || 0' color='purple'></pokemon-detail-stat>
            </v-card-text>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

  <v-container class='mt-4'>
    <v-row justify='end'>
      <v-btn class='mr-2' color='red' :disabled='!randomPokemon.name' @click='store.keepPokemon()'
             prepend-icon='mdi-pokeball'>Keep
      </v-btn>
      <v-btn color='blue' :disabled='!randomPokemon.name' @click='store.loadRandomPokemon()' prepend-icon='mdi-magnify'>
        Search
      </v-btn>
    </v-row>
  </v-container>
</template>
<script setup lang='ts'>
  import { useContextStore } from '~/store'
  import { storeToRefs } from 'pinia'

  const store = useContextStore()
  const { randomPokemon } = storeToRefs(useContextStore())

  store.loadRandomPokemon()

</script>

<style>


</style>
