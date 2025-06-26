"use client"

import Image from "next/image"
import { useState } from "react"

type SkeletonLoadingProps = {
  src: string
  alt: string
}

export const SkeletonLoading = ({ src, alt }: SkeletonLoadingProps) => {
  const [skeleton, setSkeleton] = useState(true)

  return (
    <div className="relative w-32 h-32 grid place-items-center">
      {skeleton && (
        <div className="absolute inset-0 rounded-full animate-pulse">
          {/* Skeleton mejorado con gradiente animado */}
          <div
            className="w-full h-full rounded-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 
                         bg-[length:200%] animate-[shimmer_2s_ease-in-out_infinite]"
          />

          {/* Anillo de carga */}
          <div className="absolute inset-2 rounded-full border-2 border-slate-500/30 border-t-slate-400 animate-spin" />
        </div>
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={1080}
        height={1080}
        onLoad={() => setSkeleton(false)}
        className={`w-32 h-32 object-contain transition-all duration-500 ${
          skeleton ? "opacity-0 scale-90" : "opacity-100 scale-100"
        }`}
      />
    </div>
  )
}
