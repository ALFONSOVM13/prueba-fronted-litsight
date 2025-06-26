import { calculateWeaknesses, PokemonType } from "@/constants/typeEffectiveness"
import { getTypeStyles, getTypeName } from "@/utils/styleUtils"

interface PokemonWeaknessesProps {
  types: Array<{ type: { name: string } }>
}

export function PokemonWeaknesses({ types }: PokemonWeaknessesProps) {
  const getPokemonWeaknesses = () => {
    const typeNames = types.map(type => type.type.name as PokemonType)
    return calculateWeaknesses(typeNames)
  }

  return (
    <div className="mb-4">
      <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">Debilidades</h3>
      <div className="flex flex-wrap gap-2">
        {getPokemonWeaknesses().map((weakness, index) => {
          const styles = getTypeStyles(weakness)
          return (
            <span
              key={index}
              className="px-3 py-1.5 rounded-full text-xs sm:text-sm capitalize shadow-sm hover:shadow-md transition-shadow duration-300 opacity-80"
              style={styles}
            >
              {getTypeName(weakness)}
            </span>
          )
        })}
      </div>
    </div>
  )
} 