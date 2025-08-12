export interface Position {
  lat: number;
  lng: number;
  label: string;
  value: string;
}

export const ECMWFStation : Position[] = [
  { lat: 22.50, lng: 113.9, label: "24", value: "24" },
  { lat: 22.50, lng: 114.0, label: "23", value: "23" },
  { lat: 22.50, lng: 114.1, label: "22", value: "22" },
  { lat: 22.50, lng: 114.2, label: "21", value: "21" },
  { lat: 22.50, lng: 114.3, label: "20", value: "20" },
  { lat: 22.50, lng: 114.4, label: "19", value: "19" },
  { lat: 22.40, lng: 113.9, label: "18", value: "18" },
  { lat: 22.40, lng: 114.0, label: "17", value: "17" },
  { lat: 22.40, lng: 114.1, label: "16", value: "16" },
  { lat: 22.40, lng: 114.2, label: "15", value: "15" },
  { lat: 22.40, lng: 114.3, label: "14", value: "14" },
  { lat: 22.40, lng: 114.4, label: "13", value: "13" },
  { lat: 22.30, lng: 113.9, label: "12", value: "02" },
  { lat: 22.30, lng: 114.0, label: "11", value: "11" },
  { lat: 22.30, lng: 114.1, label: "10", value: "10" },
  { lat: 22.30, lng: 114.2, label: "09", value: "09" },
  { lat: 22.30, lng: 114.3, label: "08", value: "08" },
  { lat: 22.30, lng: 114.4, label: "07", value: "07" },
  { lat: 22.20, lng: 113.9, label: "06", value: "06" },
  { lat: 22.20, lng: 114.0, label: "05", value: "05" },
  { lat: 22.20, lng: 114.1, label: "04", value: "04" },
  { lat: 22.20, lng: 114.2, label: "03", value: "03" },
  { lat: 22.20, lng: 114.3, label: "02", value: "02" },
  { lat: 22.20, lng: 114.4, label: "01", value: "01" }
];

export const NCEPStation : Position[] = [
  { lat: 22.25, lng: 114.25, label: "HK Island", value: "HK01" },
  { lat: 22.50, lng: 114.25, label: "NT East", value: "HK04" },
  { lat: 22.25, lng: 114.0, label: "Lantau", value: "HK02" },
  { lat: 22.50, lng: 114.0, label: "NT West", value: "HK03" },
];

export const JM25Station : Position[] = [
  { lat: 22.25, lng: 114.25, label: "HK Island", value: "HK01" },
  { lat: 22.50, lng: 114.25, label: "NT East", value: "HK04" },
  { lat: 22.25, lng: 114.0, label: "Lantau", value: "HK02" },
  { lat: 22.50, lng: 114.0, label: "NT West", value: "HK03" },
];

export const UKMOAPIStation : Position[] = [
  { lat: 22.45, lng: 113.84, label: "HK20", value: "HK20" },
  { lat: 22.36, lng: 113.84, label: "HK19", value: "HK19" },
  { lat: 22.27, lng: 113.84, label: "HK18", value: "HK18" },
  { lat: 22.17, lng: 113.84, label: "HK17", value: "HK17" },
  { lat: 22.45, lng: 113.98, label: "HK16", value: "HK16" },
  { lat: 22.36, lng: 113.98, label: "HK15", value: "HK15" },
  { lat: 22.27, lng: 113.98, label: "HK14", value: "HK14" },
  { lat: 22.17, lng: 113.98, label: "HK13", value: "HK13" },
  { lat: 22.45, lng: 114.12, label: "HK12", value: "HK12" },
  { lat: 22.36, lng: 114.12, label: "HK11", value: "HK11" },
  { lat: 22.27, lng: 114.12, label: "HK10", value: "HK10" },
  { lat: 22.17, lng: 114.12, label: "HK09", value: "HK09" },
  { lat: 22.45, lng: 114.26, label: "HK08", value: "HK08" },
  { lat: 22.36, lng: 114.26, label: "HK07", value: "HK07" },
  { lat: 22.27, lng: 114.26, label: "HK06", value: "HK06" },
  { lat: 22.17, lng: 114.26, label: "HK05", value: "HK05" },
  { lat: 22.45, lng: 114.40, label: "HK04", value: "HK04" },
  { lat: 22.36, lng: 114.40, label: "HK03", value: "HK03" },
  { lat: 22.27, lng: 114.40, label: "HK02", value: "HK02" },
  { lat: 22.17, lng: 114.40, label: "HK01", value: "HK01" },
];

