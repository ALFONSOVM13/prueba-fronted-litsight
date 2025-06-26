"use client"

import { POKEMON_TYPES } from "@/constants/pokemonTypes"
import { X } from "lucide-react"
import Button from "../ui/Button"

interface ActiveFiltersProps {
  searchTerm?: string
  selectedTypes: string[]
  onRemoveSearchTerm: () => void
  onRemoveType: (type: string) => void
  onClearAll: () => void
}

export function ActiveFilters({
  searchTerm,
  selectedTypes,
  onRemoveSearchTerm,
  onRemoveType,
  onClearAll,
}: ActiveFiltersProps) {
  const hasActiveFilters = searchTerm || selectedTypes.length > 0

  if (!hasActiveFilters) return null

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {searchTerm && (
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
          <span>&ldquo;{searchTerm}&rdquo;</span>
          <button
            onClick={onRemoveSearchTerm}
            className="hover:bg-gray-200 rounded p-0.5"
            aria-label="Remover búsqueda"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {selectedTypes.map((type) => {
        const typeInfo = POKEMON_TYPES.find((t) => t.id === type.toLowerCase())
        return (
          <div
            key={type}
            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
          >
            <span>{typeInfo?.name}</span>
            <button
              onClick={() => onRemoveType(type)}
              className="hover:bg-gray-200 rounded p-0.5"
              aria-label={`Remover ${typeInfo?.name}`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )
      })}

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-2 py-1 h-auto"
        >
          Limpiar todo
        </Button>
      )}
    </div>
  )
}
