"use client";

import { usePokemonList } from "@/hooks/usePokemonList";
import type { Pokemon } from "@/types/pokemon";
import { useState } from "react";
import Pagination from "../../shared/Pagination";
import { Loader } from "../../ui/Loader";
import { ControlsContainer } from "./components/ControlsContainer";
import { PokemonFilters } from "./components/PokemonFilters";
import { PokemonList } from "./components/PokemonList";
import { SearchBar } from "./components/SearchBar";
import PokemonDetail from "../DetailsPokemon";

export default function HomePage() {
  const [modal, setModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");


  const {
    pokemonList,
    loading,
    error,
    tableSorting,
    searchTerm,
    selectedTypes,
    sortField,
    sortOrder,
    currentPage,
    totalPages,
    suggestions,
    showSuggestions,
    handleSearch,
    executeSearch,
    handleKeyPress,
    handleTypeFilter,
    handleSort,
    handleTableSort,
    handleSuggestionClick,
    setCurrentPage,
    setShowSuggestions,
  } = usePokemonList({ viewMode });

  const handleViewDetails = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    setSelectedPokemon(null);
  };

  const filteredPokemon = pokemonList.filter(p => 
    selectedTypes.length === 0 || 
    p.types.some(t => selectedTypes.includes(t.type.name))
  );

  const handlePrevious = () => {
    if (!selectedPokemon) return;
    const currentIndex = filteredPokemon.findIndex(p => p.id === selectedPokemon.id);
    if (currentIndex > 0) {
      setSelectedPokemon(filteredPokemon[currentIndex - 1]);
    }
  };
  
  const handleNext = () => {
    if (!selectedPokemon) return;
    const currentIndex = filteredPokemon.findIndex(p => p.id === selectedPokemon.id);
    if (currentIndex < filteredPokemon.length - 1) {
      setSelectedPokemon(filteredPokemon[currentIndex + 1]);
    }
  };

  const getCurrentPokemonIndex = () => {
    if (!selectedPokemon) return -1;
    return filteredPokemon.findIndex(p => p.id === selectedPokemon.id);
  };

  const currentIndex = getCurrentPokemonIndex();
  const previousPokemon = currentIndex > 0 ? filteredPokemon[currentIndex - 1] : undefined;
  const nextPokemon = currentIndex < filteredPokemon.length - 1 ? filteredPokemon[currentIndex + 1] : undefined;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
        <Loader />
        <p className="text-base sm:text-xl">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-base sm:text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center">
        Explorador de Pokémon
      </h1>

      <div className="space-y-4 sm:space-y-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onExecuteSearch={executeSearch}
          onKeyDown={handleKeyPress}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          onSuggestionClick={handleSuggestionClick}
          setShowSuggestions={setShowSuggestions}
        />

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-end pb-8">
          <div className="flex-1 min-w-0">
            <PokemonFilters
              selectedTypes={selectedTypes}
              onTypeFilter={handleTypeFilter}
            />
          </div>

          <div className="flex-shrink-0 lg:ml-auto">
            <ControlsContainer
              viewMode={viewMode}
              sortField={sortField}
              sortOrder={sortOrder}
              onViewChange={setViewMode}
              onSort={handleSort}
            />
          </div>
        </div>

        <PokemonList
          viewMode={viewMode}
          pokemonList={pokemonList}
          onViewDetails={handleViewDetails}
          tableSorting={tableSorting}
          onTableSortingChange={handleTableSort}
        />

        <div className="mt-4 sm:mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {modal && selectedPokemon && (
        <PokemonDetail
          pokemon={selectedPokemon}
          onClose={handleCloseModal}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < filteredPokemon.length - 1}
          previousPokemon={previousPokemon}
          nextPokemon={nextPokemon}
          onPokemonChange={(newPokemon) => {
            setSelectedPokemon(newPokemon);
          }}
        />
      )}
    </div>
  );
}
