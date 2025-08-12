// MeteogramWithWindBarbs.tsx
import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import WindbarbModule from 'highcharts/modules/windbarb';


import { DataItem } from './FileContentReaderTS'; // Adjust path as needed

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
  data: DataItem[];
  timeStrings: (string | number | null)[];
}

function parseTimestamp(ts: string): number {
  const year = parseInt(ts.slice(0, 4), 10);
  const month = parseInt(ts.slice(4, 6), 10) - 1;
  const day = parseInt(ts.slice(6, 8), 10);
  const hour = parseInt(ts.slice(8, 10), 10);
  return Date.UTC(year, month, day, hour);
}

const MeteogramWithWindBarbs: React.FC<MeteogramProps> = ({ data, timeStrings }) => {
  // Parse categories (timestamps)
  const categories = timeStrings.map(ts =>
    typeof ts === 'string' ? parseTimestamp(ts) : 0
  );

  // Helper to extract string arrays safely
  const getStrArr = (key: keyof DataItem): string[] =>
    data.map(item => (item[key] !== undefined && item[key] !== null ? String(item[key]) : ''));

  // Convert string arrays to number arrays safely
  const toNumberArray = (arr: string[]) =>
    arr.map(v => (v === '' ? null : Number(v)));

  // Extract and convert all needed variables
  const RF = toNumberArray(getStrArr('RF'));
  const TT = toNumberArray(getStrArr('TT'));
  const TD = toNumberArray(getStrArr('TD'));
  const RH = toNumberArray(getStrArr('RH'));
  const MSLP = toNumberArray(getStrArr('MSLP'));
  const TCC = toNumberArray(getStrArr('TCC'));
  const TW = toNumberArray(getStrArr('TW'));
  const KI = toNumberArray(getStrArr('KI'));
  const WS = toNumberArray(getStrArr('WS'));
  const WD = toNumberArray(getStrArr('WD'));

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

  // Prepare cloud cover series data with icons
  const tccSeriesData = TCC.map((val, i) => {
    if (val === null) return { x: categories[i], y: null };
    const iconIdx = Math.round(val);
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

  // Prepare wind data for windbarbs: [time, speed, direction]
  const windData: Array<[number, number, number]> = categories.map((time, i) => {
    const u = WS[i];
    const v = WD[i];
    if (u === null || v === null) return [time, 0, 0];
    const speed = Math.sqrt(u * u + v * v);
    let direction = (180 + (Math.atan2(u, v) * 180) / Math.PI) % 360;
    if (direction < 0) direction += 360;
    return [time, speed, direction];
  });

  // Helper to map data to [timestamp, value] pairs
  const mapSeries = (arr: Array<number | null>) =>
    arr.map((val, i) => [categories[i], val]);

  // Highcharts options configuration
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
        data: mapSeries(TT),
        yAxis: 0,
        xAxis: 0,
        tooltip: { valueSuffix: ' °C' },
        color: '#FF3333',
      },
      {
        name: 'Wet Bulb Temperature',
        type: 'spline',
        data: mapSeries(TW),
        yAxis: 0,
        xAxis: 0,
        tooltip: { valueSuffix: ' °C' },
        color: '#FF3333',
      },
      {
        name: 'Dew Point Temperature',
        type: 'spline',
        data: mapSeries(TD),
        yAxis: 0,
        xAxis: 0,
        tooltip: { valueSuffix: ' °C' },
        color: '#3399FF',
      },
      {
        name: 'Relative Humidity',
        type: 'column',
        data: mapSeries(RH),
        yAxis: 1,
        xAxis: 0,
        tooltip: { valueSuffix: ' %' },
        color: '#00CC66',
      },
      {
        name: 'Pressure',
        type: 'spline',
        data: mapSeries(MSLP),
        yAxis: 2,
        xAxis: 0,
        tooltip: { valueSuffix: ' hPa' },
        color: '#666666',
      },
      {
        name: 'Precipitation',
        type: 'column',
        data: mapSeries(RF),
        yAxis: 3,
        xAxis: 0,
        tooltip: { valueSuffix: ' mm' },
        color: '#0000FF',
      },
      {
        name: 'Wind Speed',
        type: 'spline',
        data: windData.map(([time, speed]) => [time, speed]),
        yAxis: 4,
        xAxis: 0,
      },
      {
        name: 'Wind Direction',
        type: 'windbarb',
        color: 'black',
        data: windData,
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

export default MeteogramWithWindBarbs;
