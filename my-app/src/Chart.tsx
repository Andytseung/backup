import React from "react";
import HighchartsReact from "highcharts-react-official";

type MultiLineChartProps = {
  categories: string[];
  seriesData: (number | null)[][];
  name: string[];
  polygonIndices?: number[];
};

function createPolygonSeriesPerIndex(
  indices: number[] = [],
  seriesData: (number | null)[][] = [],
  color = "rgba(255, 0, 0, 0.3)"
): Highcharts.SeriesPolygonOptions[] {
  const polygons: Highcharts.SeriesPolygonOptions[] = [];

  indices.forEach((idx) => {
    const yValues: number[] = [];
    seriesData.forEach((series) => {
      const val = series?.[idx];
      if (val != null) yValues.push(val);
    });
    if (yValues.length === 0) return;

    const minY = Math.min(...yValues) - 0.5;
    const maxY = Math.max(...yValues) + 0.5;

    const polygonData: [number, number][] = [
      [idx + 0.5, maxY],
      [idx - 0.5, maxY],
      [idx - 0.5, minY],
      [idx + 0.5, minY],
    ];

    polygons.push({
      name: `Target polygon at index ${idx}`,
      type: "polygon",
      data: polygonData,
      color,
      enableMouseTracking: true,
      showInLegend: false,
    });
  });

  return polygons;
}

function formatSeriesData(
  names: string[] = [],
  dataList: (number | null)[][] = [],
  xValues: number[] = [],
  Highcharts: typeof import("highcharts")
): Highcharts.SeriesOptionsType[] {
  const baseColors =
    Highcharts?.getOptions()?.colors || [
      "#7cb5ec",
      "#434348",
      "#90ed7d",
      "#f7a35c",
      "#8085e9",
      "#f15c80",
      "#e4d354",
      "#2b908f",
      "#f45b5b",
      "#91e8e1",
    ];

  return names.map((name, idx) => {
    const baseColor = baseColors[idx % baseColors.length];
    const color = Highcharts.color(baseColor).setOpacity(0.3).get() || baseColor;

    const series = dataList[idx] ?? [];
    const formattedData = xValues.length && series.length
      ? series.map((v, i) => (v == null ? null : [xValues[i], v]))
      : [];

    return {
      name,
      data: formattedData,
      type: "line",
      color,
      lineWidth: 1.5,
      marker: { enabled: false },
      states: { hover: { lineWidth: 2.5, enabled: true } },
    };
  });
}

const MultiLineChart: React.FC<MultiLineChartProps> = ({
  categories = [],
  seriesData = [],
  name = [],
  polygonIndices = [],
}) => {
  const Highcharts = (window as any).Highcharts;

  if (!Highcharts) {
    return <div>Loading chart scripts...</div>;
  }

  // Convert categories to numeric xValues safely
  const xValues = Array.isArray(categories) ? categories.map((_, i) => i) : [];

  const polygonSeriesArray = createPolygonSeriesPerIndex(
    Array.isArray(polygonIndices) ? polygonIndices : [],
    Array.isArray(seriesData) ? seriesData : [],
    "rgba(255, 0, 0, 0.3)"
  );

  const lines = formatSeriesData(name, seriesData, xValues, Highcharts);

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: "#E0E0E0",
      height: "880px",
    },
    title: {
      text: "Multi-Line Chart with Polygons and Automatic Colors",
      style: { color: "#000000" },
    },
    xAxis: {
      type: "linear",
      min: xValues.length > 0 ? xValues[0] - 0.5 : undefined,
      max: xValues.length > 0 ? xValues[xValues.length - 1] + 0.5 : undefined,
      tickInterval: 1,
      labels: {
        formatter: function () {
          return categories[this.value as number] ?? this.value;
        },
        style: { color: "#000000" },
      },
      lineColor: "#000000",
      tickColor: "#000000",
      crosshair: true,
      title: { text: undefined, style: { color: "#000000" } },
    },
    yAxis: {
      title: { text: "Values", style: { color: "#000000" } },
      labels: { style: { color: "#000000" } },
      lineColor: "#000000",
      tickColor: "#000000",
      gridLineColor: "#ccc",
    },
    legend: {
      itemStyle: { color: "#000000" },
      itemHoverStyle: { color: "#333333" },
    },
tooltip: {
  shared: true,
  backgroundColor: "#FFFFFF",
  style: { color: "#000000" },
  formatter() {
    const points = this.points || [];
    let s = `<b>${categories[this.x as number] ?? this.x}</b><br/>`;
    points.forEach((p: any) => {
      s += `<span style="color:${p.color}">\u25CF</span> ${p.series.name}: <b>${p.y}</b><br/>`;
    });
    return s;
  },
}
,
    series: [...polygonSeriesArray, ...lines],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default MultiLineChart;
