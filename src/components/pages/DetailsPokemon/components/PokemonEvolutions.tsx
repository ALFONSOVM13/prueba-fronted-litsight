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
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div 
            className={`cursor-pointer transition-transform hover:scale-110 ${chain.name === pokemonName ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
            onClick={() => onEvolutionClick(chain.id)}
          >
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chain.id}.png`}
              alt={chain.name}
              width={80}
              height={80}
              className="mx-auto"
            />
            <p className="text-sm font-medium capitalize mt-1">{chain.name}</p>
            {chain.min_level && (
              <p className="text-xs text-gray-600">Nivel {chain.min_level}</p>
            )}
            {chain.trigger && chain.trigger !== 'level-up' && (
              <p className="text-xs text-gray-600 capitalize">{chain.trigger}</p>
            )}
            {chain.item && (
              <p className="text-xs text-gray-600 capitalize">{chain.item}</p>
            )}
          </div>
        </div>
        {chain.evolutions.length > 0 && (
          <>
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <div className="mt-6 bg-white/70 p-4 rounded-lg shadow-sm max-w-7xl mx-auto">
      <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-800">Cadena de evolución</h3>
      {isLoading ? (
        <div className="text-center py-4">
          <p className="text-gray-600">Cargando evoluciones...</p>
        </div>
      ) : !evolutionChain || (!evolutionChain.evolutions.length && evolutionChain.name === pokemonName) ? (
        <div className="bg-white/80 p-6 rounded-lg text-center">
          <div className="mb-4">
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutionChain?.id || 1}.png`}
              alt={pokemonName}
              width={120}
              height={120}
              className="mx-auto opacity-90"
            />
          </div>
          <p className="text-lg font-medium text-gray-800 mb-2">¡Pokémon único!</p>
          <p className="text-gray-600">Este Pokémon no tiene evoluciones conocidas.</p>
          <p className="text-sm text-gray-500 mt-2">Cada Pokémon es especial a su manera.</p>
        </div>
      ) : (
        <div className="bg-white/80 p-4 rounded-lg">
          {renderEvolutionChain(evolutionChain)}
        </div>
      )}
    </div>
  )
} 