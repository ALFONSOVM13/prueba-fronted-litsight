export const Waves = () => {
  return (
    <svg
      className="w-full h-[7.5rem] -mb-[0.44rem] min-h-[7.5rem] max-h-[7.5rem] absolute bottom-0 max-[500px]:h-[2.5rem] max-[500px]:min-h-[2.5rem]"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shapeRendering="auto"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g className="[&>use]:animate-[move-forever_25s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite] [&>use:nth-child(1)]:animate-[move-forever_7s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite_-2s] [&>use:nth-child(2)]:animate-[move-forever_10s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite_-3s] [&>use:nth-child(3)]:animate-[move-forever_13s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite_-4s] [&>use:nth-child(4)]:animate-[move-forever_20s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite_-5s]">
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="0"
          fill="rgba(6, 11, 40, 0.7)"
        />
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="3"
          fill="rgba(6, 11, 40, 0.5)"
        />
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="5"
          fill="rgba(6, 11, 40, 0.3)"
        />
        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#060B28" />
      </g>
    </svg>
  );
};
