/**
 * @fileoverview Componente que muestra los detalles completos de un Pokémon, incluyendo
 * información básica, estadísticas y cadena de evolución.
 */

import Button from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { POKEMON_TYPES } from "@/constants/pokemonTypes";
import { PokemonService } from "@/services/pokemonService";
import { EvolutionChain, Pokemon } from "@/types/pokemon";
import { cn } from "@/utils/cn";
import {
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { BaseStats } from "./components/BaseStats";
import { PokemonAbilities } from "./components/PokemonAbilities";
import { PokemonBasicInfo } from "./components/PokemonBasicInfo";
import { PokemonEvolutions } from "./components/PokemonEvolutions";
import { PokemonStats } from "./components/PokemonStats";
import { PokemonTypes } from "./components/PokemonTypes";
import { TypeEffectiveness } from "./components/TypeEffectiveness";

/**
 * Props para el componente PokemonDetail
 * @interface PokemonDetailProps
 * @property {Pokemon} pokemon - Objeto con la información completa del Pokémon a mostrar
 * @property {() => void} onClose - Función para cerrar el detalle del Pokémon
 * @property {() => void} onPrevious - Función para navegar al Pokémon anterior
 * @property {() => void} onNext - Función para navegar al siguiente Pokémon
 * @property {boolean} hasPrevious - Indica si existe un Pokémon anterior
 * @property {boolean} hasNext - Indica si existe un siguiente Pokémon
 * @property {Pokemon} [previousPokemon] - Información del Pokémon anterior (opcional)
 * @property {Pokemon} [nextPokemon] - Información del siguiente Pokémon (opcional)
 * @property {(newPokemon: Pokemon) => void} [onPokemonChange] - Callback cuando se cambia de Pokémon (opcional)
 */
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

/**
 * Obtiene el color de fondo correspondiente al tipo de Pokémon
 * @param {string} typeName - Nombre del tipo de Pokémon
 * @returns {string} Color en formato hexadecimal
 */
const getTypeColor = (typeName: string) => {
  const typeInfo = POKEMON_TYPES.find((t) => t.id === typeName);
  return typeInfo?.backgroundColor || '#A8A878';
};

/**
 * Componente que muestra una vista detallada de un Pokémon
 * @component
 * @param {PokemonDetailProps} props - Props del componente
 * @returns {React.ReactElement} Elemento React con el detalle del Pokémon
 */
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
  const [shouldAnimate, setShouldAnimate] = useState(true);

  /**
   * Efecto que controla el scroll del body cuando el modal está abierto
   */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  /**
   * Efecto que carga la cadena de evolución del Pokémon cuando cambia su ID
   */
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

  useEffect(() => {
    setShouldAnimate(true);
    const timer = setTimeout(() => setShouldAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [pokemon.id]);

  /**
   * Maneja el click en una evolución del Pokémon
   * @param {number} pokemonId - ID del Pokémon seleccionado en la cadena de evolución
   */
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
    <div className="fixed inset-0 bg-dark bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 z-50">
      <div className="bg-light overflow-hidden rounded-none md:rounded-3xl w-full h-full md:h-auto md:max-h-[95vh] max-w-6xl flex flex-col relative">
        <div
          style={{ backgroundColor: getTypeColor(baseType) }}
          className={`sticky top-0 z-20 px-8 py-4 flex justify-between items-center`}
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              <X className="w-6 h-6 text-light" />
            </Button>
            <h2 className="text-2xl font-bold text-light capitalize">
              {pokemon.name}
            </h2>
          </div>
          <p className="text-light text-xl font-bold">
            #{pokemon.id.toString().padStart(3, "0")}
          </p>
        </div>

        <div className="overflow-y-auto flex-1">
          <div
            style={{ background: `linear-gradient(to bottom, ${getTypeColor(baseType)}, ${getTypeColor(pokemon.types[1]?.type.name || '')})` }}
            className={`relative px-8 pt-6 pb-6`}
          >
            <div className="relative flex items-center justify-center h-80">
              {hasPrevious && (
                <>
                  <Button
                    variant="ghost"
                    onClick={onPrevious}
                    className="absolute left-0 md:left-32 top-1/2 transform -translate-y-1/2 !p-3 rounded-r-full md:rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors z-10"
                  >
                    <ChevronLeft className="w-8 h-8 text-light" />
                  </Button>
                  {previousPokemon && (
                    <div className="absolute left-0 md:left-24 top-1/3 transform -translate-y-1/2 opacity-20 transition-opacity duration-300 hover:opacity-40">
                      <img
                        src={previousPokemon.sprites.other["official-artwork"].front_default || previousPokemon.sprites.front_default}
                        alt={previousPokemon.name}
                        className="w-32 h-32 object-contain filter brightness-0 invert"
                      />
                    </div>
                  )}
                </>
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
                    className={`w-48 h-48 object-contain relative z-10 ${shouldAnimate ? 'animate-zoomIn' : ''}`}
                  />
                </div>
              </div>

              {hasNext && (
                <>
                  <Button
                    variant="ghost"
                    onClick={onNext}
                    className="absolute right-0 md:right-32 top-1/2 transform -translate-y-1/2 !p-3 rounded-l-full md:rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors z-10"
                  >
                    <ChevronRight className="w-8 h-8 text-light" />
                  </Button>
                  {nextPokemon && (
                    <div className="absolute right-0 md:right-24 top-1/3 transform -translate-y-1/2 opacity-20 transition-opacity duration-300 hover:opacity-40">
                      <img
                        src={nextPokemon.sprites.other["official-artwork"].front_default || nextPokemon.sprites.front_default}
                        alt={nextPokemon.name}
                        className="w-32 h-32 object-contain filter brightness-0 invert"
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            <nav className="relative flex flex-wrap justify-center gap-4 md:gap-12 text-light mb-4 px-4 md:px-0 border-b border-white/10">
              <div
                role="tab"
                tabIndex={0}
                onClick={() => setActiveTab("about")}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTab("about")}
                className={cn(
                  "cursor-pointer py-2",
                  "text-sm md:text-base font-medium",
                  "transition-colors duration-200",
                  "hover:text-white relative",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all after:duration-300",
                  activeTab === "about"
                    ? "text-white after:w-full"
                    : "text-white/70 after:w-0"
                )}
                aria-selected={activeTab === "about"}
                data-state={activeTab === "about" ? "active" : "inactive"}
              >
                Información básica
              </div>
              <div
                role="tab"
                tabIndex={0}
                onClick={() => setActiveTab("stats")}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTab("stats")}
                className={cn(
                  "cursor-pointer py-2",
                  "text-sm md:text-base font-medium",
                  "transition-colors duration-200",
                  "hover:text-white relative",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all after:duration-300",
                  activeTab === "stats"
                    ? "text-white after:w-full"
                    : "text-white/70 after:w-0"
                )}
                aria-selected={activeTab === "stats"}
                data-state={activeTab === "stats" ? "active" : "inactive"}
              >
                Estadísticas
              </div>
              <div
                role="tab"
                tabIndex={0}
                onClick={() => setActiveTab("evolution")}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTab("evolution")}
                className={cn(
                  "cursor-pointer py-2",
                  "text-sm md:text-base font-medium",
                  "transition-colors duration-200",
                  "hover:text-white relative",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all after:duration-300",
                  activeTab === "evolution"
                    ? "text-white after:w-full"
                    : "text-white/70 after:w-0"
                )}
                aria-selected={activeTab === "evolution"}
                data-state={activeTab === "evolution" ? "active" : "inactive"}
              >
                Evolución
              </div>
            </nav>
          </div>

          <div className="bg-white rounded-t-3xl -mt-8 relative w-full px-12 py-10">
            {activeTab === "about" && (
              <div className="space-y-8">
                <div className="bg-light p-6 rounded-2xl shadow-sm">
                  <h3 className="text-lg text-dark font-semibold mb-4">Tipos</h3>
                  <PokemonTypes types={pokemon.types} />
                </div>
                
                <PokemonBasicInfo
                  height={pokemon.height}
                  weight={pokemon.weight}
                  baseExperience={pokemon.base_experience}
                />

                  <PokemonAbilities abilities={pokemon.abilities} />
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
