export const typeEffectiveness: Record<
  string,
  { weak: string[]; resistant: string[]; immune: string[] }
> = {
  normal: {
    weak: ["fighting"],
    resistant: [],
    immune: ["ghost"],
  },
  fighting: {
    weak: ["flying", "psychic", "fairy"],
    resistant: ["rock", "bug", "dark"],
    immune: [],
  },
  flying: {
    weak: ["electric", "ice", "rock"],
    resistant: ["fighting", "bug", "grass"],
    immune: ["ground"],
  },
  poison: {
    weak: ["ground", "psychic"],
    resistant: ["fighting", "poison", "bug", "grass", "fairy"],
    immune: [],
  },
  ground: {
    weak: ["water", "grass", "ice"],
    resistant: ["poison", "rock"],
    immune: ["electric"],
  },
  rock: {
    weak: ["water", "grass", "fighting", "ground", "steel"],
    resistant: ["normal", "flying", "poison", "fire"],
    immune: [],
  },
  bug: {
    weak: ["flying", "rock", "fire"],
    resistant: ["fighting", "ground", "grass"],
    immune: [],
  },
  ghost: {
    weak: ["ghost", "dark"],
    resistant: ["poison", "bug"],
    immune: ["normal", "fighting"],
  },
  steel: {
    weak: ["fighting", "ground", "fire"],
    resistant: [
      "normal",
      "flying",
      "rock",
      "bug",
      "steel",
      "grass",
      "psychic",
      "ice",
      "dragon",
      "fairy",
    ],
    immune: ["poison"],
  },
  fire: {
    weak: ["water", "ground", "rock"],
    resistant: ["bug", "steel", "fire", "grass", "ice", "fairy"],
    immune: [],
  },
  water: {
    weak: ["grass", "electric"],
    resistant: ["steel", "fire", "water", "ice"],
    immune: [],
  },
  grass: {
    weak: ["flying", "poison", "bug", "fire", "ice"],
    resistant: ["ground", "water", "grass", "electric"],
    immune: [],
  },
  electric: {
    weak: ["ground"],
    resistant: ["flying", "steel", "electric"],
    immune: [],
  },
  psychic: {
    weak: ["bug", "ghost", "dark"],
    resistant: ["fighting", "psychic"],
    immune: [],
  },
  ice: {
    weak: ["fighting", "rock", "steel", "fire"],
    resistant: ["ice"],
    immune: [],
  },
  dragon: {
    weak: ["ice", "dragon", "fairy"],
    resistant: ["fire", "water", "grass", "electric"],
    immune: [],
  },
  dark: {
    weak: ["fighting", "bug", "fairy"],
    resistant: ["ghost", "dark"],
    immune: ["psychic"],
  },
  fairy: {
    weak: ["poison", "steel"],
    resistant: ["fighting", "bug", "dark"],
    immune: ["dragon"],
  },
};

export type PokemonType = keyof typeof typeEffectiveness;

export function calculateWeaknesses(types: PokemonType[]): PokemonType[] {
  const weaknesses = new Set<PokemonType>();
  const immunities = new Set<PokemonType>();
  const resistances = new Set<PokemonType>();

  types.forEach(type => {
    const effectiveness = typeEffectiveness[type];
    effectiveness.immune.forEach(t => immunities.add(t as PokemonType));
    effectiveness.resistant.forEach(t => resistances.add(t as PokemonType));
    effectiveness.weak.forEach(t => weaknesses.add(t as PokemonType));
  });

  const finalWeaknesses = Array.from(weaknesses).filter(type => 
    !immunities.has(type) && !resistances.has(type)
  );

  return finalWeaknesses;
} 