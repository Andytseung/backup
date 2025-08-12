import React from 'react';
import { FileInputData } from '../FilenameInputPanelTS';
import {rawDataItem} from '../FileContentReaderTS'
interface ECMWFFileExtractorProps {
  data: FileInputData;
}
export interface FormattedECMWFData {
  exampleFilename: string;
}



const pad2 = (num: number) => num.toString().padStart(2, "0");


export const formatNCEPFilename = (data:FileInputData): FormattedECMWFData => {
  // 格式化日期为 ECMWF 格式: {month}{day}[{year}]
  
  // 生成示例文件名
      const exampleFilename = `ncep_025_TS_6hrly_16D_${data.year}${pad2(data.month)}${pad2(data.day)}${data.time}_NCEPP025${data.station}`;

// export const extractNCEPData = 
  return {
    exampleFilename
  };
};

export const processNCEPFileContent = (text: string): rawDataItem[] => {
  const tempData: rawDataItem[] = [];
  const lines = text.trim().split(/\r\n|\n|\r/);

  lines.forEach(line => {
    console.log('START PROCESSING......')

    // console.log('TEXT',text)
    const sep = line.trim().split(/\s+/);
    if ( sep[0] !== 'missing') {
      tempData.push({
        timestamp: sep[0] + sep[1] + sep[2] + sep[3],
        RF: sep[5],
        TT: sep[6],
        TD: sep[7],
        RH: sep[10],
        MSLP: sep[11],
        TCC: sep[12],
        TW: sep[15],
        KI: sep[13],
        CAPE: sep[14],
        UComp: sep[8],
        VComp: sep[9]
      });
    }
  });
  console.log('TEMP DATA',tempData)

  return tempData;
};

