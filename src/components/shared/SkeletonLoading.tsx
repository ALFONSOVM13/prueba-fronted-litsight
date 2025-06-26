"use client"

import { useState } from "react"

interface SkeletonLoadingProps {
  src: string
  alt: string
}

export const SkeletonLoading = ({ src, alt }: SkeletonLoadingProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="relative w-32 h-32">
      {isLoading && <div className="absolute inset-0 bg-slate-700/50 rounded-full animate-pulse" />}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`w-32 h-32 object-contain transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />
      {hasError && (
        <div className="absolute inset-0 bg-slate-700/50 rounded-full flex items-center justify-center">
          <span className="text-slate-400 text-xs">No image</span>
        </div>
      )}
    </div>
  )
}
