// Raw response data
export type PokemonResponse = {
  id: number;
  name: string
  stats: PokemonResponseStat[]
  abilities: PokemonResponseAbility[];
  forms: PokemonResponseForm[];
  sprites: PokemonSprites;
  moves: PokemonResponseMove[];
  species: PokemonResponseSpecies;
  location_area_encounters: string;
}
export type PokemonResponseStat = {
  base_stat: number
  stat: {
    name: string
  }
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

export interface PokemonSprites {
  front_default: string;
  back_default: string;
  front_shiny: string;
  back_shiny: string;
}

export interface PokemonResponseMove {
  move: {
    name: string;
    url: string;
  }
}

export interface PokemonResponseSpecies {
  name: string;
  url: string;
}

//End of raw response data

//Pokemon model types

export type PokemonModel = {
  id: number;
  name: string
  stats: PokemonModelStats
  mainAbility: string
  img: string;
  speciesUrl: string;
}

export type PokemonModelStats = {
  hp: number
  attack: number
  defense: number
  speed: number
}

//End of pokemons model types

//Detailed model
export interface PokemonDetailsModel {
  id: number;
  name: string;
  abilities: PokemonDetailsAbility[];
  moves: PokemonDetailsMove[];
  sprites: PokemonSprites;
  stats: PokemonDetailsStats[];
  species: PokemonDetailsSpecies;
}

export interface PokemonDetailsAbility {
  name: string;
  url: string;
  shortDescription: string;
  longDescription: string;
}

export interface PokemonDetailsMove {
  name: string,
  description: string
}

export interface PokemonDetailsStats {
  name: string;
  value: number;
}

export interface PokemonDetailsSpecies {
  id: number;
  name: string;
  order: number;
  captureRate: number;
}

//End of detailed model


//Misc types
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

export interface PokemonDetailedSpeciesResponse {
  id: number;
  name: string;
  order: number;
  capture_rate: number;
  url: string;
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




