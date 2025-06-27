import type { Pokemon } from '@/types/pokemon'
import { Search } from 'lucide-react'
import { useEffect, useRef } from 'react'
import Input from "../../../ui/Input"

interface SearchBarProps {
  searchTerm: string
  onSearch: (value: string) => void
  onExecuteSearch: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  suggestions: Pokemon[]
  showSuggestions: boolean
  onSuggestionClick: (pokemon: Pokemon) => void
  setShowSuggestions: (show: boolean) => void
}

export function SearchBar({ 
  searchTerm, 
  onSearch, 
  onExecuteSearch, 
  onKeyDown,
  suggestions,
  showSuggestions,
  onSuggestionClick,
  setShowSuggestions
}: SearchBarProps) {
  const searchContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setShowSuggestions])

  return (
    <div className="relative mb-8 max-w-2xl mx-auto" ref={searchContainerRef}>
      <div className="relative flex items-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 focus-within:border-orange-600 focus-within:ring-4 focus-within:ring-orange-600/20">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Buscar Pokémon por nombre o número..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            onKeyDown={(e) => {
              onKeyDown(e)
              if (e.key === 'Escape') {
                setShowSuggestions(false)
              }
            }}
            className="w-full pl-6 pr-16 py-4 text-lg bg-transparent border-none rounded-2xl focus:outline-none focus:ring-0 placeholder:text-gray-400"
          />
        </div>
        
        <button
          onClick={() => {
            onExecuteSearch()
            setShowSuggestions(false)
          }}
          className="absolute right-2 p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-600/30"
          aria-label="Buscar Pokémon"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-80 overflow-y-auto"
        >
          {suggestions.map((pokemon) => (
            <button
              key={pokemon.id}
              onClick={() => onSuggestionClick(pokemon)}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-orange-50 transition-colors duration-200 text-left"
            >
              <img 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name}
                className="w-10 h-10 object-contain"
              />
              <div>
                <p className="font-medium capitalize">{pokemon.name}</p>
                <p className="text-sm text-gray-500">#{String(pokemon.id).padStart(3, '0')}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}