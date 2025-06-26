"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { Pokemon } from "@/types/pokemon";
import { Eye, ChevronUp, ChevronDown } from 'lucide-react';
import Image from "next/image";
import Button from "../ui/Button";
import { POKEMON_TYPES } from "@/constants/pokemonTypes";

interface PokemonTableProps {
  data: Pokemon[];
  onViewDetails: (pokemon: Pokemon) => void;
  sorting: SortingState;
  onSortingChange: (updater: SortingState | ((old: SortingState) => SortingState)) => void;
}

const columnHelper = createColumnHelper<Pokemon>();

export function PokemonTable({ data, onViewDetails, sorting, onSortingChange }: PokemonTableProps) {
  const columns = [
    columnHelper.accessor("sprites.front_default", {
      id: "image",
      header: "Imagen",
      cell: (info) => (
        <div className="flex justify-center">
          <Image
            src={info.getValue() || "/placeholder.svg"}
            alt="Pokemon"
            width={48}
            height={48}
            className="rounded-lg w-12 h-12 sm:w-[60px] sm:h-[60px]"
          />
        </div>
      ),
      enableSorting: false,
    }),
    columnHelper.accessor("id", {
      header: "Número",
      cell: (info) => (
        <span className="font-medium text-xs sm:text-sm">#{String(info.getValue()).padStart(3, '0')}</span>
      ),
    }),
    columnHelper.accessor("name", {
      header: "Nombre",
      cell: (info) => (
        <span className="font-medium capitalize text-xs sm:text-sm">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("types", {
      header: "Tipos",
      cell: (info) => (
        <div className="flex flex-wrap gap-1">
          {info.getValue().map((type: any, index: number) => {
            const typeInfo = POKEMON_TYPES.find(t => t.id === type.type.name);
            return (
              <span
                key={index}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs capitalize"
                style={{
                  backgroundColor: typeInfo?.backgroundColor || '#A8A878',
                  color: typeInfo?.color || '#FFFFFF'
                }}
              >
                {type.type.name}
              </span>
            );
          })}
        </div>
      ),
      sortingFn: (rowA, rowB) => {
        const typeA = rowA.original.types[0]?.type.name || "";
        const typeB = rowB.original.types[0]?.type.name || "";
        return typeA.localeCompare(typeB);
      },
    }),
    columnHelper.accessor("weight", {
      header: "Peso (kg)",
      cell: (info) => (
        <span className="text-xs sm:text-sm">{`${(info.getValue() / 10).toFixed(1)} kg`}</span>
      ),
    }),
    columnHelper.accessor("height", {
      header: "Altura (m)",
      cell: (info) => (
        <span className="text-xs sm:text-sm">{`${(info.getValue() / 10).toFixed(1)} m`}</span>
      ),
    }),
    columnHelper.accessor("stats", {
      id: "hp",
      header: "Salud Base",
      cell: (info) => {
        const hpStat = info.getValue().find((stat: any) => stat.stat.name === "hp");
        return hpStat?.base_stat || 0;
      },
      sortingFn: (rowA, rowB) => {
        const hpA = rowA.original.stats.find((stat: any) => stat.stat.name === "hp")?.base_stat || 0;
        const hpB = rowB.original.stats.find((stat: any) => stat.stat.name === "hp")?.base_stat || 0;
        return hpA - hpB;
      },
    }),
    columnHelper.accessor("base_experience", {
      header: "Experiencia Base",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.accessor("stats", {
      id: "attack",
      header: "Ataque Base",
      cell: (info) => {
        const attackStat = info.getValue().find((stat: any) => stat.stat.name === "attack");
        return attackStat?.base_stat || 0;
      },
      sortingFn: (rowA, rowB) => {
        const attackA = rowA.original.stats.find((stat: any) => stat.stat.name === "attack")?.base_stat || 0;
        const attackB = rowB.original.stats.find((stat: any) => stat.stat.name === "attack")?.base_stat || 0;
        return attackA - attackB;
      },
    }),
    columnHelper.accessor("stats", {
      id: "defense",
      header: "Defensa Base",
      cell: (info) => {
        const defenseStat = info.getValue().find((stat: any) => stat.stat.name === "defense");
        return defenseStat?.base_stat || 0;
      },
      sortingFn: (rowA, rowB) => {
        const defenseA = rowA.original.stats.find((stat: any) => stat.stat.name === "defense")?.base_stat || 0;
        const defenseB = rowB.original.stats.find((stat: any) => stat.stat.name === "defense")?.base_stat || 0;
        return defenseA - defenseB;
      },
    }),
    columnHelper.accessor("stats", {
      id: "special-attack",
      header: "Ataque Especial",
      cell: (info) => {
        const specialAttackStat = info.getValue().find((stat: any) => stat.stat.name === "special-attack");
        return specialAttackStat?.base_stat || 0;
      },
      sortingFn: (rowA, rowB) => {
        const specialAttackA = rowA.original.stats.find((stat: any) => stat.stat.name === "special-attack")?.base_stat || 0;
        const specialAttackB = rowB.original.stats.find((stat: any) => stat.stat.name === "special-attack")?.base_stat || 0;
        return specialAttackA - specialAttackB;
      },
    }),
    columnHelper.accessor("stats", {
      id: "special-defense",
      header: "Defensa Especial",
      cell: (info) => {
        const specialDefenseStat = info.getValue().find((stat: any) => stat.stat.name === "special-defense");
        return specialDefenseStat?.base_stat || 0;
      },
      sortingFn: (rowA, rowB) => {
        const specialDefenseA = rowA.original.stats.find((stat: any) => stat.stat.name === "special-defense")?.base_stat || 0;
        const specialDefenseB = rowB.original.stats.find((stat: any) => stat.stat.name === "special-defense")?.base_stat || 0;
        return specialDefenseA - specialDefenseB;
      },
    }),
    columnHelper.accessor("stats", {
      id: "speed",
      header: "Velocidad",
      cell: (info) => {
        const speedStat = info.getValue().find((stat: any) => stat.stat.name === "speed");
        return speedStat?.base_stat || 0;
      },
      sortingFn: (rowA, rowB) => {
        const speedA = rowA.original.stats.find((stat: any) => stat.stat.name === "speed")?.base_stat || 0;
        const speedB = rowB.original.stats.find((stat: any) => stat.stat.name === "speed")?.base_stat || 0;
        return speedA - speedB;
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Acciones",
      cell: (info) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(info.row.original)}
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-1 px-2 sm:px-3"
        >
          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Ver detalles</span>
          <span className="sm:hidden">Ver</span>
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange,
    state: {
      sorting,
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                return (
                  <th
                    key={header.id}
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    className={`px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 
                               ${canSort ? 'cursor-pointer select-none' : ''}`}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {canSort && (
                        <span className="inline-flex flex-col">
                          <ChevronUp
                            className={`w-3 h-3 -mb-0.5 ${
                              header.column.getIsSorted() === "asc"
                                ? "text-gray-900"
                                : "text-gray-400"
                            }`}
                          />
                          <ChevronDown
                            className={`w-3 h-3 -mt-0.5 ${
                              header.column.getIsSorted() === "desc"
                                ? "text-gray-900"
                                : "text-gray-400"
                            }`}
                          />
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
