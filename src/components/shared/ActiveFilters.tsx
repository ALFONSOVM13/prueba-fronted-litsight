"use client"

import { X, Search, Tag, Filter, Trash2 } from "lucide-react"
import Button from "../ui/Button"
import { POKEMON_TYPES } from "@/constants/pokemonTypes"

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
    <div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Filter size={16} className="text-gray-500" />
          <span>Filtros activos:</span>
        </div>

        {searchTerm && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 group">
            <Search size={14} />
            <span>"{searchTerm}"</span>
            <button
              onClick={onRemoveSearchTerm}
              className="ml-1 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
              aria-label="Remover búsqueda"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {selectedTypes.map((type) => {
          const typeInfo = POKEMON_TYPES.find((t) => t.id === type.toLowerCase())
          return (
            <div
              key={type}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 group"
              style={{
                backgroundColor: typeInfo?.backgroundColor || "#8b5cf6",
                color: typeInfo?.color || "#ffffff",
              }}
            >
              <span>{typeInfo?.name}</span>
              <button
                onClick={() => onRemoveType(type)}
                className="ml-1 p-1 hover:bg-black/20 rounded-full transition-colors duration-200"
                aria-label={`Remover tipo ${typeInfo?.name}`}
              >
                <X size={12} />
              </button>
            </div>
          )
        })}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-300 hover:border-red-300 rounded-lg transition-all duration-200 group"
          >
            <Trash2 size={14} className="group-hover:text-red-600" />
            Limpiar todos
          </Button>
        )}
      </div>
    </div>
  )
}
