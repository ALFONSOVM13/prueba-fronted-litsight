import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Button from '../ui/Button';

/**
 * Props para el componente de paginación
 * @interface PaginationProps
 */
interface PaginationProps {
  /** Número de página actual */
  currentPage: number;
  /** Número total de páginas */
  totalPages: number;
  /** Función callback que se ejecuta al cambiar de página
   * @param page - Número de página seleccionado
   */
  onPageChange: (page: number) => void;
}

/**
 * Componente de paginación responsivo que permite navegar entre páginas de contenido.
 * Se adapta a diferentes tamaños de pantalla y proporciona una experiencia de usuario accesible.
 * 
 * @component
 * @param {PaginationProps} props - Props del componente
 * @returns {JSX.Element} Componente de paginación renderizado
 */
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  /**
   * Calcula el rango de páginas que se debe mostrar basado en la página actual
   * y el ancho de la pantalla.
   * 
   * @returns {number[]} Array con los números de página a mostrar
   */
  const getPageRange = () => {
    const range: number[] = [];
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5; 
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    if (end === totalPages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    return range;
  };

  return (
    <nav className="mt-8 flex flex-wrap justify-center items-center gap-2 px-4" aria-label="Paginación">
      {/* Botón Inicio */}
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        variant="primary"
        size="sm"
        className="hidden sm:flex"
        aria-label="Ir a la primera página"
        leftIcon={<ChevronsLeft className="h-5 w-5" />}
      />

      {/* Botón Anterior */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="primary"
        size="sm"
        aria-label="Página anterior"
        leftIcon={<ChevronLeft className="h-5 w-5" />}
      >
        <span className="hidden sm:inline">Anterior</span>
      </Button>

      {/* Números de página */}
      <div className="flex gap-1">
        {getPageRange().map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            variant={currentPage === page ? 'primary' : 'ghost'}
            size="sm"
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* Botón Siguiente */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="primary"
        size="sm"
        aria-label="Página siguiente"
        rightIcon={<ChevronRight className="h-5 w-5" />}
      >
        <span className="hidden sm:inline">Siguiente</span>
      </Button>

      {/* Botón Final */}
      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        variant="primary"
        size="sm"
        className="hidden sm:flex"
        aria-label="Ir a la última página"
        rightIcon={<ChevronsRight className="h-5 w-5" />}
      />

      {/* Información de página (visible solo en móvil) */}
      <div className="w-full sm:hidden text-center text-sm text-gray-600 mt-2">
        Página {currentPage} de {totalPages}
      </div>
    </nav>
  );
} 