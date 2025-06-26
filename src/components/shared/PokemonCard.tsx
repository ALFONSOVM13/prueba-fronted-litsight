"use client"

import { POKEMON_TYPES } from "@/constants/pokemonTypes";
import { Pokemon } from "@/types/pokemon";
import { Weight, Ruler, Zap, Sparkles } from 'lucide-react';
import { SkeletonLoading } from "./SkeletonLoading";
import { PokemonType } from "./PokemonType";

type PokemonCardProps = {
  pokemon: Pokemon;
  setModal: (value: boolean) => void;
  setPokemonData: (data: Pokemon) => void;
};

export const PokemonCard = ({
  pokemon,
  setModal,
  setPokemonData,
}: PokemonCardProps) => {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
  const backgroundColor = POKEMON_TYPES.find(
    (type) => type.id === pokemon.types[0].type.name
  )?.backgroundColor;

  const formatPokemonId = (id: number) => {
    if (id < 10) return `#00${id}`;
    else if (id >= 10 && id < 99) return `#0${id}`;
    else return `#${id}`;
  };

  const handleCardClick = () => {
    setPokemonData(pokemon);
    setModal(true);
  };

  return (
    <div
      className="group w-full max-w-sm mx-auto flex flex-col items-center relative 
                 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95
                 backdrop-blur-xl border border-slate-700/50 
                 rounded-3xl pt-24 pb-0 
                 hover:scale-105 hover:border-slate-500/70
                 transition-all duration-500 ease-out
                 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]
                 cursor-pointer animate-fadeDown mt-10"
      onClick={handleCardClick}
    >
      <div
        className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-all duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${backgroundColor}60 0%, transparent 75%)`,
        }}
      />

      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-500 rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${backgroundColor}40 0%, transparent 100%)`,
          mixBlendMode: "overlay"
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10 transform-gpu group-hover:-translate-y-2 transition-transform duration-500">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <SkeletonLoading src={imgUrl} alt={pokemon.name} />
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 rounded-full opacity-40 blur-xl transition-all duration-500 group-hover:opacity-60 group-hover:w-36"
            style={{ backgroundColor }}
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full px-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-yellow-400/80 group-hover:text-yellow-400 transition-colors duration-300" />
          <span className="text-lg font-bold text-slate-400 tracking-wider group-hover:text-slate-300 transition-colors duration-300">
            {formatPokemonId(pokemon.id)}
          </span>
        </div>

        <h2 className="text-2xl font-bold capitalize text-center mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300 group-hover:scale-105 transition-all duration-300">
          {pokemon.name}
        </h2>

        <div className="flex gap-2 mb-8">
          {pokemon.types.map(({ type }) => (
            <PokemonType key={type.name} type={type.name} tabIndex={false} />
          ))}
        </div>

        <div className="flex gap-8 mb-8 w-full justify-center">
          <div className="flex flex-col items-center group/stat">
            <div
              className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 
                         group-hover/stat:bg-slate-700/50 group-hover/stat:border-slate-600/50 
                         transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/stat:translate-x-full transition-transform duration-700" />
              <Weight className="w-5 h-5 text-white" />
              <span className="font-bold text-white text-sm">{`${pokemon.weight / 10} kg`}</span>
            </div>
            <span className="text-xs text-white mt-2 font-medium group-hover/stat:text-slate-300 transition-colors duration-300">
              Peso
            </span>
          </div>

          <div className="flex flex-col items-center group/stat">
            <div
              className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 
                         group-hover/stat:bg-slate-700/50 group-hover/stat:border-slate-600/50 
                         transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/stat:translate-x-full transition-transform duration-700" />
              <Ruler className="w-5 h-5 text-white" />
              <span className="font-bold text-white text-sm">{`${pokemon.height / 10} m`}</span>
            </div>
            <span className="text-xs text-white mt-2 font-medium group-hover/stat:text-slate-300 transition-colors duration-300">
              Altura
            </span>
          </div>
        </div>
      </div>

      <button
        className="w-full h-16 flex justify-center items-center gap-3 
                   text-base font-bold text-white rounded-b-3xl
                   relative overflow-hidden group/button
                   hover:shadow-lg transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${backgroundColor}90 0%, ${backgroundColor} 100%)`,
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleCardClick();
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                     -translate-x-full group-hover/button:translate-x-full transition-transform duration-700"
        />
        <div className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(45deg, transparent, ${backgroundColor}40, transparent)`,
          }}
        />

        <Zap className="w-5 h-5 group-hover/button:rotate-12 transition-transform duration-300" />
        <span className="relative z-10 tracking-wide">Más Detalles</span>
      </button>

      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/20 animate-pulse" />
      <div className="absolute top-6 right-6 w-1 h-1 rounded-full bg-white/30 animate-pulse delay-300" />
      <div className="absolute top-8 right-8 w-0.5 h-0.5 rounded-full bg-white/40 animate-pulse delay-500" />
    </div>
  );
};
