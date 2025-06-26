"use client"

import { Scale, Ruler, Zap } from "lucide-react"

interface PokemonInfoProps {
  weight: number
  height: number
  baseExperience: number | null
  typeId?: string
}

export function PokemonInfo({ weight, height, baseExperience, typeId }: PokemonInfoProps) {
  const stats = [
    {
      label: "Peso",
      value: `${(weight / 10).toFixed(1)} kg`,
      icon: Scale,
      color: "from-blue-400 to-blue-600",
      shadowColor: "blue-500/20",
    },
    {
      label: "Altura",
      value: `${(height / 10).toFixed(1)} m`,
      icon: Ruler,
      color: "from-green-400 to-green-600",
      shadowColor: "green-500/20",
    },
    {
      label: "Exp. Base",
      value: baseExperience?.toString() || "N/A",
      icon: Zap,
      color: "from-yellow-400 to-yellow-600",
      shadowColor: "yellow-500/20",
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 text-sm">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="group relative overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl blur-xl`}
            />

            <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-lg bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="font-semibold text-gray-600 text-xs uppercase tracking-wide">{stat.label}</p>
                </div>

                <p className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                  {stat.value}
                </p>

                <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-700 group-hover:w-full`}
                    style={{ width: "60%" }}
                  />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              <div
                className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-${stat.shadowColor} rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
            </div>

            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div
                className={`absolute top-2 right-2 w-1 h-1 bg-gradient-to-r ${stat.color} rounded-full`}
                style={{
                  animation: `sparkle 2s ease-in-out infinite ${index * 0.5}s`,
                }}
              />
              <div
                className={`absolute bottom-3 left-3 w-0.5 h-0.5 bg-gradient-to-r ${stat.color} rounded-full`}
                style={{
                  animation: `sparkle 2s ease-in-out infinite ${index * 0.5 + 1}s`,
                }}
              />
            </div>
          </div>
        )
      })}

      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1) rotate(180deg); 
          }
        }
      `}</style>
    </div>
  )
}
