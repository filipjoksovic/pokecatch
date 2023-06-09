<template>
  <!-- TEMPLATE CODE GOES HERE -->
  <v-card class='elevation-6 mt-10'>
    <v-container>
      <v-row align='center'>
        <v-col cols='2' class='d-flex align-center justify-center'>
          <v-img :src='randomPokemon.img' width='128px' height='128px'></v-img>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols='10'>
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
</template>
<script setup lang='ts'>
  // SCRIPT CODE GOES HERE
  import { reactive, ref } from 'vue'
  import { useContextStore } from '~/store'
  import { storeToRefs } from 'pinia'


  const { randomPokemon } = storeToRefs(useContextStore())
</script>
