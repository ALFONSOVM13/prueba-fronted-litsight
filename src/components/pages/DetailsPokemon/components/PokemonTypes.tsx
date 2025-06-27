import React from 'react';
import Image from 'next/image';
import { POKEMON_TYPES } from "@/constants/pokemonTypes";

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonTypesProps {
  types: PokemonType[];
}

export const PokemonTypes: React.FC<PokemonTypesProps> = ({ types }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {types.map(({ type }) => {
        const typeInfo = POKEMON_TYPES.find((t) => t.id === type.name);
        return (
          <div
            key={type.name}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-white"
            style={{ backgroundColor: typeInfo?.backgroundColor || '#A8A878' }}
          >
            <Image
              src={`/icon/pokemonTypes/${type.name}.svg`}
              alt={`${type.name} type`}
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="capitalize">{type.name}</span>
          </div>
        );
      })}
    </div>
  );
}; 