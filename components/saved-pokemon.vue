<script setup lang='ts'>
  import { useContextStore } from '~/store'
  import { useToasterStore } from '~/store/toaster.store'

  defineProps<{
    pokemon: PokemonModel
  }>()

  const dialog = ref(false)


  const store = useContextStore()
  const toasterStore = useToasterStore()
  const removePokemon = (pokemon: PokemonModel) => {
    if (!pokemon) {
      console.error('no pokemon selected')
      return
    }
    store.removePokemon(pokemon)
    toasterStore.success('Pokemon successfully removed', 2000)
  }

  const viewPokemonDetails = (pokemon:PokemonModel)=>{
    dialog.value = true;
    store.getPokemon(pokemon.id);
  }
</script>

<template>
  <v-card>
    <v-img v-bind:src='pokemon.img' width='191' height='191'></v-img>
    <v-divider v-bind:horizontal=true></v-divider>
    <v-container class='d-flex align-center flex-column justify-space-between'>
      <p class='pa-2'>{{ pokemon.name }}</p>
      <v-container class='w-100 d-flex justify-space-between'>
      <NuxtLink v-bind:to='"/pokemon-detailed/"+pokemon.id'>
        <v-btn icon='mdi-eye' size='x-small' color='blue'></v-btn>

      </NuxtLink>
      <v-btn icon='mdi-delete' size='x-small' color='red' @click='(event)=>removePokemon(pokemon)'></v-btn>
      </v-container>
    </v-container>
  </v-card>



    <v-dialog
      v-model='dialog'
      width='auto'
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>Pokemon name</v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </v-card-text>
        <v-card-actions>
          <v-btn color='primary' block @click='dialog = false'>Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<style scoped>

</style>