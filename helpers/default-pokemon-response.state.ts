import { PokemonResponse } from '~/utils/types'

export function getDefaultPokemonResponseState(): PokemonResponse {
  return {
    id: -1,
    name: '',
    stats: [],
    abilities: [],
    forms: [],
    sprites: {
      front_default: '',
      front_shiny: '',
      back_default: '',
      back_shiny: ''
    },
    moves: [],
    species: {
      name: '',
      url: ''
    },
    location_area_encounters: ''
  }
}