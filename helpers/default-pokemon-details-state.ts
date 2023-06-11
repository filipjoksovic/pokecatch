import { PokemonDetailsModel } from '~/utils/types'

export function getDefaultPokemonDetailsState(): Partial<PokemonDetailsModel> {

  return {
    id: '-1',
    name: '',
    abilities: [],
    sprites: {
      front_default: '',
      back_default: '',
      front_shiny: '',
      back_shiny: ''
    },
    stats: [],
    species: {
      id: 0,
      name: '',
      order: 1,
      captureRate: 0
    },
    moves: []
  }
}