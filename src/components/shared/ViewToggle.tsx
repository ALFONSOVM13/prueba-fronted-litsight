"use client"

import { LayoutGrid, List } from "lucide-react"

interface ViewToggleProps {
  viewMode: "grid" | "table"
  onViewChange: (mode: "grid" | "table") => void
}

export function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => onViewChange("grid")}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${
            viewMode === "grid"
              ? "bg-white text-orange-600 shadow-sm border border-orange-200"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          }
        `}
        aria-pressed={viewMode === "grid"}
      >
        <LayoutGrid size={16} />
        <span className="hidden sm:inline">Cuadrícula</span>
      </button>

      <button
        onClick={() => onViewChange("table")}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${
            viewMode === "table"
              ? "bg-white text-orange-600 shadow-sm border border-orange-200"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          }
        `}
        aria-pressed={viewMode === "table"}
      >
        <List size={16} />
        <span className="hidden sm:inline">Tabla</span>
      </button>
    </div>
  )
}
