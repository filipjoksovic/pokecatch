type PokemonResponse = {
  id:string;
  name: string
  stats: PokemonResponseStat[]
  abilities: {
    ability: {
      name: string
    }
  }[]
  sprites: {
    front_default: string
  }
}
type PokemonResponseStat = {
  base_stat: number
  stat: {
    name: string
  }
}

type PokemonModel = {
  id: string;
  name: string
  stats: PokemonModelStats
  mainAbility: string
  img: string
}

type PokemonModelStats = {
  hp: number
  attack: number
  defense: number
  speed: number
}
