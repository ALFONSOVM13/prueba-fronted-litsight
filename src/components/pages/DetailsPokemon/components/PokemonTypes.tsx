import { getTypeStyles, getTypeName } from "@/utils/styleUtils"

interface PokemonTypesProps {
  types: Array<{ type: { name: string } }>
}

export function PokemonTypes({ types }: PokemonTypesProps) {
  return (
    <div className="flex justify-center gap-2 mb-6">
      {types.map((type, index) => {
        const styles = getTypeStyles(type.type.name)
        return (
          <span
            key={index}
            className="px-4 py-2 rounded-full text-sm font-semibold capitalize shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={styles}
          >
            {getTypeName(type.type.name)}
          </span>
        )
      })}
    </div>
  )
} 