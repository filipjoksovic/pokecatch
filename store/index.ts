import { defineStore } from 'pinia'
import { getRandomNumber } from '~/helpers/getRandomNumber'
import {
  pokemonResponseToPokemonDetailsMapper,
  pokemonResponseToPokemonModelMapper,
  responseAbilitiesToModelAbilities,
  responseMovesToModelMoves,
  responseSpeciesToModelSpecies
} from '~/helpers/pokemon-response-model-mapper'
import { getDefaultPokemonState } from '~/helpers/default-pokemon-state'
import { PokemonModel, PokemonResponse } from '~/utils/types'
import { getDefaultPokemonDetailsState } from '~/helpers/default-pokemon-details-state'
import { getRandomPokemonDefaultState } from '~/helpers/default-random-pokemon.state'
import { getDefaultPokemonResponseState } from '~/helpers/default-pokemon-response.state'
import { useToasterStore } from '~/store/toaster.store'

const BASE_URL = `https://pokeapi.co/api/v2`

export const useContextStore = defineStore('context', () => {
  const toasterStore = useToasterStore()
  const randomPokemon = ref(getRandomPokemonDefaultState())
  const storedPokemons = ref([] as PokemonModel[])
  const pokemonDetails = ref(getDefaultPokemonDetailsState())
  const rawPokemonDetails = ref(getDefaultPokemonResponseState()) //store the raw response model (i see no other way of storing it for later use)

  async function loadRandomPokemon() {
    randomPokemon.value = getRandomPokemonDefaultState()
    const response = await getPokemon(getRandomNumber(1, 1000))
    randomPokemon.value = response ? pokemonResponseToPokemonModelMapper(response) : getDefaultPokemonState()
  }

  async function getPokemonDetails(id: string | number) {
    const response = await getPokemon(id)
    rawPokemonDetails.value = response
    pokemonDetails.value = response ? await pokemonResponseToPokemonDetailsMapper(response) : getDefaultPokemonDetailsState()
  }

  async function getPokemon(id: string | number): Promise<PokemonResponse> {
    const { data: pokemon } = await useFetch<PokemonResponse>(`${BASE_URL}/pokemon/${id}`, {
      pick: ['id', 'name', 'stats', 'abilities', 'sprites', 'moves', 'species', 'location_area_encounters']
    })
    return pokemon.value as PokemonResponse
  }

  function keepPokemon() {
    responseSpeciesToModelSpecies(randomPokemon.value.speciesUrl).then((species => {
      const number = getRandomNumber(1, 255)
      if (number < species.captureRate) {
        storedPokemons.value.push(randomPokemon.value)
        toasterStore.success('Pokemon captured', 2000)
        loadRandomPokemon()
      } else {
        toasterStore.error('Failed to capture pokemons. Try again?', 2000)
      }
    }))
  }

  function removePokemon(pokemon: PokemonModel) {
    if (!pokemon || !pokemon.id) {
      console.error('No pokemons provided')
      return
    }
    storedPokemons.value = storedPokemons.value.filter(p => p.id !== pokemon.id)
    toasterStore.success('Pokemon successfully removed', 2000)
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
    responseSpeciesToModelSpecies(rawPokemonDetails.value.species.url).then((species) => {
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
    getPokemonDetails,
    loadRandomPokemon
  }
})