export const KMAUMStation : Position[] = [
  { lat: 22.27, lng: 113.9, label: "Lantau", value: "Lantau" },
  { lat: 22.50, lng: 113.9, label: "Shenzhen Bay", value: "Shenzhen Bay" },
  { lat: 22.27, lng: 114.3, label: "HK East", value: "HK East" },
  { lat: 22.50, lng: 114.3, label: "NT East", value: "NT East" },
];

export const KIMStation : Position[] = [
  { lat: 22.21, lng: 113.86, label: "Lantau", value: "Lantau" },
  { lat: 22.56, lng: 113.86, label: "Shenzhen Bay", value: "Shenzhen Bay" },
  { lat: 22.21, lng: 114.21, label: "HK Island", value: "HK Island" },
  { lat: 22.56, lng: 114.21, label: "NT East", value: "NT East" },
];

export const DWDStation : Position[] = [
  { lat: 22.45, lng: 113.98, label: "Lau Fau Shan", value: "Lau Fau Shan" },
  { lat: 22.48, lng: 114.16, label: "Fanling", value: "Fanling" },
  { lat: 22.28, lng: 113.89, label: "Lantau North", value: "Lantau North" },
  { lat: 22.27, lng: 114.15, label: "Central", value: "Central" },
  { lat: 22.21, lng: 114.35, label: "HK SE", value: "HK SE" },
];

export const CMA_GRAPES_GFSStation : Position[] = [
  { lat: 22.38, lng: 114.20, label: "NT East", value: "NT East" },
  { lat: 22.38, lng: 114.00, label: "NT West", value: "NT West" },
  { lat: 22.12, lng: 114.00, label: "HK SW", value: "HK SW" },
  { lat: 22.12, lng: 114.20, label: "HK SE", value: "HK SE" },
];

export const TRAMSStation : Position[] = [
  { lat: 22.49, lng: 114.10, label: "Sheung Shui", value: "Sheung Shui" },
  { lat: 22.31, lng: 113.92, label: "Lantau", value: "Lantau" },
  { lat: 22.31, lng: 114.19, label: "Kai Tak", value: "Kai Tak " },
  { lat: 22.13, lng: 113.83, label: "HK SW", value: "HK SW" },
  { lat: 22.22, lng: 114.28, label: "Waglan Island", value: "Waglan Island" },
];

export const CMA_GDStation : Position[] = [
  { lat: 22.51, lng: 114.13, label: "Sheung Shui", value: "Sheung Shui" },
  { lat: 22.30, lng: 113.92, label: "Lantau", value: "Lantau" },
  { lat: 22.33, lng: 114.19, label: "Kai Tak", value: "Kai Tak " },
  { lat: 22.12, lng: 113.83, label: "HK SW", value: "HK SW" },
  { lat: 22.18, lng: 114.31, label: "Waglan Island", value: "Waglan Island" },
];
 
