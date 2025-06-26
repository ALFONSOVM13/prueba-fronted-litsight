import { POKEMON_TYPES } from "@/constants/pokemonTypes"

interface PokemonTypeProps {
  type: string
  tabIndex?: boolean
}

export const PokemonType = ({ type, tabIndex = true }: PokemonTypeProps) => {
  const typeData = POKEMON_TYPES.find((t) => t.id === type)
  const backgroundColor = typeData?.backgroundColor || "#68A090"

  return (
    <span
      className="px-3 py-1 rounded-full text-white text-sm font-semibold capitalize shadow-lg"
      style={{ backgroundColor }}
      tabIndex={tabIndex ? 0 : -1}
    >
      {type}
    </span>
  )
}
