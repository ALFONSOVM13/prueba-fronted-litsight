import Image from "next/image";
import React from "react";
import { POKEMON_TYPES } from "@/constants/pokemonTypes";

interface TypeBadgeProps {
  type: string;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const typeInfo = POKEMON_TYPES.find((t) => t.id === type);
  return (
    <div
      className="flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm capitalize"
      style={{ backgroundColor: typeInfo?.backgroundColor || '#A8A878' }}
    >
      <Image
        src={`/icon/pokemonTypes/${type}.svg`}
        alt={`${type} type`}
        width={16}
        height={16}
        className="w-4 h-4"
      />
      <span>{type}</span>
    </div>
  );
}; 