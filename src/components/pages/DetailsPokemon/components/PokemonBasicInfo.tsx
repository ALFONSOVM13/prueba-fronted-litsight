import React from "react";

interface PokemonBasicInfoProps {
  height: number;
  weight: number;
  baseExperience: number;
}

export const PokemonBasicInfo: React.FC<PokemonBasicInfoProps> = ({
  height,
  weight,
  baseExperience,
}) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="text-center p-4 bg-gray-50 rounded-2xl">
        <p className="text-sm text-gray-600 mb-1">Altura</p>
        <p className="text-2xl font-bold text-gray-800">{height / 10} m</p>
        <div className="text-sm text-gray-500 mt-1">
          ({(height * 3.28084).toFixed(2)} ft)
        </div>
      </div>
      <div className="text-center p-4 bg-gray-50 rounded-2xl">
        <p className="text-sm text-gray-600 mb-1">Peso</p>
        <p className="text-2xl font-bold text-gray-800">{weight / 10} kg</p>
        <div className="text-sm text-gray-500 mt-1">
          ({((weight / 10) * 2.20462).toFixed(2)} lbs)
        </div>
      </div>
      <div className="text-center p-4 bg-gray-50 rounded-2xl">
        <p className="text-sm text-gray-600 mb-1">Exp. Base</p>
        <p className="text-2xl font-bold text-gray-800">{baseExperience}</p>
      </div>
    </div>
  );
}; 