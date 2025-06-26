import { Pokemon, PokemonListResponse } from '../types/pokemon';

/**
 * URL base de la API de Pokémon
 */
const API_URL = process.env.NEXT_PUBLIC_POKEMON_API_URL;

/**
 * Límite de Pokémon originales a obtener
 */
const TOTAL_ORIGINAL_POKEMON = process.env.NEXT_PUBLIC_POKEMON_LIMIT;

/**
 * Caché para almacenar temporalmente los datos de Pokémon
 */
const pokemonCache: Map<string, Pokemon> = new Map();

/**
 * Tipos para el manejo de filtros y ordenamiento
 */
export type SortOrder = 'asc' | 'desc';

export interface PokemonFilters {
    types?: string[];
    minWeight?: number;
    maxWeight?: number;
    minHeight?: number;
    maxHeight?: number;
    search?: string;
}

export interface PokemonSortOptions {
    field: keyof Pokemon;
    order: SortOrder;
}

export interface PaginationOptions {
    page: number;
    pageSize: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    totalPages: number;
    currentPage: number;
}

/**
 * Servicio para gestionar las operaciones relacionadas con Pokémon
 */
export const PokemonService = {
    /**
     * Obtiene la lista completa de Pokémon con sus detalles
     * @returns Promise<Pokemon[]> Array de Pokémon con sus detalles completos
     * @throws Error si hay un problema con la petición a la API
     */
    getPokemonList: async (): Promise<Pokemon[]> => {
        try {
            const response = await fetch(`${API_URL}?limit=${TOTAL_ORIGINAL_POKEMON}`);
            
            if (!response.ok) {
                throw new Error(`Error al obtener la lista de Pokémon: ${response.status}`);
            }

            const data: PokemonListResponse = await response.json();
            
            const pokemonList: Pokemon[] = [];
            for (let i = 0; i < data.results.length; i += 10) {
                const batch = data.results.slice(i, i + 10);
                const batchResults = await Promise.all(
                    batch.map(pokemon => PokemonService.getPokemon(pokemon.name))
                );
                pokemonList.push(...batchResults);
            }

            return pokemonList;
        } catch (error) {
            console.error('Error en getPokemonList:', error);
            throw new Error('No se pudo obtener la lista de Pokémon');
        }
    },

    /**
     * Obtiene los detalles de un Pokémon específico
     * @param name Nombre del Pokémon a buscar
     * @returns Promise<Pokemon> Detalles del Pokémon
     * @throws Error si hay un problema con la petición a la API
     */
    getPokemon: async (name: string): Promise<Pokemon> => {
        try {
            const cachedPokemon = pokemonCache.get(name);
            if (cachedPokemon) {
                return cachedPokemon;
            }

            const response = await fetch(`${API_URL}/${name.toLowerCase()}`);
            
            if (!response.ok) {
                throw new Error(`Error al obtener el Pokémon ${name}: ${response.status}`);
            }

            const data: Pokemon = await response.json();
            
            pokemonCache.set(name, data);
            
            return data;
        } catch (error) {
            console.error(`Error al obtener el Pokémon ${name}:`, error);
            throw new Error(`No se pudo obtener la información del Pokémon ${name}`);
        }
    },

    /**
     * Filtra la lista de Pokémon según los criterios especificados
     * @param pokemonList Lista completa de Pokémon
     * @param filters Filtros a aplicar
     * @returns Pokemon[] Lista filtrada de Pokémon
     */
    filterPokemon: (pokemonList: Pokemon[], filters: PokemonFilters): Pokemon[] => {
        return pokemonList.filter(pokemon => {
            if (filters.types?.length) {
                const hasType = pokemon.types.some(type => 
                    filters.types!.includes(type.type.name)
                );
                if (!hasType) return false;
            }

            if (filters.minWeight !== undefined && pokemon.weight < filters.minWeight) {
                return false;
            }

            if (filters.maxWeight !== undefined && pokemon.weight > filters.maxWeight) {
                return false;
            }

            if (filters.minHeight !== undefined && pokemon.height < filters.minHeight) {
                return false;
            }

            if (filters.maxHeight !== undefined && pokemon.height > filters.maxHeight) {
                return false;
            }

            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                return pokemon.name.toLowerCase().includes(searchTerm) ||
                    pokemon.types.some(type => type.type.name.toLowerCase().includes(searchTerm));
            }

            return true;
        });
    },

    /**
     * Ordena la lista de Pokémon según el campo y orden especificados
     * @param pokemonList Lista de Pokémon a ordenar
     * @param sortOptions Opciones de ordenamiento
     * @returns Pokemon[] Lista ordenada de Pokémon
     */
    sortPokemon: (pokemonList: Pokemon[], sortOptions: PokemonSortOptions): Pokemon[] => {
        return [...pokemonList].sort((a, b) => {
            const aValue = a[sortOptions.field];
            const bValue = b[sortOptions.field];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortOptions.order === 'asc' 
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortOptions.order === 'asc' 
                    ? aValue - bValue
                    : bValue - aValue;
            }

            return 0;
        });
    },

    /**
     * Pagina la lista de Pokémon
     * @param pokemonList Lista de Pokémon a paginar
     * @param paginationOptions Opciones de paginación
     * @returns PaginatedResponse<Pokemon> Respuesta paginada
     */
    paginatePokemon: (
        pokemonList: Pokemon[], 
        paginationOptions: PaginationOptions
    ): PaginatedResponse<Pokemon> => {
        const { page, pageSize } = paginationOptions;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return {
            data: pokemonList.slice(startIndex, endIndex),
            total: pokemonList.length,
            totalPages: Math.ceil(pokemonList.length / pageSize),
            currentPage: page
        };
    },

    /**
     * Obtiene una lista filtrada, ordenada y paginada de Pokémon
     * @param filters Filtros a aplicar
     * @param sortOptions Opciones de ordenamiento
     * @param paginationOptions Opciones de paginación
     * @returns Promise<PaginatedResponse<Pokemon>> Lista procesada de Pokémon
     */
    getProcessedPokemonList: async (
        filters: PokemonFilters = {},
        sortOptions?: PokemonSortOptions,
        paginationOptions: PaginationOptions = { page: 1, pageSize: 20 }
    ): Promise<PaginatedResponse<Pokemon>> => {
        try {
            let pokemonList = await PokemonService.getPokemonList();
            
            // Aplicar filtros
            pokemonList = PokemonService.filterPokemon(pokemonList, filters);
            
            // Aplicar ordenamiento
            if (sortOptions) {
                pokemonList = PokemonService.sortPokemon(pokemonList, sortOptions);
            }
            
            // Aplicar paginación
            return PokemonService.paginatePokemon(pokemonList, paginationOptions);
        } catch (error) {
            console.error('Error en getProcessedPokemonList:', error);
            throw new Error('No se pudo procesar la lista de Pokémon');
        }
    }
};