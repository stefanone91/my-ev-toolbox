"use client";

import { ChargeSummaryStep } from "@/features/charge-price-calculator";
import { Box } from "@mui/material";
import {
  BarController,
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  ScriptableContext,
  Tooltip,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  BarController,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  chargeSummary: ChargeSummaryStep[];
}

export function ChargeChart({ chargeSummary }: Props) {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData>({ datasets: [] });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    // Data
    setChartData({
      labels: chargeSummary.map((x) => `${x.soc}%`),
      datasets: [
        {
          type: "line" as const,
          label: "Speed [kW]",
          data: chargeSummary.map((x) => x.kw),
          fill: "start",
          backgroundColor: (context: ScriptableContext<"line">) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, "#5555FFFF");
            gradient.addColorStop(1, "#9787FF77");
            return gradient;
          },
        },
        {
          type: "line" as const,
          label: "Energy charged [kWh]",
          data: chargeSummary.map((x) => x.chargedKwh),
          fill: "start",
          backgroundColor: (context: ScriptableContext<"line">) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, "#41cb5aFF");
            gradient.addColorStop(1, "#41cb5a77");
            return gradient;
          },
        },
      ],
    });
  }, [chargeSummary]);

  return (
    <Box sx={{ height: "30vh", width: "100%" }}>
      <Chart
        ref={chartRef}
        type="line"
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </Box>
  );
}
