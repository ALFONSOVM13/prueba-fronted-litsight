export interface PokemonTypeInfo {
  id: string;
  name: string;
  color: string;
  backgroundColor: string;
}

export const POKEMON_TYPES: PokemonTypeInfo[] = [
  {
    id: 'normal',
    name: 'Normal',
    color: '#FFFFFF',
    backgroundColor: '#A8A878'
  },
  {
    id: 'fighting',
    name: 'Lucha',
    color: '#FFFFFF',
    backgroundColor: '#C03028'
  },
  {
    id: 'flying',
    name: 'Volador',
    color: '#FFFFFF',
    backgroundColor: '#A890F0'
  },
  {
    id: 'poison',
    name: 'Veneno',
    color: '#FFFFFF',
    backgroundColor: '#A040A0'
  },
  {
    id: 'ground',
    name: 'Tierra',
    color: '#FFFFFF',
    backgroundColor: '#E0C068'
  },
  {
    id: 'rock',
    name: 'Roca',
    color: '#FFFFFF',
    backgroundColor: '#B8A038'
  },
  {
    id: 'bug',
    name: 'Bicho',
    color: '#FFFFFF',
    backgroundColor: '#A8B820'
  },
  {
    id: 'ghost',
    name: 'Fantasma',
    color: '#FFFFFF',
    backgroundColor: '#705898'
  },
  {
    id: 'steel',
    name: 'Acero',
    color: '#FFFFFF',
    backgroundColor: '#B8B8D0'
  },
  {
    id: 'fire',
    name: 'Fuego',
    color: '#FFFFFF',
    backgroundColor: '#F08030'
  },
  {
    id: 'water',
    name: 'Agua',
    color: '#FFFFFF',
    backgroundColor: '#6890F0'
  },
  {
    id: 'grass',
    name: 'Planta',
    color: '#FFFFFF',
    backgroundColor: '#78C850'
  },
  {
    id: 'electric',
    name: 'Eléctrico',
    color: '#000000',
    backgroundColor: '#F8D030'
  },
  {
    id: 'psychic',
    name: 'Psíquico',
    color: '#FFFFFF',
    backgroundColor: '#F85888'
  },
  {
    id: 'ice',
    name: 'Hielo',
    color: '#000000',
    backgroundColor: '#98D8D8'
  },
  {
    id: 'dragon',
    name: 'Dragón',
    color: '#FFFFFF',
    backgroundColor: '#7038F8'
  },
  {
    id: 'fairy',
    name: 'Hada',
    color: '#FFFFFF',
    backgroundColor: '#EE99AC'
  }
]; 