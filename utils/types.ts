export type PokemonResponse = {
  id: string;
  name: string
  stats: PokemonResponseStat[]
  abilities: PokemonResponseAbility[];
  forms: PokemonResponseForm[];
  sprites: PokemonSprites;
  moves: PokemonResponseMove[];
  species: PokemonDetailedSpeciesResponse;
  location_area_encounters: string;
}

export interface PokemonResponseAbility {
  ability: {
    name: string;
    url: string;
  }
}

export interface PokemonResponseForm {
  name: string;
  url: string;
}

export interface PokemonResponseMove {
  move: {
    name: string;
    url: string;
  }
}

export interface PokemonDetailedSpeciesResponse {
  id: number;
  name: string;
  order: number;
  capture_rate: number;
  url: string;
}

export type PokemonResponseStat = {
  base_stat: number
  stat: {
    name: string
  }
}


export type PokemonModel = {
  id: string;
  name: string
  stats: PokemonModelStats
  mainAbility: string
  img: string
}

export type PokemonModelStats = {
  hp: number
  attack: number
  defense: number
  speed: number
}

export interface PokemonDetailsModel {
  id: string;
  name: string;
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  sprites: PokemonSprites;
  stats: PokemonDetailsStats[];
  species: PokemonSpecies;
}

export interface PokemonDetailsStats {
  name: string;
  value: number;
}

export interface PokemonAbility {
  name: string;
  url: string;
  shortDescription: string;
  longDescription: string;
}

export interface PokemonMove {
  name: string,
  description: string
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  captureRate: number;
}

export interface PokemonSprites {
  front_default: string;
  back_default: string;
  front_shiny: string;
  back_shiny: string;
}

//There probably is a relation between effect_entries in these two interfaces, but i don't wanna couple them together yet, so they can stay individual now
export interface PokemonDetailedAbilityResponse {
  flavor_text_entries:
    {
      flavor_text: string;
      language: Language;
      version_group: object
    }[],
  effect_entries:
    {
      effect: string;
      language: Language
    }[]
}


export interface PokemonDetailedMoveResponse {
  effect_entries: {
    effect: string;
    language: Language
  }[]
}

export interface Language {
  name: string;
  url: string;
}