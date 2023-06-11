import { defineStore } from 'pinia'
import { getRandomNumber } from '~/helpers/getRandomNumber'
import {
  pokemonResponseToPokemonDetailsMapper,
  pokemonResponseToPokemonModelMapper,
  responseAbilitiesToModelAbilities,
  responseMovesToModelMoves,
  speciesResponseToDetailedSpeciesMapper
} from '~/helpers/pokemon-response-model-mapper'
import { getDefaultPokemonState } from '~/helpers/default-pokemon-state'
import { PokemonModel, PokemonResponse } from '~/utils/types'
import { getDefaultPokemonDetailsState } from '~/helpers/default-pokemon-details-state'
import { getRandomPokemonDefaultState } from '~/helpers/default-random-pokemon.state'
import { getDefaultPokemonResponseState } from '~/helpers/default-pokemon-response.state'
import { useToasterStore } from '~/store/toaster.store'

export const useContextStore = defineStore('context', () => {
  const toasterStore = useToasterStore()
  const randomPokemon = ref(getRandomPokemonDefaultState())
  const storedPokemons = ref([] as PokemonModel[])
  const pokemonDetails = ref(getDefaultPokemonDetailsState())
  const rawPokemonDetails = ref(getDefaultPokemonResponseState()) //store the raw response model (i see no other way of storing it for later use)

  async function loadRandomPokemon() {
    const response = await getPokemon(getRandomNumber(1, 1000).toString())
    randomPokemon.value = response ? pokemonResponseToPokemonModelMapper(response) : getDefaultPokemonState()
  }

  async function getPokemonDetails(id: string | number) {
    const response = await getPokemon(id)
    rawPokemonDetails.value = response
    pokemonDetails.value = response ? await pokemonResponseToPokemonDetailsMapper(response) : getDefaultPokemonDetailsState()
  }

  async function getPokemon(id: string | number): Promise<PokemonResponse> {
    const { data: pokemon } = await useFetch<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      pick: ['id', 'name', 'stats', 'abilities', 'sprites', 'moves', 'species', 'location_area_encounters']
    })
    return pokemon.value as PokemonResponse
  }

  function keepPokemon() {
    speciesResponseToDetailedSpeciesMapper(randomPokemon.value.speciesUrl).then((species => {
      const number = getRandomNumber(1, 255)
      if (number < species.captureRate) {
        storedPokemons.value.push(randomPokemon.value)
        toasterStore.success('Pokemon captured', 2000)
        loadRandomPokemon()
      } else {
        toasterStore.error('Failed to capture pokemon. Try again?', 2000)
      }
    }))
  }

  function removePokemon(pokemon: PokemonModel) {
    if (!pokemon || !pokemon.id) {
      console.error('No pokemon provided')
      return
    }
    storedPokemons.value = storedPokemons.value.filter(p => p.id !== pokemon.id)
  }

  function loadPokemonMoves() {
    responseMovesToModelMoves(rawPokemonDetails.value.moves || [], 5).then(moves => {
      pokemonDetails.value = {
        ...pokemonDetails.value,
        moves: moves
      }
    })

  }

  function loadPokemonAbilities() {
    responseAbilitiesToModelAbilities(rawPokemonDetails.value.abilities || []).then((abilities => {
      pokemonDetails.value = {
        ...pokemonDetails.value,
        abilities: abilities
      }
    }))
  }

  function loadPokemonSpecies() {
    speciesResponseToDetailedSpeciesMapper(rawPokemonDetails.value.species.url).then((species) => {
      pokemonDetails.value = {
        ...pokemonDetails.value,
        species: species
      }
    })
  }

  return {
    randomPokemon,
    storedPokemons,
    pokemonDetails,
    rawPokemonDetails,
    loadPokemonSpecies,
    loadPokemonAbilities,
    loadPokemonMoves,
    removePokemon,
    keepPokemon,
    getPokemon,
    getPokemonDetails,
    loadRandomPokemon
  }
})
