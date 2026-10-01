import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { theme as antdTheme } from "antd";
import { useTheme } from "@/app/providers/ThemeContext";
import type { StagePoint } from "../model/useStatisticsData";

interface StagesChartProps {
  data: StagePoint[];
}

export const StagesChart = ({ data }: StagesChartProps) => {
  const { token } = antdTheme.useToken();
  const { mode } = useTheme();

  const gridColor = mode === "dark" ? "#434343" : "#d9d9d9";
  const textColor = token.colorText;

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="name" stroke={textColor} />
        <YAxis stroke={textColor} />
        <Tooltip />
        <Bar dataKey="value">
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
