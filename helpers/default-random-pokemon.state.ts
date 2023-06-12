import { PokemonModel } from '~/utils/types'

export function getRandomPokemonDefaultState(): PokemonModel {
  return {
    id: -1,
    name: '',
    stats: {
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0
    },
    mainAbility: '',
    img: '',
    speciesUrl: ''
  }
}