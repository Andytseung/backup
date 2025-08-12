import React, { useEffect, useRef } from "react";

interface FileInputData {
  filename?: string;
  station: string;
  model: string;
  time: string;
  day: number;
  month: number;
  year: number;
  dateInput: string;
}
interface StationLatLon {
  station: string;
  lat: number;
  lon: number;
}
interface Props {
  file: FileInputData;
  stationCoordinates: StationLatLon[];
  onFilenameGenerated: (filename: string) => void;
  onError?: (error: Error) => void;
}

const pad2 = (num: number) => num.toString().padStart(2, "0");

const UKMOFilenameGenerator: React.FC<Props> = ({
  file,
  stationCoordinates,
  onFilenameGenerated,
  onError,
}) => {
  const lastFilenameRef = useRef<string | null>(null);

  useEffect(() => {
    try {
      const coord = stationCoordinates.find((s) => s.station === file.station);
      if (!coord) throw new Error(`Coordinates not found for station: ${file.station}`);

      const latStr = coord.lat.toFixed(4);
      const lonStr = coord.lon.toFixed(4);

      const filename = `ukmo_0deg09_TS_6hourly_${file.year}${pad2(file.month)}${pad2(file.day)}${file.time}_${file.station}_${latStr}_${lonStr}.txt`;

  if (lastFilenameRef.current !== filename) {
    onFilenameGenerated(filename);
    lastFilenameRef.current = filename;
  }
    } catch (err) {
      if (onError && err instanceof Error) onError(err);
    }
  }, [file, stationCoordinates, onFilenameGenerated, onError]);

  return null;
};

export default UKMOFilenameGenerator;
