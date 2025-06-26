import { POKEMON_TYPES } from "@/constants/pokemonTypes"
import { ActiveFilters } from "../../shared/ActiveFilters"
import MultiSelect from "../../ui/MultiSelect"

interface PokemonFiltersProps {
  selectedTypes: string[]
  activeSearchTerm: string
  onTypeFilter: (types: string[]) => void
  onRemoveSearchTerm: () => void
  onRemoveType: (type: string) => void
  onClearAll: () => void
}

export function PokemonFilters({
  selectedTypes,
  activeSearchTerm,
  onTypeFilter,
  onRemoveSearchTerm,
  onRemoveType,
  onClearAll,
}: PokemonFiltersProps) {
  return (
    <>
      <MultiSelect
        options={POKEMON_TYPES}
        selectedValues={selectedTypes}
        onChange={onTypeFilter}
        placeholder="Seleccionar tipos de Pokémon..."
        className="w-full lg:max-w-md my-4"
      />

      <ActiveFilters
        searchTerm={activeSearchTerm}
        selectedTypes={selectedTypes}
        onRemoveSearchTerm={onRemoveSearchTerm}
        onRemoveType={onRemoveType}
        onClearAll={onClearAll}
      />
    </>
  )
} 