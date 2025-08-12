// App.tsx
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import FilenameInputPanel, { FileInputData } from './FilenameInputPanel'; // File input component
import Meteogram from './Meteogram'; // Visualization component

import FileContentReaderTS, { DataItem } from './FileContentReaderTS';
import {chartData} from './ChartData'
import Meto from './Meto'
import { findIndexWithDifference , NestedArray} from './ChartDataProcess';
// Helper to check if file input data is complete
function isFileDataComplete(file: FileInputData): boolean {
  return (
    file.year !== 0 &&
    file.month !== 0 &&
    file.day !== 0 &&
    file.time.trim() !== '' &&
    file.station.trim() !== ''
  );
}

// Generate filename string from file input data
function pad2(num: number) {
  return num.toString().padStart(2, '0');
}
function generateFilename(file: FileInputData): string {
  return `ECMWF_01_TS_H3D_6hrly_10D_${file.year}${pad2(file.month)}${pad2(file.day)}${file.time}_ECMWF01${file.station}`;
}

const App: React.FC = () => {
  const [rawFiles, setRawFiles] = useState<FileInputData[]>([]);
  const [allParsedData, setAllParsedData] = useState<DataItem[][]>([]);
  const [time, setTime] = useState<string[]>([]);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [invalidItems, setInvalidItems] = useState<any[]>([]);
  const memoizedRawFiles = useMemo(() => rawFiles, [rawFiles]); // 仅在内容变化时更新引用
  const [chartData,setChartData] = useState<chartData>();
  const [chartDataList,setChartDataList] = useState<chartData[]>([]);
  const [indices,setIndices] = useState<Number[]>([])
  const [showInputPanel, setShowInputPanel] = useState(true);

      const nestedArray: NestedArray = [
        [1, 2, 3, 4, 5],
        [2, 4, 6, 7, 9],
        [null, 3, 1, 2, 3]
    ];

  const handleValidFilenames = useCallback((filenames: string[]) => {
    console.log('生成的文件名:', filenames); // 后续可移除或限制
    setFilenames(filenames);
  }, []); // 空依赖，确保函数引用稳定
  const handleChartData = useCallback((data:chartData) => {
     // 后续可移除或限制
    setChartData(data);
    console.log('DATA IS READY!!!!')
    console.log(chartData)
  }, []); // 空依赖，确保函数引用稳定
  
  const handleChartDataList = useCallback((data:chartData[]) => {
      setChartDataList(data);
      console.log('DATA IS READY!!!!')
      console.log(chartData)
    }, []); 

  const handleInvalidData = useCallback((invalidItems: any[]) => {
    // console.log('无效数据:', invalidItems); // 后续可移除或限制
    setInvalidItems(invalidItems);
  }, []);
  // Derive filenames for files with complete data
  const filesWithFilenames = useMemo(() => {
    return rawFiles.map(file => {
      if (isFileDataComplete(file)) {
        return {
          ...file,
          filename: generateFilename(file),
        };
      }
      return {
        ...file,
        filename: '',
      };
    });
  }, [rawFiles]);

  // Update allParsedData when files are parsed
  const handleDataParsed = useCallback((index: number, parsedData: DataItem[]) => {
    setAllParsedData(prev => {
      const newData = [...prev];
      newData[index] = parsedData;
      return newData;
    });
  }, []);


  // Maintain stable callbacks for each file index to pass to FileContentReader
  const onDataParsedCallbacksRef = useRef<Map<number, (data: DataItem[]) => void>>(new Map());

  useEffect(() => {
    filesWithFilenames.forEach((_, idx) => {
      if (!onDataParsedCallbacksRef.current.has(idx)) {
        onDataParsedCallbacksRef.current.set(idx, (data: DataItem[]) => {
          handleDataParsed(idx, data);
        });
      }
    });
    
    // Clean up callbacks for removed files
    Array.from(onDataParsedCallbacksRef.current.keys()).forEach(key => {
      if (key >= filesWithFilenames.length) {
        onDataParsedCallbacksRef.current.delete(key);
      }
    });
  }, [filesWithFilenames, handleDataParsed]);
  useEffect(() => {
    if (filenames.length > 0) {
      console.log("Filenames updated in App:", filenames);
    }
  }, [filenames]);
  useEffect(() => {
    if (chartData) {
      console.log("Filenames updated in App:", chartData);
    }
  }, [chartData]);
  // Extract timestamps from first parsed file's data when ready
  useEffect(() => {
    if (allParsedData.length > 0 && Array.isArray(allParsedData[0])) {
      const timestamps = allParsedData[0].map(item => item.timestamp);
      setTime(timestamps);
    }
  }, [allParsedData]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      {/* Sidebar: File Input Panel */}

      <aside style={{       display: showInputPanel ? 'block' : 'none',
  width: 420, padding: 20, backgroundColor: '#f9fafb', borderRight: '1px solid #ddd', boxSizing: 'border-box', overflowY: 'auto' }}>

        <div     style={{

    }}
>
        <FilenameInputPanel onFilesChange={setRawFiles} /></div>
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
        <FileContentReaderTS
          data={memoizedRawFiles}
          onValidFilenames={handleValidFilenames}
          onInvalidData={handleInvalidData}
          onChartData={handleChartData}
          onChartDataList={handleChartDataList}

        />
      {/* Main content: File readers and visualization */}
      <main style={{ flex: 1, padding: 24, backgroundColor: '#fff', overflowY: 'auto' }}>
        {/* Render FileContentReader for each file with a filename */}


        {/* Show summary of parsed data */}
        {/* <div>
          <h3>Parsed Data Summary</h3>
          {allParsedData.map((dataArray, i) => (
            <p key={i}>File {i + 1} parsed {dataArray ? dataArray.length : 0} records.</p>
          ))}
        </div> */}

        {/* Render Meteogram with first file's data and extracted timestamps */}
        {/* {allParsedData.length > 0 && allParsedData[0] && time.length > 0 && (
          <Meteogram data={allParsedData[0]} timeStrings={time} />
        )} */}

        {chartData&&(
        <Meto data ={chartData}/>)}

      </main>
    </div>
  );
};

export default App;
