import { Search } from "lucide-react"
import Input from "../../ui/Input"

interface SearchBarProps {
  searchTerm: string
  onSearch: (value: string) => void
  onExecuteSearch: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export function SearchBar({ searchTerm, onSearch, onExecuteSearch, onKeyDown }: SearchBarProps) {
  return (
    <div className="relative mb-6 gap-4 flex-1 flex items-center">
      <Input
        type="text"
        placeholder="Buscar por nombre o número"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button
        onClick={onExecuteSearch}
        className="absolute right-0 h-full px-4 rounded-r-lg bg-sky-200 hover:bg-dark transition-colors"
      >
        <Search className="w-6 h-6 text-dark" />
      </button>
    </div>
  )
} 