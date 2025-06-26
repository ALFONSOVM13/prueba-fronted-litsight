"use client"

import { ArrowUpDown, Hash, Type, ChevronUp, ChevronDown } from "lucide-react"
import type { Pokemon } from "@/types/pokemon"
import type { SortOrder } from "@/services/pokemonService"

interface SortControlsProps {
  sortField: keyof Pokemon
  sortOrder: SortOrder
  onSort: (field: keyof Pokemon) => void
}

export function SortControls({ sortField, sortOrder, onSort }: SortControlsProps) {
  const getSortIcon = (field: keyof Pokemon) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="text-gray-400" />
    return sortOrder === "asc" ? (
      <ChevronUp size={14} className="text-blue-600" />
    ) : (
      <ChevronDown size={14} className="text-blue-600" />
    )
  }

  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
      <span className="text-sm font-medium text-gray-600 px-3 py-1">Ordenar:</span>

      <button
        onClick={() => onSort("id")}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${
            sortField === "id"
              ? "bg-white text-orange-600 shadow-sm bord                                                                                                                            er border-orange-200"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          }
        `}
      >
        <Hash size={14} />
        <span className="hidden md:inline">Número</span>
        <span className="md:hidden">#</span>
        {getSortIcon("id")}
      </button>

      <button
        onClick={() => onSort("name")}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${
            sortField === "name"
              ? "bg-white text-orange-600 shadow-sm border border-orange-200"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          }
        `}
      >
        <Type size={14} />
        <span className="hidden md:inline">Nombre</span>
        <span className="md:hidden">A-Z</span>
        {getSortIcon("name")}
      </button>
    </div>
  )
}
