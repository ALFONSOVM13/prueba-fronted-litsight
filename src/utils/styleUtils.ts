import { POKEMON_TYPES } from "@/constants/pokemonTypes"

export const getTypeStyles = (typeId: string) => {
  const typeInfo = POKEMON_TYPES.find(t => t.id === typeId)
  return {
    color: typeInfo?.color || '#FFFFFF',
    backgroundColor: typeInfo?.backgroundColor || '#A8A878'
  }
}

export const getTypeName = (typeId: string) => {
  const typeInfo = POKEMON_TYPES.find(t => t.id === typeId)
  return typeInfo?.name || typeId
}

export const getStatColor = (value: number) => {
  if (value >= 100) return 'bg-green-500'
  if (value >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
} 