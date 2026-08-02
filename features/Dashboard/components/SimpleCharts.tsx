"use client";

type ChartPoint = { name: string; value: number };

function labelIndexes(count: number, maxLabels: number): Set<number> {
  if (count === 0) return new Set();
  const max = Math.max(maxLabels, 1);
  if (count === 1) return new Set([0]);
  if (count <= max) return new Set(Array.from({ length: count }, (_, i) => i));
  const indexes = new Set<number>();
  for (let i = 0; i < max; i++) {
    indexes.add(Math.round((i * (count - 1)) / (max - 1)));
  }
  return indexes;
}

function LabelRow({
  data,
  maxLabels,
}: {
  data: ChartPoint[];
  maxLabels: number;
}) {
  const shown = labelIndexes(data.length, maxLabels);
  return (
    <div className="flex pt-2">
      {data.map((d, i) => (
        <div
          key={i}
          className={`flex-1 truncate text-center text-xs text-slate-500 dark:text-slate-400 ${
            !shown.has(i) ? "text-transparent" : ""
          }`}
          title={d.name}
        >
          {d.name}
        </div>
      ))}
    </div>
  );
}

function GridLines() {
  return (
    <>
      {[0, 25, 50, 75, 100].map((t) => (
        <div
          key={t}
          className="absolute inset-x-0 border-t border-slate-100 dark:border-slate-700/70"
          style={{ bottom: `${t}%` }}
        />
      ))}
    </>
  );
}

export function SimpleBarChart({
  data,
  color,
  maxLabels = 6,
}: {
  data: ChartPoint[];
  color: string;
  maxLabels?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex h-62.5 flex-col">
      <div className="relative flex-1">
        <GridLines />
        <div className="absolute inset-0 flex items-end">
          {data.map((d, i) => {
            const height = max === 0 ? 0 : (d.value / max) * 100;
            return (
              <div
                key={i}
                className="relative flex h-full flex-1 items-end justify-center"
              >
                <span
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-slate-600 dark:text-slate-300"
                  style={{ bottom: `calc(${height}% + 4px)` }}
                >
                  {d.value}
                </span>
                <div
                  className="w-3/5 min-w-1 rounded-t-md"
                  style={{ height: `${height}%`, backgroundColor: color }}
                  title={`${d.name}: ${d.value}`}
                />
              </div>
            );
          })}
        </div>
      </div>
      <LabelRow data={data} maxLabels={maxLabels} />
    </div>
  );
}

export function SimpleLineChart({
  data,
  color,
  maxLabels = 6,
}: {
  data: ChartPoint[];
  color: string;
  maxLabels?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const n = data.length;
  const point = (i: number) => {
    const x = n === 1 ? 50 : (i / (n - 1)) * 100;
    const y = max === 0 ? 100 : 100 - (data[i].value / max) * 100;
    return { x, y };
  };
  const points = data.map((_, i) => `${point(i).x},${point(i).y}`).join(" ");
  return (
    <div className="flex h-62.5 flex-col">
      <div className="relative flex-1">
        <GridLines />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {data.map((d, i) => {
          const px = point(i).x;
          const py = point(i).y;
          const flipBelow = py < 25;
          return (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${px}%`, top: `${py}%` }}
            >
              <span
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-slate-600 dark:text-slate-300"
                style={
                  flipBelow
                    ? { top: "calc(100% + 2px)" }
                    : { bottom: "calc(100% + 2px)" }
                }
              >
                {d.value}
              </span>
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
                title={`${d.name}: ${d.value}`}
              />
            </div>
          );
        })}
      </div>
      <LabelRow data={data} maxLabels={maxLabels} />
    </div>
  );
}
