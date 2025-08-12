// MeteogramWithWindBarbs.tsx
import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import WindbarbModule from 'highcharts/modules/windbarb';
import {chartData} from './ChartData';
// Import cloud cover icons (adjust paths as needed)
import cloudCover0 from './TCC/Cloud_cover_0.svg.png';
import cloudCover1 from './TCC/Cloud_cover_1.svg.png';
import cloudCover2 from './TCC/Cloud_cover_2.svg.png';
import cloudCover3 from './TCC/Cloud_cover_3.svg.png';
import cloudCover4 from './TCC/Cloud_cover_4.svg.png';
import cloudCover5 from './TCC/Cloud_cover_5.svg.png';
import cloudCover6 from './TCC/Cloud_cover_6.svg.png';
import cloudCover7 from './TCC/Cloud_cover_7.svg.png';
import cloudCover8 from './TCC/Cloud_cover_8.svg.png';

declare const Highcharts: any;


interface MeteogramProps {
  data: chartData;
}

function parseTimestamp(ts: string): number {
  const year = parseInt(ts.slice(0, 4), 10);
  const month = parseInt(ts.slice(4, 6), 10) - 1;
  const day = parseInt(ts.slice(6, 8), 10);
  const hour = parseInt(ts.slice(8, 10), 10);
  return Date.UTC(year, month, day, hour);
}

