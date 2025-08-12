// DataReceiver.tsx
import React, { useEffect } from 'react';
import { filterData } from './DataValidator';
import {formatECMWFFilename} from './ModelReader/ECMWFFileExtractor';
import {formatNCEPFilename,processNCEPFileContent} from './ModelReader/NCEPFileExtractor';
import {chartDataFormatter} from './ChartData'
import {chartData} from './ChartData'

const fetchFile = async (filename: string): Promise<string> => {
    const response = await fetch(`http://localhost:4000/data/${filename}.txt`);
    const text = await response.text();
    return text;
};

interface DataReceiverProps {
  data: any[]; // 原始数据
  onValidFilenames: (filenames: string[]) => void; // 返回有效文件名的回调
  onInvalidData: (invalidItems: any[]) => void; // 返回无效数据的回调
  onChartData: (data:chartData) => void;
  onChartDataList: (data:chartData[]) => void;
  onTimestamp?: (data:string[][]) => void;
  onTargetedElement?: (data:any[][]) => void;
  para?:keyof chartData
}
export interface DataItem {
  timestamp: string;
  year: string;
  month: string;
  day: string;
  time: string;
  dayOfWeek: string;
  RF: string;
  TT: string;
  TD: string;
  RH: string;
  MSLP: string;
  TCC: string;
  TW: string;
  KI: string;
  CAPE?: string;
  WS?: string;
  WD?: string;
}
export interface rawDataItem {
  timestamp: string;
  RF: string | null;
  TT: string | null;
  TD: string | null;
  RH: string | null;
  MSLP: string | null;
  TCC: string | null;
  TW: string | null;
  KI: string | null;
  CAPE: string | null;
  UComp: string | null;
  VComp: string | null;
}
const DataReceiver: React.FC<DataReceiverProps> = ({ 
  data, 
  onValidFilenames, 
  onInvalidData,
  onChartData,
  onChartDataList,
  onTimestamp,
  onTargetedElement,
  para
}) => {
useEffect(() => {
  const fetchContents = async () => {
    const { validData, invalidData } = filterData(data);

    const filenames: string[] = [];

    const timestamp: string[][] = []
    const targetedData: any[][] = []
    const chartDataList:chartData[] = []

    for (const item of validData) {
      if (item.model === 'ECMWF') {
        const filename = formatECMWFFilename(item).exampleFilename
        console.log('start fetching....');
        // Await the content here:
        const fileContent = await fetchFile(filename);
        const displayData = processNCEPFileContent(fileContent)
        
        // console.log('File Content:', displayData); 
        const chartSettingData = chartDataFormatter(displayData) 
        console.log ('ChartData',chartSettingData)// Now this will be a string, not a Promise
        filenames.push(filename);
      } else if (item.model === 'NCEP') {
        const filename = formatNCEPFilename(item).exampleFilename;
        console.log('start fetching....');
        // Await the content here:
        const fileContent = await fetchFile(filename);
        const displayData = processNCEPFileContent(fileContent)
        
        // console.log('File Content:', displayData); 
        const chartSettingData = chartDataFormatter(displayData) 
        console.log ('ChartData',chartSettingData)// Now this will be a string, not a Promise
        filenames.push(filename);
        // You may also want to process the fileContent if needed:
        // const processed = processNCEPFileContent(fileContent);
        onChartData(chartSettingData)
        chartDataList.push(chartSettingData)
        timestamp.push(chartSettingData.Timestamp)
        
        console.log(timestamp)
        if (para){
          console.log(para,"is in component!")
          
        const targetedValue = chartSettingData[para];
      console.log(targetedValue,'is ready to pass!')
    targetedData.push(targetedValue)}
      } else {
        filenames.push(`${item.station}_${item.model}_${item.dateInput}_${item.time}.txt`);
      }
    }
    console.log(chartDataList.length,chartDataList)
    // Pass results to parent after async processing
    onValidFilenames(filenames);
    onInvalidData(invalidData.map(entry => entry.item));
    onChartDataList(chartDataList)
    console.log(timestamp.length,'is passing back to main')
    if (onTimestamp){
    onTimestamp(timestamp)}
    console.log('passed')
    if (onTargetedElement){
    onTargetedElement(targetedData)}
  };

  fetchContents();
}, [data, onValidFilenames, onInvalidData,onTimestamp,para,onChartDataList,onTargetedElement]);


  return <div />; // 组件不需要渲染任何UI
};

export default DataReceiver;