# Componente de Paginación

## Descripción
El componente `Pagination` es una interfaz de usuario responsiva que permite la navegación entre páginas de contenido. Está diseñado para proporcionar una experiencia de usuario intuitiva tanto en dispositivos móviles como de escritorio.

## Props
El componente acepta las siguientes propiedades:

- `currentPage` (number): La página actual que se está mostrando
- `totalPages` (number): El número total de páginas disponibles
- `onPageChange` (function): Función callback que se ejecuta cuando se selecciona una nueva página

## Características

### Diseño Responsivo
- En pantallas grandes (≥640px):
  - Muestra 5 números de página
  - Incluye botones "Inicio" y "Final"
  - Muestra texto "Anterior" y "Siguiente" junto a las flechas

- En pantallas pequeñas (<640px):
  - Muestra 3 números de página
  - Oculta botones "Inicio" y "Final"
  - Solo muestra iconos de flechas para navegación
  - Añade un indicador de "Página X de Y" en la parte inferior

### Accesibilidad
- Implementa atributos ARIA para mejorar la accesibilidad:
  - `aria-label` para la navegación
  - `aria-current="page"` para la página actual
  - `aria-label` descriptivos en los botones de navegación

### Estilos
- Utiliza una combinación de colores rojo/gris para indicar estados
- Los botones tienen estados hover y disabled claramente diferenciados
- Diseño consistente con bordes redondeados y espaciado uniforme

### Navegación
- Botones de navegación rápida (Inicio/Final)
- Botones de navegación secuencial (Anterior/Siguiente)
- Selección directa de página mediante números
- Cálculo dinámico del rango de páginas visible

## Ejemplo de Uso

```tsx
<Pagination 
  currentPage={1} 
  totalPages={10} 
  onPageChange={(page) => handlePageChange(page)} 
/>
``` 