const Meteogram: React.FC<MeteogramProps> = ({ data }) => {
  // Parse categories (timestamps)
  const categories = data.Timestamp.map(ts =>
    typeof ts === 'string' ? parseTimestamp(ts) : 0
  );

  // Cloud cover icons array
  const tccIcons = [
    cloudCover0,
    cloudCover1,
    cloudCover2,
    cloudCover3,
    cloudCover4,
    cloudCover5,
    cloudCover6,
    cloudCover7,
    cloudCover8,
  ];

  // Helper to replace -999 with null
  const fixValue = (val: number | null) => (val === -999 ? null : val);

  // Prepare cloud cover series data with icons, fixing -999 values
  const tccSeriesData = data.TCC.map((val, i) => {
    if (val === null || val === -999) return { x: categories[i], y: null };
    const iconIdx = Math.min(Math.max(Math.round(val), 0), tccIcons.length - 1);
    return {
      x: categories[i],
      y: val,
      marker: {
        symbol: `url(${tccIcons[iconIdx]})`,
        width: 24,
        height: 24,
      },
    };
  });

  // Prepare wind data for windbarbs: [{x: time, value: speed, direction: dir}], replacing -999 with null
  const windData: Array<{ x: number; value: number | null; direction: number | null }> = categories.map((time, i) => ({
    x: time,
    value: fixValue(data.WS[i]),
    direction: fixValue(data.WD[i]),
  }));
  console.log(windData)
  // Helper to map data to [timestamp, value] pairs with -999 to null
  const mapSeries = (arr: Array<number | null>) =>
    arr
      .map(val => fixValue(val))
      .map((val, i) => [categories[i], val]);

  const options: Highcharts.Options = {
    chart: {
      height: 1000,
      backgroundColor: 'lightgrey',
    },
    title: {
      text: 'Full Meteogram with Multiple Variables',
      style: { color: 'black', fontWeight: 'bold' },
    },
    xAxis: [
      {
        type: 'datetime',
        height: '52%',
        crosshair: true,
        labels: { format: '{value:%m-%d %H:%M}', style: { color: 'black' } },
        offset: 0,
        lineColor: 'black',
        tickColor: 'black',
      },
      {
        type: 'datetime',
        top: '74%',
        height: '15%',
        offset: 0,
        lineWidth: 1,
        labels: { format: '{value:%m-%d %H:%M}', style: { color: 'black' } },
        lineColor: 'black',
        tickColor: 'black',
      },
    ],
    yAxis: [
      {
        labels: { format: '{value}°C', style: { color: 'black' } },
        title: { text: 'Temperature / Dew Point', style: { color: 'black' } },
        top: '10%',
        height: '25%',
        lineWidth: 1,
        opposite: false,
        lineColor: 'black',
        tickColor: 'black',
      },
      {
        labels: { format: '{value}%', style: { color: 'black' } },
        title: { text: 'Relative Humidity', style: { color: 'black' } },
        top: '25%',
        height: '10%',
        offset: 0,
        lineWidth: 1,
        opposite: true,
        lineColor: 'black',
        tickColor: 'black',
      },
      {
        labels: { format: '{value} hPa', style: { color: 'black' } },
        title: { text: 'Pressure', style: { color: 'black' } },
        top: '37%',
        height: '15%',
        offset: 0,
        lineWidth: 1,
        opposite: true,
        lineColor: 'black',
        tickColor: 'black',
      },
      {
        labels: { format: '{value} mm', style: { color: 'black' } },
        title: { text: 'Precipitation', style: { color: 'black' } },
        top: '57%',
        height: '15%',
        offset: 0,
        lineWidth: 1,
        opposite: false,
        lineColor: 'black',
        tickColor: 'black',
      },
      {
        labels: { format: '{value} m/s', style: { color: 'black' } },
        title: { text: 'Wind Speed', style: { color: 'black' } },
        top: '74%',
        height: '15%',
        offset: 0,
        lineWidth: 1,
        opposite: true,
      },
      {
        top: '3%',
        height: '0%',
        visible: false,
        showEmpty: false,
        labels: { enabled: false },
        lineWidth: 0,
        tickLength: 0,
      },
    ],
    tooltip: {
      shared: true,
      xDateFormat: '%Y-%m-%d %H:%M',
    },
    series: [
      {
        name: 'Total Cloud Cover',
        type: 'scatter',
        data: tccSeriesData,
        yAxis: 5,
        tooltip: {
          pointFormatter() {
            return `TCC: <b>${this.y}</b>`;
          },
        },
        showInLegend: true,
        marker: { enabled: true },
      },
      {
        name: 'Temperature',
        type: 'spline',
        data: mapSeries(data.TT),
        yAxis: 0,
        xAxis: 0,
        tooltip: { valueSuffix: ' °C' },
        color: '#FF3333',
      },
      {
        name: 'Wet Bulb Temperature',
        type: 'spline',
        data: mapSeries(data.TW),
        yAxis: 0,
        xAxis: 0,
        tooltip: { valueSuffix: ' °C' },
        color: '#FF3333',
      },
      {
        name: 'Dew Point Temperature',
        type: 'spline',
        data: mapSeries(data.TD),
        yAxis: 0,
        xAxis: 0,
        tooltip: { valueSuffix: ' °C' },
        color: '#3399FF',
      },
      {
        name: 'Relative Humidity',
        type: 'column',
        data: mapSeries(data.RH),
        yAxis: 1,
        xAxis: 0,
        tooltip: { valueSuffix: ' %' },
        color: '#00CC66',
      },
      {
        name: 'Pressure',
        type: 'spline',
        data: mapSeries(data.MSLP),
        yAxis: 2,
        xAxis: 0,
        tooltip: { valueSuffix: ' hPa' },
        color: '#666666',
      },
      {
        name: 'Precipitation',
        type: 'column',
        data: mapSeries(data.RF),
        yAxis: 3,
        xAxis: 0,
        tooltip: { valueSuffix: ' mm' },
        color: '#0000FF',
      },
      {
        name: 'Wind Speed',
        type: 'spline',
        data: windData.map(({ x, value }) => [x, value]),
        yAxis: 4,
        xAxis: 0,
      },
      {
        name: 'Wind Direction',
        type: 'windbarb',
        color: 'black',
        data: windData
          .filter(({ value, direction }) => value !== null && direction !== null)
          .map(({ x, value, direction }) => [x, value, direction]),
        vectorLength: 30,
        yOffset: -250,
        yAxis: 0,
        xAxis: 1,
        tooltip: {
          pointFormat: '{point.value:.2f} m/s, {point.direction:.0f}°',
        },
      },
    ],
    legend: {
      enabled: true,
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      x: 0,
      y: 0,
      borderColor: 'black',
      borderWidth: 2,
      title: { style: { color: 'black', fontWeight: 'bold' } },
      itemStyle: { color: 'black', fontWeight: 'bold' },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Meteogram;