export const UWIN_CMStation : Position[] = [
  { lat: 22.5132, lng: 113.8958, label: "24", value: "24" },
  { lat: 22.5132, lng: 114.0059, label: "23", value: "23" },
  { lat: 22.5132, lng: 114.1160, label: "22", value: "22" },
  { lat: 22.5132, lng: 114.1849, label: "21", value: "21" },
  { lat: 22.5132, lng: 114.3088, label: "20", value: "20" },
  { lat: 22.5132, lng: 114.4051, label: "19", value: "19" },
  { lat: 22.4028, lng: 113.8958, label: "18", value: "18" },
  { lat: 22.4028, lng: 114.0059, label: "17", value: "17" },
  { lat: 22.4028, lng: 114.1160, label: "16", value: "16" },
  { lat: 22.4028, lng: 114.1849, label: "15", value: "15" },
  { lat: 22.4028, lng: 114.3088, label: "14", value: "14" },
  { lat: 22.4028, lng: 114.4051, label: "13", value: "13" },
  { lat: 22.3062, lng: 113.8958, label: "12", value: "12" },
  { lat: 22.3062, lng: 114.0059, label: "11", value: "11" },
  { lat: 22.3062, lng: 114.1160, label: "20", value: "10" },
  { lat: 22.3062, lng: 114.1849, label: "09", value: "09" },
  { lat: 22.3062, lng: 114.3088, label: "08", value: "08" },
  { lat: 22.3062, lng: 114.4051, label: "07", value: "07" },
  { lat: 22.1958, lng: 113.8958, label: "06", value: "06" },
  { lat: 22.1958, lng: 114.0059, label: "05", value: "05" },
  { lat: 22.1958, lng: 114.1160, label: "04", value: "04" },
  { lat: 22.1958, lng: 114.1849, label: "03", value: "03" },
  { lat: 22.1958, lng: 114.3088, label: "02", value: "02" },
  { lat: 22.1958, lng: 114.4051, label: "01", value: "01" },
  
];

export const ECEPSStation : Position[] = [
  { lat: 22.50, lng: 113.9, label: "24", value: "24" },
  { lat: 22.50, lng: 114.0, label: "23", value: "23" },
  { lat: 22.50, lng: 114.1, label: "22", value: "22" },
  { lat: 22.50, lng: 114.2, label: "21", value: "21" },
  { lat: 22.50, lng: 114.3, label: "20", value: "20" },
  { lat: 22.50, lng: 114.4, label: "19", value: "19" },
  { lat: 22.40, lng: 113.9, label: "18", value: "18" },
  { lat: 22.40, lng: 114.0, label: "17", value: "17" },
  { lat: 22.40, lng: 114.1, label: "16", value: "16" },
  { lat: 22.40, lng: 114.2, label: "15", value: "15" },
  { lat: 22.40, lng: 114.3, label: "14", value: "14" },
  { lat: 22.40, lng: 114.4, label: "13", value: "13" },
  { lat: 22.30, lng: 113.9, label: "12", value: "02" },
  { lat: 22.30, lng: 114.0, label: "11", value: "11" },
  { lat: 22.30, lng: 114.1, label: "10", value: "10" },
  { lat: 22.30, lng: 114.2, label: "09", value: "09" },
  { lat: 22.30, lng: 114.3, label: "08", value: "08" },
  { lat: 22.30, lng: 114.4, label: "07", value: "07" },
  { lat: 22.20, lng: 113.9, label: "06", value: "06" },
  { lat: 22.20, lng: 114.0, label: "05", value: "05" },
  { lat: 22.20, lng: 114.1, label: "04", value: "04" },
  { lat: 22.20, lng: 114.2, label: "03", value: "03" },
  { lat: 22.20, lng: 114.3, label: "02", value: "02" },
  { lat: 22.20, lng: 114.4, label: "01", value: "01" }
];

export const NCEPEXTStation : Position[] = [
  { lat: 22.25, lng: 114.25, label: "HK Island", value: "HK01" },
  { lat: 22.50, lng: 114.25, label: "NT East", value: "HK04" },
  { lat: 22.25, lng: 114.0, label: "Lantau", value: "HK02" },
  { lat: 22.50, lng: 114.0, label: "NT West", value: "HK03" },
];

