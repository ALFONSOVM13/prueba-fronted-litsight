import React from "react";
import { TypeBadge } from "./TypeBadge";
import { typeEffectiveness } from "@/constants/typeEffectiveness";

interface TypeEffectivenessProps {
  types: Array<{ type: { name: string } }>;
}

export const TypeEffectiveness: React.FC<TypeEffectivenessProps> = ({ types }) => {
  const calculateTypeEffectiveness = () => {
    const weaknesses = new Set<string>();
    const resistances = new Set<string>();
    const immunities = new Set<string>();

    types.forEach(({ type }) => {
      const effectiveness = typeEffectiveness[type.name];
      effectiveness.weak.forEach((t) => weaknesses.add(t));
      effectiveness.resistant.forEach((t) => resistances.add(t));
      effectiveness.immune.forEach((t) => immunities.add(t));
    });

    for (const type of weaknesses) {
      if (resistances.has(type)) {
        weaknesses.delete(type);
        resistances.delete(type);
      }
    }

    return {
      weaknesses: Array.from(weaknesses),
      resistances: Array.from(resistances),
      immunities: Array.from(immunities),
    };
  };

  const { weaknesses, resistances, immunities } = calculateTypeEffectiveness();

  return (
    <div className="border-t pt-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Efectividad de Tipos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <h4 className="text-sm text-gray-600 mb-2">Daño normal de</h4>
          <div className="flex flex-wrap gap-2">
            {Object.keys(typeEffectiveness)
              .filter(
                (type) =>
                  !weaknesses.includes(type) &&
                  !resistances.includes(type) &&
                  !immunities.includes(type)
              )
              .map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm text-gray-600 mb-2">Débil contra</h4>
          <div className="flex flex-wrap gap-2">
            {weaknesses.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm text-gray-600 mb-2">Resistente a</h4>
          <div className="flex flex-wrap gap-2">
            {resistances.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>

        {immunities.length > 0 && (
          <div>
            <h4 className="text-sm text-gray-600 mb-2">Inmune a</h4>
            <div className="flex flex-wrap gap-2">
              {immunities.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 