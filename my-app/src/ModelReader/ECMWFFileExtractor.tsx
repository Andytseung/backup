import React from 'react';
import { FileInputData } from '../FilenameInputPanelTS';

interface ECMWFFileExtractorProps {
  data: FileInputData;
}
export interface FormattedECMWFData {
  exampleFilename: string;
}

const pad2 = (num: number) => num.toString().padStart(2, "0");


export const formatECMWFFilename = (data:FileInputData): FormattedECMWFData => {
  // 格式化日期为 ECMWF 格式: {month}{day}[{year}]
  
  // 生成示例文件名
  const exampleFilename =  `ECMWF_01_TS_H3D_6hrly_10D_${data.year}${pad2(data.month)}${pad2(data.day)}${data.time}_ECMWF01${data.station}`;

  return {
    exampleFilename
  };
};

