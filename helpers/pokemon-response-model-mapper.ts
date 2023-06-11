import { capitalizeFirstLetter } from '~/helpers/capitalizeFirstLetter'
import {
  EncounterDetailsResponse,
  PokemonAbility, PokemonDetailsEncounter,
  PokemonDetailsModel,
  PokemonModel,
  PokemonModelStats, PokemonMove,
  PokemonResponse, PokemonResponseAbility, PokemonResponseEncounter, PokemonResponseMove, PokemonResponseSpecies,
  PokemonResponseStat, PokemonSpecies
} from '~/utils/types'
import { found } from '@jridgewell/trace-mapping/dist/types/binary-search'

export function pokemonResponseToPokemonModelMapper(pokemon: PokemonResponse): PokemonModel {
  const pokemonStats: PokemonResponseStat[] = pokemon.stats

  type statKeys = keyof PokemonModelStats;
  //TODO figure out how to map stats properly

  const includedStats = ['hp', 'attack', 'defense', 'speed']
  const mappedStats = pokemonStats.filter(stat => includedStats.includes(stat.stat.name)).reduce((acc: Partial<PokemonModelStats>, item) => {
    acc[item.stat.name] = item.base_stat
    return acc
  }, {})

  const mappedPokemon: PokemonModel = {
    id: pokemon.id,
    name: capitalizeFirstLetter(pokemon.name),
    mainAbility: pokemon.abilities[0].ability.name,
    stats: mappedStats,
    img: pokemon.sprites.front_default
  }

  return mappedPokemon
}

export async function pokemonResponseToPokemonDetailsMapper(pokemonResponse: PokemonResponse): Promise<Partial<PokemonDetailsModel>> {
  //to avoid making unecessary requests, keep abilities, species and moves data separate when just loading the model
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
  const mapped = await Promise.all(responseAbilities.map(async responseAbility => {
    const { data: detailedAbility } = await useFetch<{
      flavor_text_entries: { flavor_text: string, language: { name: string, url: string }, version_group: object }[],
      effect_entries: { effect: string, language: { name: string, url: string } }[]
    }>(responseAbility.ability.url, {
      pick: ['flavor_text_entries', 'effect_entries']
    })

    const longDescription = detailedAbility.value && detailedAbility.value.effect_entries.find(effect => effect.language.name === 'en')
    const shortDescription = detailedAbility.value && detailedAbility.value.flavor_text_entries.find(entry => entry.language.name === 'en')
    return {
      name: capitalizeFirstLetter(responseAbility.ability.name),
      url: responseAbility.ability.url,
      longDescription: longDescription && longDescription.effect || 'No long description',//todo fix error,
      shortDescription: shortDescription && shortDescription.flavor_text || 'No short description' //todo fix error
    } as PokemonAbility

  }))
  return mapped

}

export async function responseMovesToModelMoves(responseMoves: PokemonResponseMove[], numberOfMappings: number) {
  const mappedMoves: PokemonMove[] = []

  for (let i = 0; i < responseMoves.length && i < numberOfMappings; i++) {
    const { data: move } = await useFetch<{
      effect_entries: { effect: string, language: { name: string, url: string } }[]
    }>(responseMoves[i].move.url, {
      pick: ['effect_entries']
    })
    const foundEntry = move.value && move.value.effect_entries.find(entry => entry.language.name === 'en')
    mappedMoves.push({
      name: capitalizeFirstLetter(responseMoves[i].move.name.split('-').join(' ')),
      description: foundEntry && foundEntry.effect || 'No description'
    })
  }
  return mappedMoves

}

export async function speciesResponseToDetailedSpeciesMapper(speciesUrl: string): Promise<PokemonSpecies> {
  const { data: rawSpecies } = await useFetch<PokemonResponseSpecies>(speciesUrl, {
    pick: ['id', 'name', 'order', 'capture_rate']
  })
  if (rawSpecies.value) {
    return {
      id: rawSpecies.value.id,
      name: capitalizeFirstLetter(rawSpecies.value.name),
      order: rawSpecies.value.order,
      captureRate: rawSpecies.value.capture_rate
    }
  }
  return {
    id: -1,
    name: '',
    order: -1,
    captureRate: 0
  }

}
