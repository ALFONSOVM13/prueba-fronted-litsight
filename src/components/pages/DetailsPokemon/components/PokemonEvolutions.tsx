import Image from "next/image"
import type { EvolutionChain } from "@/types/pokemon"

interface PokemonEvolutionsProps {
  evolutionChain: EvolutionChain | null
  isLoading: boolean
  pokemonName: string
  onEvolutionClick: (pokemonId: number) => void
}

export function PokemonEvolutions({ evolutionChain, isLoading, pokemonName, onEvolutionClick }: PokemonEvolutionsProps) {
  const renderEvolutionChain = (chain: EvolutionChain) => {
    return (
      <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-8">
        <div className="text-center min-w-[120px] md:min-w-[160px]">
          <div 
            className={`cursor-pointer transition-all duration-300 hover:scale-110 ${chain.name === pokemonName ? 'opacity-100 scale-110' : 'opacity-80 hover:opacity-100'}`}
            onClick={() => onEvolutionClick(chain.id)}
          >
            <div className="relative bg-white/40 rounded-full p-2 md:p-4 mb-2 md:mb-3 shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chain.id}.png`}
                alt={chain.name}
                width={100}
                height={100}
                className="mx-auto drop-shadow-md w-20 h-20 md:w-32 md:h-32"
              />
            </div>
            <p className="text-sm md:text-base font-semibold text-dark capitalize mt-1 md:mt-2">{chain.name}</p>
            {chain.min_level && (
              <p className="text-xs md:text-sm text-dark/80 mt-1">Nivel {chain.min_level}</p>
            )}
            {chain.trigger && chain.trigger !== 'level-up' && (
              <p className="text-xs md:text-sm text-dark/80 capitalize mt-1">{chain.trigger}</p>
            )}
            {chain.item && (
              <p className="text-xs md:text-sm text-dark/80 capitalize mt-1">{chain.item}</p>
            )}
          </div>
        </div>
        {chain.evolutions.length > 0 && (
          <>
            <div className="flex-shrink-0 rotate-90 md:rotate-0">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-dark/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            {chain.evolutions.map((evolution, index) => (
              <div key={index} className="flex-1">
                {renderEvolutionChain(evolution)}
              </div>
            ))}
          </>
        )}
      </div>
    )
  }

  return (
    <div className="mt-4 md:mt-8 bg-light p-4 md:p-6 rounded-xl shadow-lg max-w-7xl mx-auto">
      <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-dark">Cadena de evolución</h3>
      {isLoading ? (
        <div className="text-center py-4 md:py-6">
          <p className="text-dark">Cargando evoluciones...</p>
        </div>
      ) : !evolutionChain || (!evolutionChain.evolutions.length && evolutionChain.name === pokemonName) ? (
        <div className="p-4 md:p-8 rounded-xl text-center">
          <div className="mb-4 md:mb-6">
            <div className="relative bg-light rounded-full p-4 md:p-6 inline-block">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutionChain?.id || 1}.png`}
                alt={pokemonName}
                width={140}
                height={140}
                className="mx-auto drop-shadow-lg w-32 h-32 md:w-44 md:h-44"
              />
            </div>
          </div>
          <p className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">¡Pokémon único!</p>
          <p className="text-base md:text-lg text-gray-600">Este Pokémon no tiene evoluciones conocidas.</p>
          <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-3">Cada Pokémon es especial a su manera.</p>
        </div>
      ) : (
        <div className="p-2 md:p-6">
          {renderEvolutionChain(evolutionChain)}
        </div>
      )}
    </div>
  )
} 