import React, { useEffect, useMemo } from 'react';

type DataValue = number | string | null;

interface DataAlignerProps {
  timestampsNested: string[][];
  dataNested: DataValue[][];
  onAlignedData: (alignedData: DataValue[][]) => void;
  onAlignedTimeData: (alignedData: DataValue[]) => void;
}

/**
 * React component that aligns multiple nested timestamp and data arrays into a combined timeline.
 * Missing data points are filled with null.
 * Calls onAlignedData callback with aligned data arrays only.
 * Does NOT render any UI.
 */
const DataAligner: React.FC<DataAlignerProps> = ({
  timestampsNested,
  dataNested,
  onAlignedData,
  onAlignedTimeData,
}) => {
  // Combine all timestamps uniquely and sort
  const combinedTimestamps = useMemo(() => {
    const set = new Set<string>();
    timestampsNested.forEach(arr => arr.forEach(ts => set.add(ts)));
    return Array.from(set).sort();
  }, [timestampsNested]);

  // Align each data array to combinedTimestamps, filling missing with null
  const alignedData = useMemo(() => {
    return timestampsNested.map((tsArr, idx) => {
      const dataArr = dataNested[idx];
      const tsToData = new Map<string, DataValue>();
      tsArr.forEach((ts, i) => {
        tsToData.set(ts, dataArr[i]);
      });
      return combinedTimestamps.map(ts => tsToData.get(ts) ?? null);
    });
  }, [timestampsNested, dataNested, combinedTimestamps]);

  useEffect(() => {
    onAlignedData(alignedData);
    onAlignedTimeData(combinedTimestamps);

    console.log('Aligned data:', alignedData);
    console.log('Aligned timestamps:', combinedTimestamps);

  }, [alignedData, onAlignedData]);

  return null; // No UI rendered
};

export default DataAligner;
