import { Area, AreaChart, ResponsiveContainer } from "recharts";

export function DashboardChart({
  history,
  className,
}: {
  history: { total: number; started_at: Date; uid: string }[];
  className?: string;
}) {

  const data = history.map((h) => ({
    name: h.started_at.toLocaleDateString("fr-FR", { month:'short', day: 'numeric' }),
    total: h.total,
  }));

  return (
    <div className={className}>
      <ResponsiveContainer
        width="100%"
        aspect={4.0 / 3.0}
        height="unset"
        className=""
      >
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
