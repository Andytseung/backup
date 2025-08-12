import React, { useMemo, useState, useEffect, useCallback } from "react";
import FilenameInputPanelTS, { FileInputData } from "./FilenameInputPanelTS";
import FileContentReaderTS from './FileContentReaderTS';
import { Time } from "highcharts";
import { chartData } from './ChartData'
import { trimToCommonDays , alignToUnionDays} from './Aligned'
import MultiLineChart from "./Chart";
import { findIndexWithDifference , NestedArray} from './ChartDataProcess';
export interface FileItem {
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
function extractSeriesName(filename: string): string {
  const parts = filename.split("_");
  if (parts.length < 2) return filename;
  return parts.slice(-2).join("_");
}

function isFileDataComplete(file: FileInputData): boolean {
  return (
    file.year !== 0 &&
    file.month !== 0 &&
    file.day !== 0 &&
    file.time.trim() !== "" &&
    file.station.trim() !== "" &&
    file.model.trim() !== ""
  );
}

// const stationCoordinates: StationLatLon[] = [
//   { station: "HK20", lat: 22.3193, lon: 114.1694 },
//   { station: "ST01", lat: 51.5074, lon: -0.1278 },
// ];

const TimeSeriesTab: React.FC = () => {
  const [validData, setValidData] = useState<FileInputData[]>([]);
  const [invalidData, setInvalidData] = useState<{ item: any; missingFields: string[] }[]>([]);
  const [rawFiles, setRawFiles] = useState<FileInputData[]>([]);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [allParsedData, setAllParsedData] = useState<FileItem[][]>([]);
  const [para, setPara] = useState<keyof chartData>("TT");
  const [para2Chart, setPara2Chart] = useState<keyof chartData>('TT')
  const [timestamps, setTimestamps] = useState<string[][]>([]);
  const [data, setData] = useState<(string | number)[][]>([]);
  const [seriesNames, setSeriesNames] = useState<string[]>([]);
  const [chartData, setChartData] = useState<chartData>();
  const [chartDataList, setChartDataList] = useState<chartData[]>([]);
  const [targetedElementData, setTargetedElementData] = useState<any[][]>([]);
  const [isAligned, setIsAligned] = useState<boolean>(false);
  const [displayTime, setDisplayTime] = useState<any[][]>([]);
  const [displayData, setDisplayData] = useState<any[][]>([]);
  const [indices,setIndices] = useState<number[]>([])
  const [showInputPanel, setShowInputPanel] = useState(true);
  
      const nestedArray: NestedArray = [
        [1, 2, 3, 4, 5],
        [2, 4, 6, 7, 9],
        [null, 3, 1, 2, 3]
    ];
  const [invalidItems, setInvalidItems] = useState<any[]>([]);
  const memoizedRawFiles = useMemo(() => rawFiles, [rawFiles]); // 仅在内容变化时更新引用

  // 在 TimeSeriesTab 中，用 useCallback 包裹回调
  const handleValidFilenames = useCallback((filenames: string[]) => {
    console.log('生成的文件名:', filenames); // 后续可移除或限制
    setFilenames(filenames);
  }, []); // 空依赖，确保函数引用稳定

  const handleInvalidData = useCallback((invalidItems: any[]) => {
    setInvalidItems(invalidItems);
  }, []); // 空依赖，确保函数引用稳定
  // Handler to receive aligned status toggle from FilenameInputPanel
  const handleAlignedChange = (aligned: boolean) => {
    setIsAligned(aligned);
    console.log('Aligned toggled:', aligned);
    // Use this to control or filter data as needed
  };
  const handleChartData = useCallback((data: chartData) => {
    setChartData(data);
    console.log('DATA IS READY!!!!')
    console.log(chartData)
  }, []);
  const handleTargetedElementData = useCallback((data: any[][]) => {
    setTargetedElementData(data);
  }, []);
  const handleTimestamp = useCallback((data: string[][]) => {
    setTimestamps(data);
    console.log(timestamps.length, 'is ready to use')
    console.log('DATA IS READY!!!!')
    console.log(timestamps)
  }, []);
  const handleChartDataList = useCallback((data: chartData[]) => {
    setChartDataList(data);
    console.log(' READY!!!!', chartDataList)
    console.log()
  }, []);
  // Log filenames whenever they update and are non-empty
  useEffect(() => {
    if (filenames.length > 0) {
      console.log("Filenames updated in App:", filenames);
    }
  }, [filenames]);



  // Example: Extract timestamps and data for para from allParsedData

  useEffect(() => {
    console.log('Raw Data', rawFiles)
  }, [rawFiles])
  useEffect(() => {
    console.log('targetedElementData', targetedElementData)
    if (timestamps.length > 2) {
      trimToCommonDays(timestamps, targetedElementData)
    }
  }, [targetedElementData])

  useEffect(() => {
    console.log('para', para)
  }, [para])

  useEffect(() => {
    if (timestamps.length > 0) {
      console.log('Timestamps updated:', timestamps);
    }
  }, [timestamps]);

useEffect(() => {
  if (timestamps.length > 0 && targetedElementData) {
    if (isAligned) {
      const { trimmedDays, trimmedValues } = trimToCommonDays(timestamps, targetedElementData);

      // Convert trimmedDays (number[][]) to string[][] if needed

      setDisplayTime(trimmedDays);
      setDisplayData(trimmedValues);
      console.log('HERE',trimmedDays,trimmedValues)
    } else {
      const aData = alignToUnionDays(timestamps, targetedElementData);
      if (aData){
      // Convert alignedDays (number[][]) to string[][] if needed
      setDisplayData(aData.alignedValues)
      setDisplayTime(aData.alignedDays)
      console.log(aData)
      }
    }
  }
}, [isAligned, timestamps, targetedElementData]);

    useEffect(() => {
      console.log('ABNORMALLLLLLLLLLLLLLLLLLLLLLLLLLLL')
    if (timestamps.length > 0) {
      console.log(findIndexWithDifference(displayData),'indices')
      

    }
  }, [displayData]);
  

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}>
      <aside style={{ display: showInputPanel ? 'block' : 'none', width: 420, padding: 20, backgroundColor: "#f9fafb", borderRight: "1px solid #ddd", boxSizing: "border-box", overflowY: "auto" }}>
     
      <FilenameInputPanelTS onFilesChange={setRawFiles} onParaChange={setPara} onAlignedChange={handleAlignedChange}
 
 />

      </aside>
         <button
          onClick={() => setShowInputPanel(!showInputPanel)}
          style={{
            marginBottom: 16,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          {showInputPanel ? '<' : '>'}
        </button>
      <main style={{ flex: 1, padding: 20, overflowY: "auto" }}>

        <FileContentReaderTS
          data={memoizedRawFiles}
          onValidFilenames={handleValidFilenames}
          onInvalidData={handleInvalidData}
          onChartData={handleChartData}
          onChartDataList={handleChartDataList}
          onTimestamp={handleTimestamp}
          onTargetedElement={handleTargetedElementData}
          para={para}
        />
        {/* Other components like FileContentReader, SimpleChart, Meteogram can be added here */}
        
        <MultiLineChart categories={displayTime[0]} seriesData={displayData} name={filenames} polygonIndices={findIndexWithDifference(displayData)} />
      </main>
    </div>
  );
};

export default TimeSeriesTab;
