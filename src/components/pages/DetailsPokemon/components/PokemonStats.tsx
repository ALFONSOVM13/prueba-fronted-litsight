import { StatsHexagon } from "@/components/shared/StatsHexagon"
import { getStatColor } from "@/utils/styleUtils"

interface PokemonStatsProps {
  stats: Array<{ stat: { name: string }, base_stat: number }>
}

export function PokemonStats({ stats }: PokemonStatsProps) {
  const getStatValue = (statName: string) => {
    const stat = stats.find(s => s.stat.name === statName)
    return stat?.base_stat || 0
  }

  return (
    <div className="mt-4">
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
  )
} 