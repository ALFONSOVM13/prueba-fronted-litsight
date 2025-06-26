export const TYPE_EFFECTIVENESS = {
  normal: {
    weaknesses: ['fighting'],
    immunities: ['ghost'],
    resistances: []
  },
  fighting: {
    weaknesses: ['flying', 'psychic', 'fairy'],
    immunities: [],
    resistances: ['rock', 'bug', 'dark']
  },
  flying: {
    weaknesses: ['rock', 'electric', 'ice'],
    immunities: ['ground'],
    resistances: ['fighting', 'bug', 'grass']
  },
  poison: {
    weaknesses: ['ground', 'psychic'],
    immunities: [],
    resistances: ['fighting', 'poison', 'bug', 'grass', 'fairy']
  },
  ground: {
    weaknesses: ['water', 'grass', 'ice'],
    immunities: ['electric'],
    resistances: ['poison', 'rock']
  },
  rock: {
    weaknesses: ['fighting', 'ground', 'steel', 'water', 'grass'],
    immunities: [],
    resistances: ['normal', 'flying', 'poison', 'fire']
  },
  bug: {
    weaknesses: ['flying', 'rock', 'fire'],
    immunities: [],
    resistances: ['fighting', 'ground', 'grass']
  },
  ghost: {
    weaknesses: ['ghost', 'dark'],
    immunities: ['normal', 'fighting'],
    resistances: ['poison', 'bug']
  },
  steel: {
    weaknesses: ['fighting', 'ground', 'fire'],
    immunities: ['poison'],
    resistances: ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy']
  },
  fire: {
    weaknesses: ['ground', 'rock', 'water'],
    immunities: [],
    resistances: ['bug', 'steel', 'fire', 'grass', 'ice', 'fairy']
  },
  water: {
    weaknesses: ['grass', 'electric'],
    immunities: [],
    resistances: ['steel', 'fire', 'water', 'ice']
  },
  grass: {
    weaknesses: ['flying', 'poison', 'bug', 'fire', 'ice'],
    immunities: [],
    resistances: ['ground', 'water', 'grass', 'electric']
  },
  electric: {
    weaknesses: ['ground'],
    immunities: [],
    resistances: ['flying', 'steel', 'electric']
  },
  psychic: {
    weaknesses: ['bug', 'ghost', 'dark'],
    immunities: [],
    resistances: ['fighting', 'psychic']
  },
  ice: {
    weaknesses: ['fighting', 'rock', 'steel', 'fire'],
    immunities: [],
    resistances: ['ice']
  },
  dragon: {
    weaknesses: ['ice', 'dragon', 'fairy'],
    immunities: [],
    resistances: ['fire', 'water', 'grass', 'electric']
  },
  dark: {
    weaknesses: ['fighting', 'bug', 'fairy'],
    immunities: ['psychic'],
    resistances: ['ghost', 'dark']
  },
  fairy: {
    weaknesses: ['poison', 'steel'],
    immunities: ['dragon'],
    resistances: ['fighting', 'bug', 'dark']
  }
} as const;

export type PokemonType = keyof typeof TYPE_EFFECTIVENESS;

export function calculateWeaknesses(types: PokemonType[]): PokemonType[] {
  const weaknesses = new Set<PokemonType>();
  const immunities = new Set<PokemonType>();
  const resistances = new Set<PokemonType>();

  // Collect all immunities, resistances and weaknesses
  types.forEach(type => {
    const effectiveness = TYPE_EFFECTIVENESS[type];
    effectiveness.immunities.forEach(t => immunities.add(t as PokemonType));
    effectiveness.resistances.forEach(t => resistances.add(t as PokemonType));
    effectiveness.weaknesses.forEach(t => weaknesses.add(t as PokemonType));
  });

  // Remove immunities and resistances from weaknesses
  const finalWeaknesses = Array.from(weaknesses).filter(type => 
    !immunities.has(type) && !resistances.has(type)
  );

  return finalWeaknesses;
} 