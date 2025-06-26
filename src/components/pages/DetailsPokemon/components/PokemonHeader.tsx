import { X } from 'lucide-react'
import Button from "@/components/ui/Button"

interface PokemonHeaderProps {
  onClose: () => void
}

export function PokemonHeader({ onClose }: PokemonHeaderProps) {
  return (
    <div className="sticky top-0 z-10 flex justify-between items-center p-4 sm:p-6 border-b bg-white/50">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Detalles del Pokémon</h2>
      <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-gray-100 rounded-full">
        <X className="w-5 h-5 text-gray-600" />
      </Button>
    </div>
  )
} 