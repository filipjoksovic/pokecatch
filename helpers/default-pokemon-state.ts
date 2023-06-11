export function getDefaultPokemonState(): PokemonModel {
  return {
    id: '',
    name: '',
    stats: {
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0
    },
    mainAbility: '',
    img: ''
  }
}