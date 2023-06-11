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
import { PokemonDetailsModel, PokemonModel, PokemonResponse } from '~/utils/types'
import { getDefaultPokemonDetailsState } from '~/helpers/default-pokemon-details-state'
import { getRandomPokemonDefaultState } from '~/helpers/default-random-pokemon.state'
import { getDefaultPokemonResponseState } from '~/helpers/default-pokemon-response.state'

export interface IGlobalState {
  randomPokemon: PokemonModel;
  storedPokemons: PokemonModel[];
  pokemonDetails: Partial<PokemonDetailsModel>;
  rawPokemonDetails: PokemonResponse
}

export const useContextStore = defineStore('context', {
  state: (): IGlobalState => ({
    randomPokemon: getRandomPokemonDefaultState(),
    storedPokemons: [],
    pokemonDetails: getDefaultPokemonDetailsState(),
    rawPokemonDetails: getDefaultPokemonResponseState() //store the raw response model (i see no other way of storing it for later use)
  }),
  actions: {
    async loadRandomPokemon() {
      const response = await this.getPokemon(getRandomNumber(1, 1000).toString())
      this.randomPokemon = response ? pokemonResponseToPokemonModelMapper(response) : getDefaultPokemonState()
    },
    async getPokemonDetails(id: string | number) {
      const response = await this.getPokemon(id)
      this.rawPokemonDetails = response
      this.pokemonDetails = response ? await pokemonResponseToPokemonDetailsMapper(response) : getDefaultPokemonDetailsState()
    },
    async getPokemon(id: string | number): Promise<PokemonResponse> {
      const { data: pokemon } = await useFetch<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`, {
        pick: ['id', 'name', 'stats', 'abilities', 'sprites', 'moves', 'species', 'location_area_encounters']
      })
      return pokemon.value as PokemonResponse
    },

    keepPokemon() {
      this.storedPokemons.push(this.randomPokemon)
    },

    removePokemon(pokemon: PokemonModel) {
      if (!pokemon || !pokemon.id) {
        console.error('No pokemon provided')
        return
      }
      this.storedPokemons = this.storedPokemons.filter(p => p.id !== pokemon.id)
    },

    loadPokemonMoves() {
      responseMovesToModelMoves(this.rawPokemonDetails.moves || [], 5).then(moves => {
        this.pokemonDetails = {
          ...this.pokemonDetails,
          moves: moves
        }
      })

    },

    loadPokemonAbilities() {
      responseAbilitiesToModelAbilities(this.rawPokemonDetails.abilities || []).then((abilities => {
        this.pokemonDetails = {
          ...this.pokemonDetails,
          abilities: abilities
        }
      }))
    },

    loadPokemonSpecies() {
      speciesResponseToDetailedSpeciesMapper(this.rawPokemonDetails.species.url).then((species) => {
        this.pokemonDetails = {
          ...this.pokemonDetails,
          species: species
        }
      })
    }

  }
})
