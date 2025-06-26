"use client"
import { SortControls } from "@/components/shared/SortControls"
import { ViewToggle } from "@/components/shared/ViewToggle"
import type { SortOrder } from "@/services/pokemonService"
import type { Pokemon } from "@/types/pokemon"

interface ControlsContainerProps {
  viewMode: "grid" | "table"
  sortField: keyof Pokemon
  sortOrder: SortOrder
  onViewChange: (mode: "grid" | "table") => void
  onSort: (field: keyof Pokemon) => void
}

export function ControlsContainer({ viewMode, sortField, sortOrder, onViewChange, onSort }: ControlsContainerProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-start lg:mt-4">
        <div className="flex-shrink-0">
          <ViewToggle viewMode={viewMode} onViewChange={onViewChange} />
        </div>

        {viewMode === "grid" && (
          <div className="flex-shrink-0">
            <SortControls sortField={sortField} sortOrder={sortOrder} onSort={onSort} />
          </div>
        )}
    </div>
  )
}
