"use client"

import { POKEMON_TYPES } from "@/constants/pokemonTypes"
import type { SyntheticEvent } from "react"

type PokemonTypeProps = {
  type: string
  tabIndex: boolean
  handleClick?: (e: SyntheticEvent) => void
}

export const PokemonType = ({ type, tabIndex, handleClick }: PokemonTypeProps) => {
  const [{ name, backgroundColor }] = POKEMON_TYPES.filter((item) => item.id === type)

  return name && backgroundColor ? (
    <button
      onClick={handleClick}
      tabIndex={tabIndex ? 0 : -1}
      className="relative flex items-center gap-2 px-4 py-2 rounded-full
                text-white text-sm font-semibold capitalize 
                shrink-0 overflow-hidden
                hover:scale-105 hover:shadow-lg
                transition-all duration-300 ease-out
                border border-white/20"
      style={{
        background: `linear-gradient(135deg, ${backgroundColor}90 0%, ${backgroundColor} 100%)`,
      }}
    >
      {/* Efecto de brillo */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                     opacity-0 hover:opacity-100 transition-opacity duration-300"
      />

      <span className="relative z-10">{name}</span>
    </button>
  ) : (
    <span className="text-sm font-normal text-slate-400 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
      Tipo desconocido
    </span>
  )
}
