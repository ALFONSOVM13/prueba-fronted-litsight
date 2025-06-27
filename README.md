# 🚀 Pokémon Explorer

Aplicación web desarrollada con **Next.js** que permite explorar los Pokémon de la primera generación (del 1 al 151) utilizando datos de la **[PokéAPI](https://pokeapi.co/)**. Los usuarios pueden consultar información detallada de cada Pokémon, incluyendo nombre, tipo, altura, peso y estadísticas base.

Este proyecto fue realizado como parte del desafío técnico para **Litsight**, con el objetivo de evaluar habilidades en consumo de APIs, manipulación de datos en el cliente, buenas prácticas de código y creación de interfaces modernas.

---

## 🔗 Demo en producción

👉 [Ver Demo](https://prueba-fronted-litsight.vercel.app/)  

---

## 🖼️ Captura de pantalla

![Captura de Pokémon Explorer](./public/screenshot.png)  

---

## ⚙️ Tecnologías utilizadas

### Core
- [Next.js 14](https://nextjs.org/) – Framework React Full Stack con App Router
- [React 18](https://reactjs.org/) – Biblioteca para interfaces de usuario
- [TypeScript](https://www.typescriptlang.org/) – Superset tipado de JavaScript

### Estilos y UI
- [Tailwind CSS](https://tailwindcss.com/) – Framework de estilos utilitario
- [clsx](https://github.com/lukeed/clsx) – Utilidad para construcción condicional de classnames
- [Lottie](https://airbnb.design/lottie/) – Animaciones fluidas y ligeras

### API y Data Fetching
- [PokéAPI](https://pokeapi.co/) – API REST pública de datos Pokémon
- [SWR](https://swr.vercel.app/) – Librería para manejo de estado y caché

### Desarrollo y Deploy
- [ESLint](https://eslint.org/) – Linter para JavaScript/TypeScript
- [PostCSS](https://postcss.org/) – Procesador CSS
- [Vercel](https://vercel.com/) – Plataforma de deploy y hosting

---

## 📁 Estructura del Proyecto

```
pokemon-explorer/
├── public/               # Archivos estáticos
│   ├── animations/      # Animaciones Lottie
│   ├── icon/           # Iconos SVG
│   └── images/         # Imágenes del proyecto
├── src/
│   ├── app/            # App Router de Next.js
│   ├── components/     # Componentes React
│   │   ├── layout/    # Componentes de estructura
│   │   ├── pages/     # Componentes específicos de página
│   │   ├── shared/    # Componentes reutilizables
│   │   └── ui/        # Componentes UI base
│   ├── constants/      # Constantes y configuraciones
│   ├── context/       # Contextos de React
│   ├── hooks/         # Custom hooks
│   ├── services/      # Servicios y llamadas API
│   ├── styles/        # Estilos globales
│   ├── types/         # Tipos TypeScript
│   └── utils/         # Utilidades y helpers
```

---

## 🔍 Características principales

- Visualización de los 151 Pokémon de la primera generación
- Búsqueda por nombre
- Filtrado por tipo de Pokémon
- Vista detallada con estadísticas, evoluciones y debilidades
- Diseño responsivo
- Interfaz moderna y amigable
- Modo de vista en lista y tabla
- Paginación
- Animaciones fluidas
- Caché de datos optimizada
- Carga progresiva de imágenes

---

## 📦 Instalación local

1. **Clona el repositorio:**

```bash
git clone https://github.com/ALFONSOVM13/prueba-fronted-litsight.git
```

2. **Navega al directorio del proyecto:**

```bash
cd prueba-fronted-litsight
```

3. **Instala las dependencias:**

```bash
npm install
# o
yarn install
# o
pnpm install
```

4. **Inicia el servidor de desarrollo:**

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

5. **Abre tu navegador:**
   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)


---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

