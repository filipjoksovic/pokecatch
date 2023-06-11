import { PokemonResponse } from '~/utils/types'

export function getDefaultPokemonResponseState(): PokemonResponse {
  return {
    id: '',
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
      id: -1,
      name: '',
      order: -1,
      capture_rate: 0,
      url: ''
    },
    location_area_encounters: ''
  }
}