import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
import { theme as antdTheme } from "antd";
import { useTheme } from "@/app/providers/ThemeContext";
import type { WeeklyResponsesPoint } from "../model/useStatisticsData";

interface ResponsesChartProps {
  data: WeeklyResponsesPoint[];
}

export const ResponsesChart = ({ data }: ResponsesChartProps) => {
  const { t } = useTranslation();
  const { token } = antdTheme.useToken();
  const { mode } = useTheme();

  const gridColor = mode === "dark" ? "#434343" : "#d9d9d9";
  const textColor = token.colorText;

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="day" stroke={textColor} />
        <YAxis stroke={textColor} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="currentWeek"
          name={t("statistics.currentWeek")}
          stroke={token.colorPrimary}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="lastWeek"
          name={t("statistics.lastWeek")}
          stroke={token.colorPrimaryBorder}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
