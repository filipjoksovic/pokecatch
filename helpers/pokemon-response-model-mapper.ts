import { capitalizeFirstLetter } from '~/helpers/capitalizeFirstLetter'
import {
  PokemonAbility,
  PokemonDetailedAbilityResponse,
  PokemonDetailedMoveResponse,
  PokemonDetailedSpeciesResponse,
  PokemonDetailsModel,
  PokemonModel,
  PokemonModelStats,
  PokemonMove,
  PokemonResponse,
  PokemonResponseAbility,
  PokemonResponseMove,
  PokemonResponseStat,
  PokemonSpecies
} from '~/utils/types'

const SELECTED_LANG = 'en'

export function pokemonResponseToPokemonModelMapper(pokemon: PokemonResponse): PokemonModel {
  const pokemonStats: PokemonResponseStat[] = pokemon.stats

  const includedStats = ['hp', 'attack', 'defense', 'speed']
  const mappedStats = pokemonStats.filter(
    stat => includedStats.includes(stat.stat.name)
  ).reduce(
    (acc: Partial<PokemonModelStats>, item) => {
      acc[item.stat.name as keyof PokemonModelStats] = item.base_stat
      return acc
    }, {})

  return {
    id: pokemon.id,
    name: capitalizeFirstLetter(pokemon.name),
    mainAbility: pokemon.abilities[0].ability.name,
    stats: { ...{ hp: 0, attack: 0, defense: 0, speed: 0 }, ...mappedStats }, //ensure that there will always be data, even though it's unlikely to be missing
    img: pokemon.sprites.front_default
  }
}

export async function pokemonResponseToPokemonDetailsMapper(pokemonResponse: PokemonResponse): Promise<Partial<PokemonDetailsModel>> {
  //to avoid making unecessary requests and increasing loading times,
  // keep abilities, species and moves data separate when just loading the model, creating all kinds of other problems :)
  return {
    id: pokemonResponse.id,
    name: capitalizeFirstLetter(pokemonResponse.name),
    sprites: {
      front_default: pokemonResponse.sprites.front_default,
      back_default: pokemonResponse.sprites.back_default,
      front_shiny: pokemonResponse.sprites.front_shiny,
      back_shiny: pokemonResponse.sprites.back_shiny
    },
    stats: pokemonResponse.stats.map(stat => ({
      name: capitalizeFirstLetter(stat.stat.name.split('-').join(' ')),
      value: stat.base_stat
    }))
  }
}

export async function responseAbilitiesToModelAbilities(responseAbilities: PokemonResponseAbility[]): Promise<PokemonAbility[]> {
  return Promise.all(
    responseAbilities.map(
      async responseAbility => {
        const { data: detailedAbility } =
          await useFetch<PokemonDetailedAbilityResponse>(responseAbility.ability.url, {
            pick: ['flavor_text_entries', 'effect_entries']
          })

        const longDescription = detailedAbility.value && detailedAbility.value.effect_entries.find(effect => effect.language.name === SELECTED_LANG)
        const shortDescription = detailedAbility.value && detailedAbility.value.flavor_text_entries.find(entry => entry.language.name === SELECTED_LANG)
        return {
          name: capitalizeFirstLetter(responseAbility.ability.name),
          url: responseAbility.ability.url,
          longDescription: longDescription && longDescription.effect || 'No long description',
          shortDescription: shortDescription && shortDescription.flavor_text || 'No short description'
        } as PokemonAbility
      }
    )
  )

}

export async function responseMovesToModelMoves(responseMoves: PokemonResponseMove[], numberOfMappings: number) {
  const mappedMoves: PokemonMove[] = []

  for (let i = 0; i < responseMoves.length && i < numberOfMappings; i++) {
    const { data: move } = await useFetch<PokemonDetailedMoveResponse>(
      responseMoves[i].move.url,
      {
        pick: ['effect_entries']
      }
    )
    const foundEntry = move.value && move.value.effect_entries.find(entry => entry.language.name === SELECTED_LANG)
    mappedMoves.push({
      name: capitalizeFirstLetter(responseMoves[i].move.name.split('-').join(' ')),
      description: foundEntry && foundEntry.effect || 'No description'
    })
  }
  return mappedMoves

}

export async function speciesResponseToDetailedSpeciesMapper(speciesUrl: string): Promise<PokemonSpecies> {
  const { data: rawSpecies } = await useFetch<PokemonDetailedSpeciesResponse>(speciesUrl, {
    pick: ['id', 'name', 'order', 'capture_rate']
  })
  return {
    id: rawSpecies.value && rawSpecies.value.id || -1,
    name: capitalizeFirstLetter(rawSpecies.value && rawSpecies.value.name || 'No name'),
    order: rawSpecies.value && rawSpecies.value.order || -1,
    captureRate: rawSpecies.value && rawSpecies.value.capture_rate || 0
  }
}
