"use client";

import { POKEMON_TYPES } from "@/constants/pokemonTypes";
import {
    PokemonFilters,
    PokemonService,
    SortOrder,
} from "@/services/pokemonService";
import { Pokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";
import Pagination from "../shared/Pagination";
import { PokemonCard } from "../shared/PokemonCard";

export default function HomePage() {
  const [modal, setModal] = useState(false);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para filtros
  const [filters, setFilters] = useState<PokemonFilters>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Estados para ordenamiento
  const [sortField, setSortField] = useState<keyof Pokemon>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    loadPokemon();
  }, [currentPage, filters, sortField, sortOrder]);

  const loadPokemon = async () => {
    try {
      setLoading(true);
      const response = await PokemonService.getProcessedPokemonList(
        { ...filters, search: searchTerm, types: selectedTypes },
        { field: sortField, order: sortOrder },
        { page: currentPage, pageSize }
      );
      setPokemonList(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError("Error al cargar los Pokémon");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleTypeFilter = (type: string) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(updatedTypes);
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, types: updatedTypes }));
  };

  const handleSort = (field: keyof Pokemon) => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setSortField(field);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Cargando Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mb-36">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Explorador de Pokémon
      </h1>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          className="w-full p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {POKEMON_TYPES.map((typeInfo) => (
          <button
            key={typeInfo.id}
            onClick={() => handleTypeFilter(typeInfo.id)}
            className={`px-4 py-2 rounded-full transition-all`}
            style={{
              backgroundColor: selectedTypes.includes(typeInfo.id)
                ? typeInfo.backgroundColor
                : "#e5e7eb",
              color: selectedTypes.includes(typeInfo.id)
                ? typeInfo.color
                : "#374151",
            }}
          >
            {typeInfo.name}
          </button>
        ))}
      </div>

      {/* Ordenamiento */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleSort("id")}
          className={`px-4 py-2 rounded ${
            sortField === "id" ? "bg-blue-500 text-white" : "bg-gray-200"
          } disabled:opacity-50 disabled:cursor-wait`}
        >
          Ordenar por ID{" "}
          {sortField === "id" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => handleSort("name")}
          className={`px-4 py-2 rounded ${
            sortField === "name" ? "bg-blue-500 text-white" : "bg-gray-200"
          } disabled:opacity-50 disabled:cursor-wait`}
        >
          Ordenar por Nombre{" "}
          {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
      </div>

      <div className="flex flex-wrap gap-20 m-20">
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            setModal={() => {}}
            setPokemonData={() => {}}
          />
        ))}
      </div>

      {/* Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
