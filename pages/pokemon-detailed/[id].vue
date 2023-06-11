<script setup lang='ts'>
  import { useContextStore } from '~/store'
  import { storeToRefs } from 'pinia'

  const route = useRoute()
  const store = useContextStore()
  store.getPokemonDetails(route.params.id.toString())
  const { pokemonDetails } = storeToRefs(store)

  const tab = ref(null)
  const toggle_one = ref(0)

  const loadPokemonMoves = () => {
    store.loadPokemonMoves()
  }
  const loadPokemonAbilities = () => {
    store.loadPokemonAbilities()
  }
  const loadPokemonSpecies = () => {
    store.loadPokemonSpecies()
  }
</script>

<template>
  <h1>{{ pokemonDetails && pokemonDetails.name }}</h1>
  <v-container :fluid='true'>
    <v-row>
      <v-col cols='4' class='d-flex flex-column align-center justify-center'>

        <v-carousel hide-delimiters show-arrows='hover'>
          <v-carousel-item
            :src='pokemonDetails.sprites.front_default'

          ></v-carousel-item>

          <v-carousel-item
            :src='pokemonDetails.sprites.back_default'

          ></v-carousel-item>

          <v-carousel-item
            :src='pokemonDetails.sprites.front_shiny'

          ></v-carousel-item>

          <v-carousel-item
            :src='pokemonDetails.sprites.back_shiny'

          ></v-carousel-item>

        </v-carousel>

      </v-col>
      <v-col cols='8'>
        <v-card>
          <v-tabs
            v-model='tab'
            bg-color='transparent'
          >
            <v-tab value='stats'>Stats</v-tab>
            <v-tab value='abilities'>Abilities</v-tab>
            <v-tab value='moves'>Moves</v-tab>
            <v-tab value='species'>Species</v-tab>

          </v-tabs>

          <v-card-text>
            <v-window v-model='tab'>
              <v-window-item value='stats'>
                <v-list lines='one'>
                  <v-list-item v-for='stat in pokemonDetails.stats' :key='stat.name'
                               :title='stat.name'
                               :subtitle='stat.value'>
                  </v-list-item>
                </v-list>
              </v-window-item>

              <v-window-item value='abilities' @group:selected='loadPokemonAbilities'>
                <v-list lines='two'>
                  <v-list-item v-for='ability in pokemonDetails.abilities' :key='ability.name'
                               :title='ability.name + " (" + ability.shortDescription+  ")" '
                               :subtitle='ability.longDescription'>

                  </v-list-item>
                </v-list>

              </v-window-item>

              <v-window-item value='moves' @group:selected='loadPokemonMoves'>
                <v-list lines='two'>
                  <v-list-item v-for='move in pokemonDetails.moves' :key='move.name'
                               :title='move.name'
                               :subtitle='move.description'>
                  </v-list-item>
                </v-list>
              </v-window-item>


              <v-window-item value='species' @group:selected='loadPokemonSpecies'>
                <p>Species name: {{ pokemonDetails.species && pokemonDetails.species.name }}</p>
                <p>Capture rate: {{ pokemonDetails.species && pokemonDetails.species.captureRate }}</p>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>