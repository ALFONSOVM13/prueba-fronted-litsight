import { POKEMON_TYPES } from "@/constants/pokemonTypes";
import { Heart, Shield, Swords, Zap } from "lucide-react";
import React from "react";

interface BaseStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface BaseStatsProps {
  stats: BaseStat[];
  baseType: string;
}

const statIcons: Record<string, React.ReactNode> = {
  hp: <Heart className="w-4 h-4" />,
  attack: <Swords className="w-4 h-4" />,
  defense: <Shield className="w-4 h-4" />,
  "special-attack": <Zap className="w-4 h-4" />,
  "special-defense": <Shield className="w-4 h-4" />,
  speed: <Zap className="w-4 h-4" />,
};

const getTypeColor = (typeName: string) => {
  const typeInfo = POKEMON_TYPES.find((t) => t.id === typeName);
  return typeInfo?.backgroundColor || '#A8A878';
};

export const BaseStats: React.FC<BaseStatsProps> = ({ stats, baseType }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Estadísticas Base</h3>
      {stats.map((stat) => (
        <div key={stat.stat.name} className="flex items-center gap-4">
          <div className="flex items-center gap-3 w-36">
            <div
              className="p-2 rounded-lg text-light"
              style={{ backgroundColor: getTypeColor(baseType) }}
            >
              {statIcons[stat.stat.name]}
            </div>
            <span className="text-sm font-medium capitalize text-gray-700">
              {stat.stat.name === "hp" ? "PS" :
               stat.stat.name === "attack" ? "Ataque" :
               stat.stat.name === "defense" ? "Defensa" :
               stat.stat.name === "special-attack" ? "At. Especial" :
               stat.stat.name === "special-defense" ? "Def. Especial" :
               stat.stat.name === "speed" ? "Velocidad" :
               stat.stat.name.replace("-", " ")}
            </span>
          </div>
          <div className="flex-1">
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-700 ease-out ${
                  stat.base_stat < 50
                    ? "bg-red-500"
                    : stat.base_stat < 80
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${Math.min((stat.base_stat / 200) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
          <span className="w-12 text-right font-bold text-gray-800">
            {stat.base_stat}
          </span>
        </div>
      ))}
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-3 w-36">
          <div
            className="p-2 rounded-lg text-light"
            style={{ backgroundColor: getTypeColor(baseType) }}
          >
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-gray-700">Total</span>
        </div>
        <div className="flex-1">
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-700 ease-out ${
                stats.reduce((acc, stat) => acc + stat.base_stat, 0) < 300
                  ? "bg-red-500"
                  : stats.reduce((acc, stat) => acc + stat.base_stat, 0) < 480
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{
                width: `${Math.min(
                  (stats.reduce((acc, stat) => acc + stat.base_stat, 0) / 720) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>
        <span className="w-12 text-right font-bold text-gray-800">
          {stats.reduce((acc, stat) => acc + stat.base_stat, 0)}
        </span>
      </div>
    </div>
  );
}; 