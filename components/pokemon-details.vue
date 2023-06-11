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
            <v-card-title v-text='randomPokemon.name'>
            </v-card-title>

            <v-card-text>
              <p class='mt-2'>
                <v-icon icon='mdi-heart' color='green'></v-icon>
                Health points: {{ randomPokemon.stats.hp }}
              </p>
              <p class='mt-2'>
                <v-icon icon='mdi-sword' color='red'></v-icon>
                Attack: {{ randomPokemon.stats.attack }}
              </p>
              <p class='mt-2'>
                <v-icon icon='mdi-shield' color='blue'></v-icon>
                Defense: {{ randomPokemon.stats.defense }}
              </p>
              <p class='mt-2'>
                <v-icon icon='mdi-fast-forward' color='purple'></v-icon>
                Speed: {{ randomPokemon.stats.speed }}
              </p>

            </v-card-text>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

  <v-container class='mt-4'>
    <v-row justify='end'>
      <v-btn class='mr-2' color='red' @click='store.keepPokemon()' prepend-icon='mdi-pokeball'>Keep</v-btn>
      <v-btn color='blue' @click='store.loadRandomPokemon()' prepend-icon='mdi-magnify'>Search</v-btn>
    </v-row>
  </v-container>
</template>
<script setup lang='ts'>
  import { useContextStore } from '~/store'
  import { storeToRefs } from 'pinia'

  const store = useContextStore()
  const { randomPokemon } = storeToRefs(useContextStore())

</script>

<style>


</style>
