import Image from "next/image"
import type { EvolutionChain } from "@/types/pokemon"

interface PokemonEvolutionsProps {
  evolutionChain: EvolutionChain | null
  isLoading: boolean
  pokemonName: string
}

export function PokemonEvolutions({ evolutionChain, isLoading, pokemonName }: PokemonEvolutionsProps) {
  const renderEvolutionChain = (chain: EvolutionChain) => {
    return (
      <div className="flex items-center gap-4">
        <div className="text-center">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${chain.id}.png`}
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

  if (!evolutionChain || (!evolutionChain.evolutions.length && evolutionChain.name === pokemonName)) {
    return null
  }

  return (
    <div className="mt-6 bg-white/70 p-4 rounded-lg shadow-sm max-w-7xl mx-auto">
      <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-800">Cadena de evolución</h3>
      {isLoading ? (
        <div className="text-center py-4">
          <p className="text-gray-600">Cargando evoluciones...</p>
        </div>
      ) : (
        <div className="bg-white/80 p-4 rounded-lg">
          {renderEvolutionChain(evolutionChain)}
        </div>
      )}
    </div>
  )
} 