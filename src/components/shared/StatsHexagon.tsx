import React from 'react';

interface Stat {
  name: string;
  value: number;
  color: string;
}

interface StatsHexagonProps {
  stats: Stat[];
}

export const StatsHexagon: React.FC<StatsHexagonProps> = ({ stats }) => {
  const maxValue = 255;
  const size = 200;
  const center = size / 2;
  const radius = (size / 2) - 20;
  
  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / stats.length - Math.PI / 2;
    const point = value / maxValue * radius;
    return {
      x: center + point * Math.cos(angle),
      y: center + point * Math.sin(angle)
    };
  };

  const getStatColor = (value: number) => {
    const percentage = (value / maxValue) * 100;
    if (percentage >= 70) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-500';
    if (percentage >= 30) return 'text-red-500';
    return 'text-red-600';
  };

  const points = stats.map((stat, i) => {
    const point = getPoint(i, stat.value);
    return `${point.x},${point.y}`;
  }).join(' ');

  const backgroundPoints = Array.from({ length: 6 }, (_, i) => {
    const point = getPoint(i, maxValue);
    return `${point.x},${point.y}`;
  }).join(' ');

  const gridLines = Array.from({ length: 4 }, (_, i) => {
    const value = ((i + 1) * maxValue) / 4;
    const points = Array.from({ length: stats.length }, (_, j) => {
      const point = getPoint(j, value);
      return `${point.x},${point.y}`;
    }).join(' ');
    return points;
  });

  return (
    <div className="relative w-full max-w-[200px] mx-auto m-8">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full transform -rotate-30"
      >
        {gridLines.map((points, i) => (
          <polygon
            key={`grid-${i}`}
            points={points}
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="0.5"
          />
        ))}

        <polygon
          points={backgroundPoints}
          fill="none"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="1"
        />

        <polygon
          points={points}
          fill="rgba(104, 211, 145, 0.4)"
          stroke="rgb(104, 211, 145)"
          strokeWidth="2"
        />

        {stats.map((stat, i) => {
          const point = getPoint(i, stat.value);
          return (
            <circle
              key={`point-${i}`}
              cx={point.x}
              cy={point.y}
              r="3"
              fill="rgb(104, 211, 145)"
            />
          );
        })}
      </svg>

      {stats.map((stat, i) => {
        const angle = (360 * i) / stats.length - 90;
        const radius = (size / 2) + 10;
        const x = center + radius * Math.cos((angle * Math.PI) / 180);
        const y = center + radius * Math.sin((angle * Math.PI) / 180);
        
        return (
          <div
            key={`label-${i}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium"
            style={{
              left: `${(x / size) * 100}%`,
              top: `${(y / size) * 100}%`,
            }}
          >
            <span className="bg-white/80 px-1 py-0.5 rounded">
              {stat.name}
              <span className={`ml-1 font-bold ${getStatColor(stat.value)}`}>{stat.value}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}; 