import Button from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { POKEMON_TYPES } from "@/constants/pokemonTypes";
import { PokemonService } from "@/services/pokemonService";
import { EvolutionChain, Pokemon } from "@/types/pokemon";
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    Shield,
    Swords,
    X,
    Zap
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BaseStats } from "./components/BaseStats";
import { PokemonAbilities } from "./components/PokemonAbilities";
import { PokemonBasicInfo } from "./components/PokemonBasicInfo";
import { PokemonEvolutions } from "./components/PokemonEvolutions";
import { PokemonStats } from "./components/PokemonStats";
import { PokemonTypes } from "./components/PokemonTypes";
import { TypeEffectiveness } from "./components/TypeEffectiveness";

interface PokemonDetailProps {
  pokemon: Pokemon;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  previousPokemon?: Pokemon;
  nextPokemon?: Pokemon;
  onPokemonChange?: (newPokemon: Pokemon) => void;
}
const getTypeColor = (typeName: string) => {
  const typeInfo = POKEMON_TYPES.find((t) => t.id === typeName);
  return typeInfo?.backgroundColor || '#A8A878';
};

const PokemonDetail: React.FC<PokemonDetailProps> = ({
  pokemon,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  previousPokemon,
  nextPokemon,
  onPokemonChange,
}) => {
  const baseType = pokemon.types[0]?.type.name || "normal";
  const [activeTab, setActiveTab] = useState("about");
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [loadingEvolutions, setLoadingEvolutions] = useState(false);
  const [loadingPokemon, setLoadingPokemon] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const getEvolutionChain = async () => {
      if (pokemon.id) {
        setLoadingEvolutions(true);
        try {
          const chain = await PokemonService.getEvolutionChain(pokemon.id);
          setEvolutionChain(chain);
        } catch (error) {
          console.error("Error al cargar la cadena de evolución:", error);
        } finally {
          setLoadingEvolutions(false);
        }
      }
    };

    getEvolutionChain();
  }, [pokemon.id]);


  const handleEvolutionClick = async (pokemonId: number) => {
    if (pokemonId === pokemon.id) return;
    
    setLoadingPokemon(true);
    try {
      const newPokemon = await PokemonService.getPokemon(pokemonId.toString());
      if (onPokemonChange) {
        onPokemonChange(newPokemon);
      }
    } catch (error) {
      console.error("Error al cargar el Pokémon:", error);
    } finally {
      setLoadingPokemon(false);
    }
  };

  if (loadingPokemon) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 z-50">
      <div className="bg-white overflow-hidden rounded-none md:rounded-3xl w-full h-full md:h-auto md:max-h-[95vh] max-w-6xl flex flex-col relative">
        <div
          style={{ backgroundColor: getTypeColor(baseType) }}
          className={`sticky top-0 z-20 px-8 py-4 flex justify-between items-center`}
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              <X className="w-6 h-6 text-white" />
            </Button>
            <h2 className="text-2xl font-bold text-white capitalize">
              {pokemon.name}
            </h2>
          </div>
          <p className="text-white text-xl font-bold">
            #{pokemon.id.toString().padStart(3, "0")}
          </p>
        </div>

        <div className="overflow-y-auto flex-1">
          <div
            style={{ background: `linear-gradient(to bottom, ${getTypeColor(baseType)}, ${getTypeColor(pokemon.types[1]?.type.name || '')})` }}
            className={`relative px-8 pt-6 pb-6`}
          >
            <div className="relative flex items-center justify-center h-80">
              {hasPrevious && previousPokemon && (
                <div className="absolute left-8 md:left-8 top-1/2 transform -translate-y-1/2 opacity-20">
                  <img
                    src={
                      previousPokemon.sprites.other["official-artwork"]
                        .front_default || previousPokemon.sprites.front_default
                    }
                    alt={previousPokemon.name}
                    className="w-32 h-32 object-contain filter brightness-0"
                  />
                </div>
              )}

              {hasPrevious && (
                <Button
                  variant="ghost"
                  onClick={onPrevious}
                  className="absolute left-0 md:left-32 top-1/2 transform -translate-y-1/2 !p-3 rounded-r-full md:rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors z-10"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </Button>
              )}

              <div className="relative z-10">
                <div className="w-64 h-64 rounded-full bg-white bg-opacity-20 flex items-center justify-center relative">
                  <div className="absolute inset-4 rounded-full bg-white bg-opacity-10"></div>
                  <img
                    src={
                      pokemon.sprites.other["official-artwork"].front_default ||
                      pokemon.sprites.front_default
                    }
                    alt={pokemon.name}
                    className="w-48 h-48 object-contain relative z-10"
                  />
                </div>
              </div>

              {hasNext && (
                <Button
                  variant="ghost"
                  onClick={onNext}
                  className="absolute right-0 md:right-32 top-1/2 transform -translate-y-1/2 !p-3 rounded-l-full md:rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors z-10"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </Button>
              )}

              {hasNext && nextPokemon && (
                <div className="absolute right-8 md:right-8 top-1/2 transform -translate-y-1/2 opacity-20">
                  <img
                    src={
                      nextPokemon.sprites.other["official-artwork"]
                        .front_default || nextPokemon.sprites.front_default
                    }
                    alt={nextPokemon.name}
                    className="w-32 h-32 object-contain filter brightness-0"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center gap-8 text-white mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab("about")}
                className={`!pb-2 !px-4 font-semibold ${
                  activeTab === "about"
                    ? "border-b-2 border-white"
                    : "opacity-70"
                }`}
              >
                Información básica
              </Button>
              <Button
                variant="ghost"
                onClick={() => setActiveTab("stats")}
                className={`!pb-2 !px-4 font-semibold ${
                  activeTab === "stats"
                    ? "border-b-2 border-white"
                    : "opacity-70"
                }`}
              >
                Estadísticas
              </Button>
              <Button
                variant="ghost"
                onClick={() => setActiveTab("evolution")}
                className={`!pb-2 !px-4 font-semibold ${
                  activeTab === "evolution"
                    ? "border-b-2 border-white"
                    : "opacity-70"
                }`}
              >
                Evolución
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-t-3xl -mt-8 relative w-full px-12 py-10">
            {activeTab === "about" && (
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Tipos</h3>
                  <PokemonTypes types={pokemon.types} />
                </div>
                
                <PokemonBasicInfo
                  height={pokemon.height}
                  weight={pokemon.weight}
                  baseExperience={pokemon.base_experience}
                />

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <PokemonAbilities abilities={pokemon.abilities} />
                </div>
              </div>
            )}

            {activeTab === "stats" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <BaseStats stats={pokemon.stats} baseType={baseType} />
                  <div className="flex flex-col items-center">
                    <PokemonStats stats={pokemon.stats} />
                  </div>
                </div>

                <TypeEffectiveness types={pokemon.types} />
              </div>
            )}

            {activeTab === "evolution" && (
              <PokemonEvolutions
                evolutionChain={evolutionChain}
                isLoading={loadingEvolutions}
                pokemonName={pokemon.name}
                onEvolutionClick={handleEvolutionClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
