import { BoltIcon, PokeballIcon } from "@/icons/Icons";
import Link from "next/link";
import { Waves } from "../ui/Waves";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <section className="main-container" aria-label="Hero section">
        <div className="content-container">
          <div className="pokemon-data" role="presentation">
            <div className="max-w-[26.13rem] max-[1150px]:max-w-[37.5rem] max-[1150px]:text-center max-[500px]:text-left">
              <h1 className="text-[4rem] text-light leading-[135%] font-bold uppercase max-[500px]:text-[3rem]">
                POKEDEX KANTO
              </h1>
              <p className="text-base text-gray-200 leading-[150%] font-normal mb-6">
                Descubre los Pokémon de la primera generación con toda su
                información y características al instante.
              </p>

              <Link
                href="https://pokeapi.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="button-details"
                aria-label="Visitar PokéAPI para más información"
              >
                <BoltIcon aria-hidden="true" />
                Ver más
              </Link>
            </div>
          </div>
          <div className="divider" role="presentation">
            <PokeballIcon aria-hidden="true" />
          </div>
          <div className="pokemon-image" role="img" aria-label="Mapa de la región de Kanto">
            <Image
              src="/images/kanto.webp"
              width={500}
              height={500}
              alt="Pokedex Kanto"
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </section>
      <Waves />
    </>
  );
}
