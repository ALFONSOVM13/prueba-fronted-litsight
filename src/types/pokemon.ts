export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonBasicInfo[];
}

export interface PokemonBasicInfo {
    name: string;
    url: string;
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    stats: PokemonStat[];
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
            home: {
                front_default: string;
            };
        };
    };
    abilities: PokemonAbility[];
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonSprites {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other: {
        'official-artwork': {
            front_default: string;
            front_shiny: string;
        };
    };
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export interface EvolutionChain {
    name: string;
    id: number;
    min_level: number | null;
    trigger: string | null;
    item: string | null;
    evolutions: EvolutionChain[];
} 