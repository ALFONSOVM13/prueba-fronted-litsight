import { POKEMON_TYPES } from "@/constants/pokemonTypes"
import MultiSelect from "../../ui/MultiSelect"

interface PokemonFiltersProps {
  selectedTypes: string[]
  onTypeFilter: (types: string[]) => void
}

export function PokemonFilters({
  selectedTypes,
  onTypeFilter,
}: PokemonFiltersProps) {
  return (
    <div className="flex-1 min-w-0">
      <MultiSelect
        options={POKEMON_TYPES}
        selectedValues={selectedTypes}
        onChange={onTypeFilter}
        label="Filtrar por Tipos"
        placeholder="Seleccionar tipos de Pokémon..."
        className="w-full"
      />
    </div>
  )
}