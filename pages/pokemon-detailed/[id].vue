<script setup lang='ts'>
  import { useContextStore } from '~/store'
  import { storeToRefs } from 'pinia'
  import PokemonDetailsMoves from '~/pages/pokemon-detailed/PokemonDetailsMoves.vue'
  import PokemonDetailsSpecies from '~/pages/pokemon-detailed/PokemonDetailsSpecies.vue'

  const route = useRoute()
  const store = useContextStore()
  store.getPokemonDetails(route.params.id.toString())
  const { pokemonDetails } = storeToRefs(store)

  const tab = ref(null)

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
      <v-col cols='4' sm='12' class='d-flex flex-column align-center justify-center'>
        <pokemon-sprites-display :sprites='pokemonDetails.sprites'></pokemon-sprites-display>
      </v-col>
      <v-col cols='8' sm='12'>
        <v-card>
          <v-tabs
            v-model='tab'
            bg-color='blue'
          >
            <v-tab value='stats'>Stats</v-tab>
            <v-tab value='abilities'>Abilities</v-tab>
            <v-tab value='moves'>Moves</v-tab>
            <v-tab value='species'>Species</v-tab>

          </v-tabs>

          <v-card-text>
            <v-window v-model='tab'>
              <v-window-item value='stats'>
                <pokemon-details-stats v-if='pokemonDetails.stats'
                                       :stats='pokemonDetails.stats'></pokemon-details-stats>
              </v-window-item>

              <v-window-item value='abilities' @group:selected='loadPokemonAbilities'>
                <pokemon-details-abilities v-if='pokemonDetails.abilities'
                                           :abilities='pokemonDetails.abilities'></pokemon-details-abilities>

              </v-window-item>

              <v-window-item value='moves' @group:selected='loadPokemonMoves'>
                <pokemon-details-moves v-if='pokemonDetails.moves' :moves='pokemonDetails.moves' />
              </v-window-item>


              <v-window-item value='species' @group:selected='loadPokemonSpecies'>
                <pokemon-details-species v-if='pokemonDetails.species' :species='pokemonDetails.species' />
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>