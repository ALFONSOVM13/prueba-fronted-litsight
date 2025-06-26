import { Search } from 'lucide-react'
import Input from "../../ui/Input"

interface SearchBarProps {
  searchTerm: string
  onSearch: (value: string) => void
  onExecuteSearch: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export function SearchBar({ searchTerm, onSearch, onExecuteSearch, onKeyDown }: SearchBarProps) {
  return (
    <div className="relative mb-8 max-w-2xl mx-auto">
      <div className="relative flex items-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 focus-within:border-orange-600 focus-within:ring-4 focus-within:ring-orange-600/20">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Buscar Pokémon por nombre o número..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full pl-6 pr-16 py-4 text-lg bg-transparent border-none rounded-2xl focus:outline-none focus:ring-0 placeholder:text-gray-400"
          />
        </div>
        
        <button
          onClick={onExecuteSearch}
          className="absolute right-2 p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-600/30"
          aria-label="Buscar Pokémon"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}