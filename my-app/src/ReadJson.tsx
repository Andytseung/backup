import React, { useEffect, useState } from 'react';

interface Record {
  timestamp: string;
  year: string;
  month: string;
  day: string;
  time: string;
  dayOfWeek: string;
  rf: number;
  t2m: number;
  d2m: number;
  rh: number;
  msl: number;
  tcc: number;
  w2m: number;
  kx: number;
}

interface DataExtractorByFilenameProps {
  filenames: string[];  // array of filenames
  para?: keyof Record;
  onTimestampsExtracted: (timestamps: string[][]) => void; // nested arrays
  onDataExtracted: (data: (string | number)[][]) => void;  // nested arrays
}

const DataExtractor: React.FC<DataExtractorByFilenameProps> = ({
  filenames,
  para,
  onTimestampsExtracted,
  onDataExtracted,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all(
      filenames.map(filename =>
        fetch(`http://localhost:4000/data/${filename}`)
          .then(res => {
            if (!res.ok) throw new Error(`File not found: ${filename}`);
            return res.json() as Promise<Record[]>;
          })
      )
    )
      .then(allJsonData => {
        // allJsonData is an array of arrays of Record, one per file

        // Map each file's data to its timestamps array (nested)
        const timestampsNested = allJsonData.map(fileData =>
          fileData.map(record => record.timestamp)
        );
        onTimestampsExtracted(timestampsNested);
        console.log(timestampsNested);

        // Map each file's data to its para values array (nested)
        if (para) {
          const dataNested = allJsonData.map(fileData =>
            fileData.map(record => record[para])
            
          );
          onDataExtracted(dataNested);
          console.log(dataNested)
        }

        setLoading(false);
   
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [filenames, para, onTimestampsExtracted, onDataExtracted]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return null;
};

export default DataExtractor;