export const PANGU_EC01Station : Position[] = [
  { lat: 22.50, lng: 113.9, label: "24", value: "24" },
  { lat: 22.50, lng: 114.0, label: "23", value: "23" },
  { lat: 22.50, lng: 114.1, label: "22", value: "22" },
  { lat: 22.50, lng: 114.2, label: "21", value: "21" },
  { lat: 22.50, lng: 114.3, label: "20", value: "20" },
  { lat: 22.50, lng: 114.4, label: "19", value: "19" },
  { lat: 22.40, lng: 113.9, label: "18", value: "18" },
  { lat: 22.40, lng: 114.0, label: "17", value: "17" },
  { lat: 22.40, lng: 114.1, label: "16", value: "16" },
  { lat: 22.40, lng: 114.2, label: "15", value: "15" },
  { lat: 22.40, lng: 114.3, label: "14", value: "14" },
  { lat: 22.40, lng: 114.4, label: "13", value: "13" },
  { lat: 22.30, lng: 113.9, label: "12", value: "02" },
  { lat: 22.30, lng: 114.0, label: "11", value: "11" },
  { lat: 22.30, lng: 114.1, label: "10", value: "10" },
  { lat: 22.30, lng: 114.2, label: "09", value: "09" },
  { lat: 22.30, lng: 114.3, label: "08", value: "08" },
  { lat: 22.30, lng: 114.4, label: "07", value: "07" },
  { lat: 22.20, lng: 113.9, label: "06", value: "06" },
  { lat: 22.20, lng: 114.0, label: "05", value: "05" },
  { lat: 22.20, lng: 114.1, label: "04", value: "04" },
  { lat: 22.20, lng: 114.2, label: "03", value: "03" },
  { lat: 22.20, lng: 114.3, label: "02", value: "02" },
  { lat: 22.20, lng: 114.4, label: "01", value: "01" }
];

export const EC_AIFSStation : Position[] = [
  { lat: 22.25, lng: 114.25, label: "HK Island", value: "HK01" },
  { lat: 22.50, lng: 114.25, label: "NT East", value: "HK04" },
  { lat: 22.25, lng: 114.0, label: "Lantau", value: "HK02" },
  { lat: 22.50, lng: 114.0, label: "NT West", value: "HK03" },
];

export const FENGWU_EC09Station : Position[] = [
  { lat: 22.50, lng: 114.39, label: "HK19", value: "HK01" },
  { lat: 22.50, lng: 114.30, label: "HK20", value: "HK04" },
  { lat: 22.50, lng: 114.21, label: "HK21", value: "HK02" },
  { lat: 22.50, lng: 114.12, label: "HK22", value: "HK03" },
  { lat: 22.50, lng: 114.03, label: "HK23", value: "HK03" },
  { lat: 22.50, lng: 113.94, label: "HK24", value: "HK03" },
  { lat: 22.41, lng: 114.39, label: "HK13", value: "HK01" },
  { lat: 22.41, lng: 114.30, label: "HK14", value: "HK04" },
  { lat: 22.41, lng: 114.21, label: "HK15", value: "HK02" },
  { lat: 22.41, lng: 114.12, label: "HK16", value: "HK03" },
  { lat: 22.41, lng: 114.03, label: "HK17", value: "HK03" },
  { lat: 22.41, lng: 113.94, label: "HK18", value: "HK03" },
  { lat: 22.32, lng: 114.39, label: "HK07", value: "HK01" },
  { lat: 22.32, lng: 114.30, label: "HK08", value: "HK04" },
  { lat: 22.32, lng: 114.21, label: "HK09", value: "HK02" },
  { lat: 22.32, lng: 114.12, label: "HK10", value: "HK03" },
  { lat: 22.32, lng: 114.03, label: "HK11", value: "HK03" },
  { lat: 22.32, lng: 114.94, label: "HK12", value: "HK03" },
  { lat: 22.23, lng: 114.39, label: "HK01", value: "HK01" },
  { lat: 22.23, lng: 114.30, label: "HK02", value: "HK04" },
  { lat: 22.23, lng: 114.21, label: "HK03", value: "HK02" },
  { lat: 22.23, lng: 114.12, label: "HK04", value: "HK03" },
  { lat: 22.23, lng: 114.03, label: "HK05", value: "HK03" },
  { lat: 22.23, lng: 114.94, label: "HK06", value: "HK03" },

];

