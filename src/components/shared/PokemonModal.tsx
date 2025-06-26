"use client"

import { useEffect, useState } from "react"
import type { Pokemon, EvolutionChain } from "@/types/pokemon"
import { X } from 'lucide-react'
import Image from "next/image"
import Button from "../ui/Button"
import { POKEMON_TYPES } from "@/constants/pokemonTypes"
import { PokemonService } from "@/services/pokemonService"
import { StatsHexagon } from "./StatsHexagon"
import { motion, AnimatePresence } from "framer-motion"
import { calculateWeaknesses, PokemonType } from "@/constants/typeEffectiveness"

interface PokemonModalProps {
  pokemon: Pokemon
  isOpen: boolean
  onClose: () => void
}

export function PokemonModal({ pokemon, isOpen, onClose }: PokemonModalProps) {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null)
  const [isLoadingEvolutions, setIsLoadingEvolutions] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (isOpen && pokemon.id) {
        setIsLoadingEvolutions(true)
        try {
          const chain = await PokemonService.getEvolutionChain(pokemon.id)
          setEvolutionChain(chain)
        } catch (error) {
          console.error('Error al cargar la cadena de evolución:', error)
        } finally {
          setIsLoadingEvolutions(false)
        }
      }
    }

    fetchEvolutionChain()
  }, [isOpen, pokemon.id])

  if (!isOpen) return null

  const getStatValue = (statName: string) => {
    const stat = pokemon.stats.find((s: any) => s.stat.name === statName)
    return stat?.base_stat || 0
  }

  const getStatColor = (value: number) => {
    if (value >= 100) return 'bg-green-500'
    if (value >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getTypeStyles = (typeId: string) => {
    const typeInfo = POKEMON_TYPES.find(t => t.id === typeId)
    return {
      color: typeInfo?.color || '#FFFFFF',
      backgroundColor: typeInfo?.backgroundColor || '#A8A878'
    }
  }

  const getTypeName = (typeId: string) => {
    const typeInfo = POKEMON_TYPES.find(t => t.id === typeId)
    return typeInfo?.name || typeId
  }

  const getPokemonWeaknesses = () => {
    const types = pokemon.types.map((type: any) => type.type.name as PokemonType)
    return calculateWeaknesses(types)
  }

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

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 25,
              duration: 0.2
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/90 backdrop-blur-sm w-full h-full overflow-y-auto shadow-xl"
          >
            <div className="sticky top-0 z-10 flex justify-between items-center p-4 sm:p-6 border-b bg-white/50">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Detalles del Pokémon</h2>
              <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-600" />
              </Button>
            </div>

            <div className="p-4 sm:p-6 bg-white/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
                <div className="text-center">
                  <div 
                    className="relative p-8 rounded-2xl shadow-lg mb-4 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${getTypeStyles(pokemon.types[0].type.name).backgroundColor}40, ${getTypeStyles(pokemon.types[0].type.name).backgroundColor}80)`,
                      border: `3px solid ${getTypeStyles(pokemon.types[0].type.name).backgroundColor}`
                    }}
                  >
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-white"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full border-2 border-white"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white"></div>
                    </div>
                    
                    <Image
                      src={pokemon.sprites.other.home.front_default || "/placeholder.svg"}
                      alt={pokemon.name}
                      width={280}
                      height={280}
                      className="mx-auto drop-shadow-2xl hover:scale-110 transition-transform duration-300 relative z-2"
                    />
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-bold capitalize text-gray-800 mb-3">
                    #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
                  </h2>
                  
                  <div className="flex justify-center gap-2 mb-6">
                    {pokemon.types.map((type: any, index: number) => {
                      const styles = getTypeStyles(type.type.name)
                      return (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full text-sm font-semibold capitalize shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                          style={styles}
                        >
                          {getTypeName(type.type.name)}
                        </span>
                      )
                    })}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="bg-white/80 rounded-lg p-3 shadow-sm">
                      <p className="font-semibold text-gray-600">Peso</p>
                      <p className="text-lg font-bold text-gray-800">{(pokemon.weight / 10).toFixed(1)} kg</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-3 shadow-sm">
                      <p className="font-semibold text-gray-600">Altura</p>
                      <p className="text-lg font-bold text-gray-800">{(pokemon.height / 10).toFixed(1)} m</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-3 shadow-sm">
                      <p className="font-semibold text-gray-600">Exp. Base</p>
                      <p className="text-lg font-bold text-gray-800">{pokemon.base_experience || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 p-4 rounded-lg shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">Debilidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {getPokemonWeaknesses().map((weakness, index) => {
                        const styles = getTypeStyles(weakness)
                        return (
                          <span
                            key={index}
                            className="px-3 py-1.5 rounded-full text-xs sm:text-sm capitalize shadow-sm hover:shadow-md transition-shadow duration-300 opacity-80"
                            style={styles}
                          >
                            {getTypeName(weakness)}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">Estadísticas Base</h3>
                    <StatsHexagon
                      stats={[
                        { name: "HP", value: getStatValue("hp"), color: getStatColor(getStatValue("hp")) },
                        { name: "Ataque", value: getStatValue("attack"), color: getStatColor(getStatValue("attack")) },
                        { name: "Defensa", value: getStatValue("defense"), color: getStatColor(getStatValue("defense")) },
                        { name: "Atq. Esp.", value: getStatValue("special-attack"), color: getStatColor(getStatValue("special-attack")) },
                        { name: "Def. Esp.", value: getStatValue("special-defense"), color: getStatColor(getStatValue("special-defense")) },
                        { name: "Velocidad", value: getStatValue("speed"), color: getStatColor(getStatValue("speed")) },
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white/70 p-4 rounded-lg shadow-sm max-w-7xl mx-auto">
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities?.map((ability: any, index: number) => (
                    <span key={index} className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm capitalize shadow-sm hover:shadow-md transition-shadow duration-300">
                      {ability.ability.name}
                    </span>
                  ))}
                </div>
              </div>

              {evolutionChain && (evolutionChain.evolutions.length > 0 || evolutionChain.name !== pokemon.name) && (
                <div className="mt-6 bg-white/70 p-4 rounded-lg shadow-sm max-w-7xl mx-auto">
                  <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-800">Cadena de evolución</h3>
                  {isLoadingEvolutions ? (
                    <div className="text-center py-4">
                      <p className="text-gray-600">Cargando evoluciones...</p>
                    </div>
                  ) : (
                    <div className="bg-white/80 p-4 rounded-lg">
                      {renderEvolutionChain(evolutionChain)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}