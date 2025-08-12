import {rawDataItem} from './FileContentReaderTS'

export interface chartData {
  
    Timestamp: string[];
    RF: number[];
    TT: number[];
    TD: number[];
    RH: number[];
    MSLP: number[];
    TCC: number[];
    TW: number[];
    KI: number[];
    CAPE: number[];
    WS: (number|null)[];
    WD: (number|null)[];
}

export const chartDataFormatter = (data:rawDataItem[]) =>{

    const dict: chartData = {
    Timestamp: [],
    RF: [],
    TT: [],
    TD: [],
    RH: [],
    MSLP: [],
    TCC: [],
    TW: [],
    KI: [],
    CAPE: [],
    WS: [],
    WD: []
    };

    data.forEach(item => {
    const uRaw = item.UComp;
const vRaw = item.VComp;

const u = uRaw === '-999' ? null : Number(uRaw);
const v = vRaw === '-999' ? null : Number(vRaw);

let speed: number | null = null;
let windDirection: number | null = null;

if (u !== null && v !== null && (u !== 0 || v !== 0)) {
  speed = Math.sqrt(u * u + v * v);
  let direction = (180 + (Math.atan2(u, v) * 180) / Math.PI) % 360;
  if (direction < 0) direction += 360;
  windDirection = direction;
}

    dict.Timestamp.push(item.timestamp)
    dict.RF.push(Number(item.RF));
    dict.TT.push(Number(item.TT));
    dict.TD.push(Number(item.TD));
    dict.RH.push(Number(item.RH));
    dict.MSLP.push(Number(item.MSLP));
    dict.TCC.push(Number(item.TCC));
    dict.TW.push(Number(item.TW));
    dict.KI.push(Number(item.KI));
    dict.CAPE.push(Number(item.CAPE || ''));
    dict.WS.push(speed);
    dict.WD.push(windDirection);
  });

  return dict
}


