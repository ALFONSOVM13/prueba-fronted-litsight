"use client";

import type { EvolutionChain, Pokemon } from "@/types/pokemon";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PokemonService } from "@/services/pokemonService";
import { PokemonHeader } from "./components/PokemonHeader";
import { PokemonImage } from "./components/PokemonImage";
import { PokemonTypes } from "./components/PokemonTypes";
import { PokemonInfo } from "./components/PokemonInfo";
import { PokemonWeaknesses } from "./components/PokemonWeaknesses";
import { PokemonStats } from "./components/PokemonStats";
import { PokemonAbilities } from "./components/PokemonAbilities";
import { PokemonEvolutions } from "./components/PokemonEvolutions";
import { PokemonTitle } from "./components/PokemonTitle";

interface DetailsModalProps {
  pokemon: Pokemon;
  isOpen: boolean;
  onClose: () => void;
}

export function DetailsModal({ pokemon, isOpen, onClose }: DetailsModalProps) {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(
    null
  );
  const [isLoadingEvolutions, setIsLoadingEvolutions] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (isOpen && pokemon.id) {
        setIsLoadingEvolutions(true);
        try {
          const chain = await PokemonService.getEvolutionChain(pokemon.id);
          setEvolutionChain(chain);
        } catch (error) {
          console.error("Error al cargar la cadena de evolución:", error);
        } finally {
          setIsLoadingEvolutions(false);
        }
      }
    };

    fetchEvolutionChain();
  }, [isOpen, pokemon.id]);

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 25,
              duration: 0.2,
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/90 backdrop-blur-sm w-full h-full overflow-y-auto shadow-xl"
          >
            <PokemonHeader onClose={onClose} />

            <div className="p-4 sm:p-6 bg-white/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
                <div className="text-center">
                  <PokemonImage
                    imageUrl={pokemon.sprites.other.home.front_default}
                    name={pokemon.name}
                    typeId={pokemon.types[0].type.name}
                  />

                  <PokemonTitle
                    id={pokemon.id}
                    name={pokemon.name}
                    typeId={pokemon.types[0].type.name}
                  />
                  <PokemonTypes types={pokemon.types} />
                  <PokemonInfo
                    weight={pokemon.weight}
                    height={pokemon.height}
                    baseExperience={pokemon.base_experience}
                  />
                </div>

                <div className="bg-white/70 p-4 rounded-lg shadow-sm">
                  <PokemonWeaknesses types={pokemon.types} />
                  <PokemonStats stats={pokemon.stats} />
                </div>
              </div>

              <PokemonAbilities abilities={pokemon.abilities} />

              <PokemonEvolutions
                evolutionChain={evolutionChain}
                isLoading={isLoadingEvolutions}
                pokemonName={pokemon.name}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