export const GRAPHCAST_ECStation : Position[] = [
  { lat: 22.25, lng: 114.25, label: "HK Island", value: "HK01" },
  { lat: 22.50, lng: 114.25, label: "NT East", value: "HK04" },
  { lat: 22.25, lng: 114.0, label: "Lantau", value: "HK02" },
  { lat: 22.50, lng: 114.0, label: "NT West", value: "HK03" },
];

export const FUXI_ECStation : Position[] = [
  { lat: 22.25, lng: 114.25, label: "HK Island", value: "HK01" },
  { lat: 22.50, lng: 114.25, label: "NT East", value: "HK04" },
  { lat: 22.25, lng: 114.0, label: "Lantau", value: "HK02" },
  { lat: 22.50, lng: 114.0, label: "NT West", value: "HK03" },
];

export const FENGQING_ECStation : Position[] = [
  { lat: 22.25, lng: 114.25, label: "HK Island", value: "HK01" },
  { lat: 22.50, lng: 114.25, label: "NT East", value: "HK04" },
  { lat: 22.25, lng: 114.0, label: "Lantau", value: "HK02" },
  { lat: 22.50, lng: 114.0, label: "NT West", value: "HK03" },
];

export const AURORAStation : Position[] = [
  { lat: 22.25, lng: 114.25, label: "HK Island", value: "HK01" },
  { lat: 22.50, lng: 114.25, label: "NT East", value: "HK04" },
  { lat: 22.25, lng: 114.0, label: "Lantau", value: "HK02" },
  { lat: 22.50, lng: 114.0, label: "NT West", value: "HK03" },
];

export const PANGU_NCStation : Position[] = [
  { lat: 22.25, lng: 114.25, label: "HK Island", value: "HK01" },
  { lat: 22.50, lng: 114.25, label: "NT East", value: "HK04" },
  { lat: 22.25, lng: 114.0, label: "Lantau", value: "HK02" },
  { lat: 22.50, lng: 114.0, label: "NT West", value: "HK03" },
];

export const ECMWF125Station : Position[] = [
  { lat: 22.250, lng: 114.25, label: "HK Island", value: "HK01" },
  { lat: 22.500, lng: 114.25, label: "NT East", value: "HK04" },
  { lat: 22.250, lng: 114.0, label: "Lantau", value: "HK02" },
  { lat: 22.500, lng: 114.0, label: "NT West", value: "HK03" },
  { lat: 22.375, lng: 114.125, label: "Tsuen Wan", value: "HK03" },
];

export const JMAStation : Position[] = [
  { lat: 22.31, lng: 114.16, label: "JMA (RA-2)", value: "JMA (RA-2)" },
];

export const selectModel = (model:string) =>{
switch(model) {
case 'ECMWF':
    return ECMWFStation
    break
case 'NCEP':
    return NCEPStation
    break
case 'JM25':
    return JM25Station
    break
case 'UKMO-API':
    return UKMOAPIStation
    break
case 'KMA-UM':
    return KMAUMStation
    break
case 'KIM':
    return KIMStation
    break
case 'DWD':
    return DWDStation
    break
case 'CMA_GRAPES_GFS':
    return CMA_GRAPES_GFSStation
    break
case 'TRAMS':
    return TRAMSStation
    break
case 'CMA_GD':
    return CMA_GDStation
    break
case 'UWIN_CM':
    return UWIN_CMStation
    break
case 'ECEPS':
    return ECEPSStation
    break
case 'NCEPEXT':
    return NCEPEXTStation
    break
case 'PANGU_EC01':
    return PANGU_EC01Station
    break
case 'EC_AIFS':
    return EC_AIFSStation
    break
case 'FENGWU_EC09':
    return FENGWU_EC09Station
    break
case 'FUXI_EC':
    return FUXI_ECStation
    break
case 'GRAPHCAST_EC':
    return GRAPHCAST_ECStation
    break
case 'FENGQING_EC':
    return FENGQING_ECStation
    break
case 'AURORA':
    return AURORAStation
    break
case 'PANGU_NC':
    return PANGU_NCStation
    break
case 'ECMWF125':
    return ECMWF125Station
    break
case 'JMA':
    return JMAStation
    break
    default:
      return []; // default empty array instead of undefined
}
} 