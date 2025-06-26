import { POKEMON_TYPES } from "@/constants/pokemonTypes";
import { Pokemon } from "@/types/pokemon";
import { SkeletonLoading } from "./SkeletonLoading";
import { PokemonType } from "./PokemonType";
import { Weight, Ruler, Zap, Sparkles } from "lucide-react";

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
                 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90
                 backdrop-blur-xl border border-slate-700/50 
                 rounded-3xl pt-20 pb-0 
                 hover:scale-105 hover:border-slate-600/70
                 transition-all duration-500 ease-out
                 shadow-2xl hover:shadow-3xl
                 cursor-pointer animate-fadeDown mt-10"
      onClick={handleCardClick}
    >
      {/* Gradiente de fondo dinámico */}
      <div
        className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${backgroundColor}40 0%, transparent 70%)`,
        }}
      />

      {/* Efecto de brillo superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Efecto blur de color */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full opacity-30 group-hover:opacity-50 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${backgroundColor}60 0%, ${backgroundColor}20 50%, transparent 100%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Imagen del Pokémon */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10 group-hover:-translate-y-2 transition-transform duration-500">
        <div className="relative">
          <SkeletonLoading src={imgUrl} alt={pokemon.name} />
          {/* Sombra de la imagen */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full opacity-30 blur-md"
            style={{ backgroundColor }}
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center w-full px-6">
        {/* Número del Pokémon */}
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-lg font-bold text-slate-300 tracking-wider">
            {formatPokemonId(pokemon.id)}
          </span>
        </div>

        {/* Nombre del Pokémon */}
        <h2
          className="text-2xl font-bold capitalize text-center mb-4 text-white 
                        group-hover:bg-clip-text 
                       group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300
                       transition-all duration-300"
        >
          {pokemon.name}
        </h2>

        <div className="flex gap-2 mb-6">
          {pokemon.types.map(({ type }) => (
            <PokemonType key={type.name} type={type.name} tabIndex={false} />
          ))}
        </div>

        <div className="flex gap-8 mb-6 w-full justify-center">
          <div className="flex flex-col items-center group/stat">
            <div
              className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 
                           group-hover/stat:bg-slate-700/50 group-hover/stat:border-slate-600/50 
                           transition-all duration-300"
            >
              <Weight className="w-5 h-5 text-slate-400" />
              <span className="font-bold text-white text-sm">{`${
                pokemon.weight / 10
              } kg`}</span>
            </div>
            <span className="text-xs text-slate-400 mt-2 font-medium">
              Peso
            </span>
          </div>

          <div className="flex flex-col items-center group/stat">
            <div
              className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 
                           group-hover/stat:bg-slate-700/50 group-hover/stat:border-slate-600/50 
                           transition-all duration-300"
            >
              <Ruler className="w-5 h-5 text-slate-400" />
              <span className="font-bold text-white text-sm">{`${
                pokemon.height / 10
              } m`}</span>
            </div>
            <span className="text-xs text-slate-400 mt-2 font-medium">
              Altura
            </span>
          </div>
        </div>
      </div>

      {/* Botón de Más Detalles mejorado */}
      <button
        className="w-full h-14 flex justify-center items-center gap-3 
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
        {/* Efecto de brillo en hover */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                       -translate-x-full group-hover/button:translate-x-full transition-transform duration-700"
        />

        <Zap className="w-5 h-5 group-hover/button:rotate-12 transition-transform duration-300" />
        <span className="relative z-10">Más Detalles</span>
      </button>

      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/20" />
      <div className="absolute top-6 right-6 w-1 h-1 rounded-full bg-white/30" />
    </div>
  );
};
