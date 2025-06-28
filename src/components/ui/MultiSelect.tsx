"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, X, Search } from "lucide-react"
import Label from "./Label"
import { cn } from "@/utils/cn"
import Input from "./Input"

interface MultiSelectOption {
  id: string
  name: string
  color: string
  backgroundColor: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  className?: string
  label?: string
  required?: boolean
  error?: string
}

export default function MultiSelect({
  options,
  selectedValues,
  onChange,
  placeholder = "Seleccionar opciones...",
  className = "",
  label,
  required = false,
  error,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  const handleToggleOption = (optionId: string) => {
    const newValues = selectedValues.includes(optionId)
      ? selectedValues.filter((id) => id !== optionId)
      : [...selectedValues, optionId]
    onChange(newValues)
  }

  const handleRemoveOption = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(selectedValues.filter((id) => id !== optionId))
  }

  const getSelectedOptions = () => {
    return options.filter((option) => selectedValues.includes(option.id))
  }

  const getFilteredOptions = () => {
    return options.filter((option) =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange([])
    setSearchTerm("")
  }

  return (
    <div className="w-ful">
      {label && (
        <Label required={required} className="mb-1 text-white">
          {label}
        </Label>
      )}
      <div className={`relative ${className}`} ref={dropdownRef}>
        {/* Trigger Button */}
        <div
          className={cn(
            "min-h-[42px] w-full px-3 py-2 border rounded-lg bg-white cursor-pointer flex items-center justify-between hover:border-gray-400",
            "focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500",
            error ? "border-red-500" : "border-gray-300",
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex-1 flex flex-wrap gap-1">
            {selectedValues.length === 0 ? (
              <span className="text-gray-500">{placeholder}</span>
            ) : (
              <>
                {getSelectedOptions().map((option) => (
                  <span
                    key={option.id}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: option.backgroundColor,
                      color: option.color,
                    }}
                  >
                    {option.name}
                    <button
                      onClick={(e) => handleRemoveOption(option.id, e)}
                      className="hover:bg-black/10 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </>
            )}
          </div>
          <div className="flex items-center gap-2 ml-2">
            {selectedValues.length > 0 && (
              <button onClick={clearAll} className="text-gray-400 hover:text-gray-600 p-1" title="Limpiar selección">
                <X className="w-4 h-4" />
              </button>
            )}
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <div className="p-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Tipos de Pokémon</span>
                {selectedValues.length > 0 && (
                  <button onClick={clearAll} className="text-xs text-blue-600 hover:text-blue-800">
                    Limpiar todo
                  </button>
                )}
              </div>
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar tipo..."
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              {getFilteredOptions().map((option) => {
                const isSelected = selectedValues.includes(option.id)
                return (
                  <div
                    key={option.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleToggleOption(option.id)}
                  >
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium w-full transition-colors ${
                        isSelected ? 'ring-2 ring-offset-1' : ''
                      }`}
                      style={{
                        backgroundColor: option.backgroundColor,
                        color: option.color,
                      }}
                    >
                      {option.name}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
