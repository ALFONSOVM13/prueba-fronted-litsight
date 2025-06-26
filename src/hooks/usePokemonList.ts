import { useState, useEffect } from "react"
import type { Pokemon } from "@/types/pokemon"
import type { PokemonFilters, SortOrder } from "@/services/pokemonService"
import { PokemonService } from "@/services/pokemonService"
import type { SortingState } from "@tanstack/react-table"

interface UsePokemonListProps {
  viewMode: "grid" | "table"
}

export function usePokemonList({ viewMode }: UsePokemonListProps) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tableSorting, setTableSorting] = useState<SortingState>([])

  // Estados para filtros
  const [filters, setFilters] = useState<PokemonFilters>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSearchTerm, setActiveSearchTerm] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  // Estados para ordenamiento
  const [sortField, setSortField] = useState<keyof Pokemon>("id")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const getPageSize = () => (viewMode === "table" ? 20 : 12)

  useEffect(() => {
    loadPokemon()
  }, [currentPage, filters, sortField, sortOrder, viewMode])

  const loadPokemon = async () => {
    try {
      setLoading(true)
      const response = await PokemonService.getProcessedPokemonList(
        { ...filters, search: searchTerm, types: selectedTypes },
        { field: sortField, order: sortOrder },
        { page: currentPage, pageSize: getPageSize() },
      )
      setPokemonList(response.data)
      setTotalPages(response.totalPages)
    } catch (err) {
      setError("Error al cargar los Pokémon")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const executeSearch = () => {
    setCurrentPage(1)
    setActiveSearchTerm(searchTerm)
    setFilters((prev) => ({ ...prev, search: searchTerm }))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSearch()
    }
  }

  const handleTypeFilter = (types: string[]) => {
    setSelectedTypes(types)
    setFilters((prev) => ({ ...prev, types }))
    setCurrentPage(1)
  }

  const handleSort = (field: keyof Pokemon) => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
    setSortField(field)
    setCurrentPage(1)
  }

  const handleTableSort = (updater: SortingState | ((old: SortingState) => SortingState)) => {
    const newSorting = typeof updater === "function" ? updater(tableSorting) : updater
    setTableSorting(newSorting)
    if (newSorting.length > 0) {
      const { id, desc } = newSorting[0]
      setSortField(id as keyof Pokemon)
      setSortOrder(desc ? "desc" : "asc")
    }
  }

  const handleRemoveSearchTerm = () => {
    setSearchTerm("")
    setActiveSearchTerm("")
    setFilters((prev) => ({ ...prev, search: "" }))
    setCurrentPage(1)
  }

  const handleRemoveType = (typeToRemove: string) => {
    const newTypes = selectedTypes.filter((type) => type !== typeToRemove)
    setSelectedTypes(newTypes)
    setFilters((prev) => ({ ...prev, types: newTypes }))
    setCurrentPage(1)
  }

  const handleClearAllFilters = () => {
    setSearchTerm("")
    setActiveSearchTerm("")
    setSelectedTypes([])
    setFilters({})
    setCurrentPage(1)
  }

  return {
    pokemonList,
    loading,
    error,
    tableSorting,
    searchTerm,
    activeSearchTerm,
    selectedTypes,
    sortField,
    sortOrder,
    currentPage,
    totalPages,
    handleSearch,
    executeSearch,
    handleKeyPress,
    handleTypeFilter,
    handleSort,
    handleTableSort,
    handleRemoveSearchTerm,
    handleRemoveType,
    handleClearAllFilters,
    setCurrentPage,
  }
} 