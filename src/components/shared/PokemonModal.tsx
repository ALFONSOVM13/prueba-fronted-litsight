"use client"

import type { Pokemon } from "@/types/pokemon"
import { X } from "lucide-react"
import Image from "next/image"
import Button from "../ui/Button"

interface PokemonModalProps {
  pokemon: Pokemon
  isOpen: boolean
  onClose: () => void
}

export function PokemonModal({ pokemon, isOpen, onClose }: PokemonModalProps) {
  if (!isOpen) return null

  const getStatValue = (statName: string) => {
    const stat = pokemon.stats.find((s: any) => s.stat.name === statName)
    return stat?.base_stat || 0
  }

  const getStatColor = (value: number) => {
    if (value >= 171) return 'bg-green-500'
    if (value >= 86) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="fixed inset-0 bg-dark bg-opacity-90 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-slate-200 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <h2 className="text-xl sm:text-2xl font-bold capitalize">{pokemon.name}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <Image
                src={pokemon.sprites.front_default || "/placeholder.svg"}
                alt={pokemon.name}
                width={200}
                height={200}
                className="mx-auto mb-4"
              />
              <div className="space-y-2 text-sm sm:text-base">
                <p>
                  <strong>ID:</strong> #{pokemon.id}
                </p>
                <p>
                  <strong>Peso:</strong> {(pokemon.weight / 10).toFixed(1)} kg
                </p>
                <p>
                  <strong>Altura:</strong> {(pokemon.height / 10).toFixed(1)} m
                </p>
                <p>
                  <strong>Experiencia Base:</strong> {pokemon.base_experience || "N/A"}
                </p>
              </div>
            </div>

            {/* Tipos y estadísticas */}
            <div>
              <div className="mb-4">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Tipos</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.types.map((type: any, index: number) => (
                    <span key={index} className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm capitalize">
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3">Estadísticas Base</h3>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { name: "HP", key: "hp" },
                    { name: "Ataque", key: "attack" },
                    { name: "Defensa", key: "defense" },
                    { name: "Ataque Especial", key: "special-attack" },
                    { name: "Defensa Especial", key: "special-defense" },
                    { name: "Velocidad", key: "speed" },
                  ].map((stat) => {
                    const value = getStatValue(stat.key)
                    return (
                      <div key={stat.key} className="flex items-center gap-2 sm:gap-3">
                        <span className="w-20 sm:w-24 text-xs sm:text-sm font-medium">{stat.name}:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`${getStatColor(value)} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${Math.min((value / 255) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className="w-6 sm:w-8 text-xs sm:text-sm font-bold">{value}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Habilidades */}
          <div className="mt-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Habilidades</h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities?.map((ability: any, index: number) => (
                <span key={index} className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm capitalize">
                  {ability.ability.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
