"use client"

import { getTypeStyles } from "@/utils/styleUtils"

interface PokemonTitleProps {
  id: number
  name: string
  typeId: string
}

export function PokemonTitle({ id, name, typeId }: PokemonTitleProps) {
  const typeStyles = getTypeStyles(typeId)
  const formattedId = id.toString().padStart(3, "0")

  return (
    <div className="relative mb-6 group">
      {/* Resplandor de fondo */}
      <div
        className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-2xl"
        style={{
          background: `radial-gradient(ellipse 80% 50%, ${typeStyles.backgroundColor}40, transparent 70%)`,
          transform: "scaleY(0.3)",
        }}
      />

      {/* Contenedor principal */}
      <div className="relative z-10 text-center">
        {/* Número del Pokemon */}
        <div className="relative inline-block mb-2">
          <span
            className="text-lg sm:text-xl font-mono font-bold px-4 py-1 rounded-full border-2 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${typeStyles.backgroundColor}20, ${typeStyles.backgroundColor}40)`,
              borderColor: typeStyles.backgroundColor,
              color: typeStyles.backgroundColor,
            }}
          >
            #{formattedId}
          </span>

          {/* Brillo en el número */}
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: `linear-gradient(45deg, transparent 30%, ${typeStyles.backgroundColor}60 50%, transparent 70%)`,
              animation: "shimmer 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Nombre del Pokemon */}
        <h2 className="relative">
          {/* Sombra del texto */}
          <span
            className="absolute inset-0 text-3xl sm:text-4xl lg:text-5xl font-bold capitalize blur-sm opacity-30 transition-all duration-300 group-hover:opacity-50"
            style={{ color: typeStyles.backgroundColor }}
          >
            {name}
          </span>

          {/* Texto principal */}
          <span className="relative text-3xl sm:text-4xl lg:text-5xl font-bold capitalize text-gray-800 group-hover:text-gray-900 transition-all duration-300 group-hover:scale-105">
            {name}
          </span>

          {/* Efecto de brillo en el texto */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12"
            style={{
              animation: "textShine 3s ease-in-out infinite",
              backgroundSize: "200% 100%",
            }}
          />
        </h2>

        {/* Línea decorativa */}
        <div className="mt-4 flex justify-center">
          <div className="relative">
            <div
              className="h-1 w-24 rounded-full transition-all duration-500 group-hover:w-32"
              style={{
                background: `linear-gradient(90deg, transparent, ${typeStyles.backgroundColor}, transparent)`,
              }}
            />
            <div
              className="absolute inset-0 h-1 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-sm"
              style={{
                background: `linear-gradient(90deg, transparent, ${typeStyles.backgroundColor}, transparent)`,
              }}
            />
          </div>
        </div>

        {/* Partículas decorativas */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div
            className="absolute top-0 left-1/4 w-2 h-2 rounded-full"
            style={{
              background: typeStyles.backgroundColor,
              animation: "float 4s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full"
            style={{
              background: typeStyles.backgroundColor,
              animation: "float 4s ease-in-out infinite 1s",
            }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-1 h-1 rounded-full"
            style={{
              background: typeStyles.backgroundColor,
              animation: "float 4s ease-in-out infinite 2s",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 rounded-full"
            style={{
              background: typeStyles.backgroundColor,
              animation: "float 4s ease-in-out infinite 3s",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes textShine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.7; 
          }
          50% { 
            transform: translateY(-15px) rotate(180deg); 
            opacity: 1; 
          }
        }
      `}</style>
    </div>
  )
}
