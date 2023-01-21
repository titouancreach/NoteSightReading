import { Area, AreaChart, ResponsiveContainer, XAxis } from "recharts";

export function DashboardChart() {
  const data = [
    {
      name: "Jan",
      uv: 10,
    },
    {
      name: "Fev",
      uv: 20,
    },
    {
      name: "Mar",
      uv: 22,
    },
    {
      name: "Apr",
      uv: 60,
    },
  ];

  return (
    <div className="-mx-2">
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
          <XAxis dataKey="name" />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
