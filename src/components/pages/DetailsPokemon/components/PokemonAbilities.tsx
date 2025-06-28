interface PokemonAbilitiesProps {
  abilities: Array<{ ability: { name: string } }>
}

export function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  return (
    <div className="mt-6 bg-light p-4 rounded-lg shadow-sm max-w-7xl mx-auto">
      <h3 className="text-base sm:text-lg font-semibold mb-2 text-dark">Habilidades</h3>
      <div className="flex flex-wrap gap-2">
        {abilities?.map((ability, index) => (
          <span key={index} className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm capitalize shadow-sm hover:shadow-md transition-shadow duration-300">
            {ability.ability.name}
          </span>
        ))}
      </div>
    </div>
  )
} 