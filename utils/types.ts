export type PokemonResponse = {
  id: string;
  name: string
  stats: PokemonResponseStat[]
  abilities: PokemonResponseAbility[];
  forms: PokemonResponseForm[];
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
  moves: PokemonResponseMove[];
  species: PokemonResponseSpecies;
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

export interface PokemonResponseSpecies {
  id: number;
  name: string;
  order: number;
  capture_rate: number;
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
  name:string;
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  sprites: any; //todo remove any
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
