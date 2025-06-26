"use client"

import { getTypeStyles } from "@/utils/styleUtils"
import Image from "next/image"

interface PokemonImageProps {
  imageUrl: string
  name: string
  typeId: string
}

export function PokemonImage({ imageUrl, name, typeId }: PokemonImageProps) {
  const typeStyles = getTypeStyles(typeId)

  return (
    <div className="relative p-12 mb-6 group">
      <div
        className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-all duration-500 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${typeStyles.backgroundColor}60, transparent 70%)`,
          transform: "scale(0.8)",
        }}
      />

      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-4 rounded-full opacity-30 group-hover:opacity-50 transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${typeStyles.backgroundColor}80, transparent)`,
          filter: "blur(2px)",
        }}
      />

      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-56 h-12 rounded-full opacity-40 group-hover:opacity-60 transition-all duration-300"
        style={{
          background: `radial-gradient(ellipse 80% 100%, ${typeStyles.backgroundColor}70, ${typeStyles.backgroundColor}20 60%, transparent 80%)`,
          filter: "blur(8px)",
        }}
      />

      <div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-6 rounded-full opacity-25 group-hover:opacity-35 transition-all duration-300"
        style={{
          background: `radial-gradient(ellipse, ${typeStyles.backgroundColor}50, transparent 70%)`,
          filter: "blur(4px)",
        }}
      />

      <div className="relative z-10">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          width={280}
          height={280}
          className="mx-auto relative z-10 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 ease-out"
          style={{
            filter: `drop-shadow(0 15px 35px ${typeStyles.backgroundColor}30) drop-shadow(0 5px 15px ${typeStyles.backgroundColor}20)`,
          }}
        />

        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${typeStyles.backgroundColor}40, transparent 50%)`,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-pulse"
          style={{
            background: typeStyles.backgroundColor,
            animation: "float 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full animate-pulse"
          style={{
            background: typeStyles.backgroundColor,
            animation: "float 3s ease-in-out infinite 1s",
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full animate-pulse"
          style={{
            background: typeStyles.backgroundColor,
            animation: "float 3s ease-in-out infinite 2s",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
