import { defineStore } from 'pinia'
import { getRandomNumber } from '~/helpers/getRandomNumber'

export interface IGlobalState {
  randomPokemon: PokemonModel;
  keptPokemons: PokemonModel[];
}

export const useContextStore = defineStore('context', {
  // PINIA CODE GOES HERE

  state: (): IGlobalState => ({
    randomPokemon: {
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
    },
    keptPokemons: []
  }),
  getters: {
    getRandomPokemon: (state) => state.randomPokemon
  },
  actions: {
    async loadRandomPokemon() {

      const { data: pokemon } = await useFetch<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${getRandomNumber(1, 1000)}`, {
        pick: ['id', 'name', 'stats', 'abilities', 'sprites']
      })

      if (pokemon.value) {
        console.log('Should set value')
        const pokemonStats: PokemonResponseStat[] = pokemon.value.stats

        type statKeys = keyof PokemonModelStats;
        //TODO figure out how to map stats properly

        const includedStats = ['hp', 'attack', 'defense', 'speed']
        const mappedStats = pokemonStats.filter(stat => includedStats.includes(stat.stat.name)).reduce((acc: Partial<PokemonModelStats>, item) => {
          acc[item.stat.name] = item.base_stat
          return acc
        }, {})

        const mappedPokemon: PokemonModel = {
          id: pokemon.value.id,
          name: pokemon.value.name,
          mainAbility: pokemon.value.abilities[0].ability.name,
          stats: mappedStats,
          img: pokemon.value.sprites.front_default
        }
        this.randomPokemon = mappedPokemon
        console.log(this.randomPokemon)
      } else {
        this.randomPokemon = {
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
    },

    keepPokemon() {
      this.keptPokemons.push(this.randomPokemon)
    },

    removePokemon(pokemon: PokemonModel) {
      if (!pokemon || !pokemon.id) {
        console.error('No pokemon provided')
      }
      console.log(pokemon.id)
      this.keptPokemons = this.keptPokemons.filter(p => p.id !== pokemon.id)
    }

  }
})
