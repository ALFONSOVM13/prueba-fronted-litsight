import { PokemonCard } from "@/components/shared/PokemonCard"
import { PokemonTable } from "@/components/shared/PokemonTable"
import type { Pokemon } from "@/types/pokemon"
import type { SortingState } from "@tanstack/react-table"


interface PokemonListProps {
  viewMode: "grid" | "table"
  pokemonList: Pokemon[]
  onViewDetails: (pokemon: Pokemon) => void
  tableSorting: SortingState
  onTableSortingChange: (updater: SortingState | ((old: SortingState) => SortingState)) => void
}

export function PokemonList({
  viewMode,
  pokemonList,
  onViewDetails,
  tableSorting,
  onTableSortingChange,
}: PokemonListProps) {
  if (viewMode === "grid") {
    return (
      <div className="flex flex-wrap gap-6 mt-12">
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            setModal={() => onViewDetails(pokemon)}
            setPokemonData={() => {}}
          />
        ))}
      </div>
    )
  }
  return (
    <PokemonTable
      data={pokemonList}
      onViewDetails={onViewDetails}
      sorting={tableSorting}
      onSortingChange={onTableSortingChange}
    />
  )
} 