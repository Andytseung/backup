import React, { useState, useEffect } from 'react';
import MiniMap from './Minimap';
import { chartData } from './ChartData';

const times = ['00', '12'];
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' },
  { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' },
  { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' },
  { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' },
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

const positions = [
  { lat: 22.5, lng: 113.9, label: "24", value: "24" },
  { lat: 22.5, lng: 114.0, label: "23", value: "23" },
  { lat: 22.5, lng: 114.1, label: "22", value: "22" },
  { lat: 22.5, lng: 114.2, label: "21", value: "21" },
  { lat: 22.5, lng: 114.3, label: "20", value: "20" },
  { lat: 22.5, lng: 114.4, label: "19", value: "19" },
  { lat: 22.4, lng: 113.9, label: "18", value: "18" },
  { lat: 22.4, lng: 114.0, label: "17", value: "17" },
];

function pad2(num: number) {
  return num.toString().padStart(2, '0');
}

export interface FileInputData {
  filename: string;
  station: string;
  model: string;
  time: string;
  day: number;
  month: number;
  year: number;
  dateInput: string;
}

interface FilenameInputPanelProps {
  onFilesChange?: (files: FileInputData[]) => void;
  onParaChange?: (para: keyof chartData) => void;
  onAlignedChange?: (aligned: boolean) => void; // NEW prop added
}

const modelGroups = [
  {
    label: 'Standard Models',
    options: [
      { label: 'ECMWF (0.1)', value: 'ECMWF' },
      { label: 'NCEP', value: 'NCEP' },
      { label: 'JMA', value: 'JM25' },
      { label: 'UKMO(Hi-res)', value: 'UKMO-API' },
      { label: 'KMA-UM', value: 'KMA-UM' },
      { label: 'KMA-KIM', value: 'KIM' },
      { label: 'DWD', value: 'DWD' },
      { label: 'CMA-GFS', value: 'CMA_GRAPES_GFS' },
      { label: 'TRAMS', value: 'TRAMS' },
      { label: 'CMA-GD', value: 'CMA_GD' },
      { label: 'UWIN-CM', value: 'UWIN_CM' },
    ],
  },
  {
    label: 'Extended Models',
    options: [
      { label: 'ECMWF(Extended)', value: 'ECEPS' },
      { label: 'NCEP(Extended)', value: 'NCEPEXT' },
      { label: 'PANGU EC', value: 'PANGU_EC01' },
      { label: 'EC-AIFS', value: 'EC_AIFS' },
      { label: 'FENGWU EC', value: 'FENGWU_EC09' },
      { label: 'FUXI EC', value: 'FUXI_EC' },
      { label: 'GRAPHCAST EC', value: 'GRAPHCAST_EC' },
      { label: 'FENGQING EC', value: 'FENGQING_EC' },
      { label: 'AURORA EC', value: 'AURORA' },
      { label: 'PANGU NC', value: 'PANGU_NC' },
    ],
  },
  {
    label: 'Other Models',
    options: [
      { label: 'ECMWF (0.125)', value: 'ECMWF125' },
      { label: 'JMA (RA-2)', value: 'JMA' },
    ],
  },
];

const paraKeys: (keyof chartData)[] = [
  'TT',
  'RH',
  'MSLP',
  'TCC',
  'TW',
  'KI',
  'RF',
  'TD',
  'WS',
  'WD'
];

function generateStartTimes(): string[] {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth() + 1;
  const day = now.getUTCDate();
  const hour = now.getUTCHours();
  const roundedHour = hour < 12 ? 0 : 12;

  function pad2Inner(n: number) { return n.toString().padStart(2, '0'); }
  function formatTime(y: number, m: number, d: number, h: number) {
    return `${y}${pad2Inner(m)}${pad2Inner(d)}${pad2Inner(h)}`;
  }

  // Start from one extra 12-hour slot earlier
  let baseDate = new Date(Date.UTC(year, month - 1, day, roundedHour));
  baseDate = new Date(baseDate.getTime() - 12 * 60 * 60 * 1000); // subtract 12 hours

  const times: string[] = [];

  for (let i = 0; i < 4; i++) {
    const dt = new Date(baseDate.getTime() - i * 12 * 60 * 60 * 1000);
    times.push(formatTime(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate(), dt.getUTCHours()));
  }
  return times;
}


const FilenameInputPanelTS: React.FC<FilenameInputPanelProps> = ({ onFilesChange, onParaChange, onAlignedChange }) => {
  const [files, setFiles] = useState<FileInputData[]>([{
    filename: '',
    station: '',
    model: '',
    time: '',
    day: 0,
    month: 0,
    year: 0,
    dateInput: '',
  }]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [isMiniMapExpanded, setIsMiniMapExpanded] = useState<boolean>(false);

  const [aligned, setAligned] = useState<boolean>(false);
const toggleAligned = () => {
  const newValue = !aligned;  // read current value directly
  setAligned(newValue);       // update local state
  onAlignedChange?.(newValue); // notify parent safely outside state update
};

  const [globalModel, setGlobalModel] = useState<string>('');
  const [miniMapOpen, setMiniMapOpen] = useState<boolean[]>(files.map(() => false));

  useEffect(() => {
    setMiniMapOpen(old => files.map((_, i) => old[i] ?? false));
  }, [files]);

  const combinedDateTimeOptions: string[] = [];
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const today = new Date();
  for(let i=0; i<400; i++) {
    const date = new Date(today.getTime() - i * MS_PER_DAY);
    const y = date.getFullYear();
    const m = date.getMonth()+1;
    const d = date.getDate();
    for(const t of times){
      const yyyymmdd = `${y}${pad2(m)}${pad2(d)}`;
      combinedDateTimeOptions.push(`${yyyymmdd} ${t}`);
    }
  }

  useEffect(() => {
    setFiles(current => current.map(f => ({
      ...f,
      dateInput: f.year && f.month && f.day ? `${f.year}-${pad2(f.month)}-${pad2(f.day)}` : '',
    })));
  }, []);

  useEffect(() => {
    onFilesChange?.(files);
  }, [files, onFilesChange]);

  const updateFileField = (index: number, field: keyof FileInputData, value: any) => {
    setFiles(files => {
      const newFiles = [...files];
      newFiles[index] = { ...newFiles[index], [field]: value };
      if(field === 'day' || field === 'month' || field === 'year') {
        const { day, month, year } = newFiles[index];
        newFiles[index].dateInput = year && month && day ? `${year}-${pad2(month)}-${pad2(day)}` : '';
      }
      if(field === 'dateInput') {
        const parts = value.split('-');
        if(parts.length === 3){
          const y = parseInt(parts[0],10);
          const m = parseInt(parts[1],10);
          const d = parseInt(parts[2],10);
          if(!isNaN(y)) newFiles[index].year = y;
          if(!isNaN(m)) newFiles[index].month = m;
          if(!isNaN(d)) newFiles[index].day = d;
        }
      }
      return newFiles;
    });
  };

  const handleGlobalModelChange = (model: string) => {
    setGlobalModel(model);
    setFiles(files => files.map(f => ({ ...f, model })));
    setMiniMapOpen(files => files.map(() => false));
  };

  const updateAllStations = (label: string) => {
    setFiles(files => files.map(f => ({ ...f, station: label })));
  };

  const handleCombinedDateTimeChange = (index: number, value: string) => {
    const [datePart, timePart] = value.split(' ');
    if(datePart.length === 8 && (timePart === '00' || timePart === '12')) {
      const year = parseInt(datePart.slice(0,4),10);
      const month = parseInt(datePart.slice(4,6),10);
      const day = parseInt(datePart.slice(6,8),10);
      updateFileField(index,'year',year);
      updateFileField(index,'month',month);
      updateFileField(index,'day',day);
      updateFileField(index,'time',timePart);
    }
  };

  const addFile = () => {
    setFiles(files => [...files,{
      filename:'',
      station:'',
      model: globalModel,
      time:'',
      day:0,
      month:0,
      year:0,
      dateInput:'',
    }]);
    setExpandedIndex(files.length);
    setMiniMapOpen(open => [...open,false]);
  };

  const removeFile = (index: number) => {
    setFiles(files => files.filter((_,i)=>i!==index));
    setExpandedIndex(current => current===index ? null : current && current>index ? current-1 : current);
    setMiniMapOpen(open => open.filter((_,i)=>i!==index));
  };

  const toggleExpand = (index:number) => {
    setExpandedIndex(current => (current===index ? null : index));
  };

  const toggleMiniMap = (index:number) => {
    setMiniMapOpen(open => open.map((v,i) => i===index ? !v : v));
  };

  const handleGridButtonClick = (para: keyof chartData) => {
    onParaChange?.(para);
  };

const autoGenerateFiles = () => {
  const startTimes = generateStartTimes();

  // Construct the new files array with 4 generated start time entries
  const newFiles = startTimes.map(timeStr => {
    const year = parseInt(timeStr.slice(0,4),10);
    const month = parseInt(timeStr.slice(4,6),10);
    const day = parseInt(timeStr.slice(6,8),10);
    const hour = timeStr.slice(8,10);

    return {
      filename:'',
      station:'',
      model: globalModel,
      time: hour,
      day,
      month,
      year,
      dateInput: `${year}-${pad2(month)}-${pad2(day)}`,
    };
  });

  // Clear all files first and set the new files
  setFiles(newFiles);
  setExpandedIndex(0);
  setMiniMapOpen(newFiles.map(() => false));
};


  return (
    <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <h2 style={{ marginBottom: 24 }}>Files Input Panel</h2>

      {/* Parameter Buttons Grid */}
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(5, 1fr)',
        gridTemplateRows:'repeat(2, 40px)', gap:8, marginBottom:24,
      }}>
        {paraKeys.map(para=>(
          <button key={para} type="button"
            onClick={() => handleGridButtonClick(para)}
            style={{
              backgroundColor:'#007bff', color:'white', border:'none',
              borderRadius:6, cursor:'pointer', fontSize:14, fontWeight:'600',
              userSelect:'none', transition:'background-color 0.3s ease',
              textTransform:'uppercase',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#007bff')}
            aria-label={`Select parameter ${para}`}
            title={`Select parameter ${para}`}
          >{para}</button>
        ))}
      </div>

      {/* Global Model Dropdown */}
      <label style={{ display:'block', fontWeight:'600', marginBottom:16 }}>
        Set Model for All Files:
        <select
          value={globalModel}
          onChange={e => handleGlobalModelChange(e.target.value)}
          style={{
            width:'100%', padding:10, marginTop:6, marginBottom:24,
            fontSize:15, borderRadius:6, border:'1px solid #ccc',
            outline:'none', backgroundColor:'white', boxSizing:'border-box',
            cursor:'pointer',
          }}
        >
          <option value="">-- Select model --</option>
          {modelGroups.map(group=>(
            <optgroup key={group.label} label={group.label}>
              {group.options.map(opt=>(
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      {/* Collapsible MiniMap for all stations */}
      <div style={{ marginBottom:16 }}>
        <button type="button" onClick={() => setIsMiniMapExpanded(exp => !exp)}
          style={{
            padding:'10px 16px', fontSize:16, borderRadius:6, border:'1px solid #007bff', 
            backgroundColor:isMiniMapExpanded ? '#0056b3' : 'white',
            color: isMiniMapExpanded ? 'white' : '#007bff',
            cursor: 'pointer', userSelect: 'none', marginBottom: 8,
            width:'100%', maxWidth:600,
          }}
          aria-expanded={isMiniMapExpanded}
          aria-controls="shared-minimap"
        >
          {isMiniMapExpanded ? 'Hide' : 'Show'} MiniMap (Control All Stations)
        </button>
        {isMiniMapExpanded && (
          <div id="shared-minimap"
            style={{
              border:'1px solid #888', borderRadius:8, height:200,
              backgroundColor:'#eef6ff', display:'flex', alignItems:'center',
              justifyContent:'center', maxWidth:600, margin:'auto',
            }}>
            <MiniMap model={globalModel} positions={positions} onLabelSelect={updateAllStations} />

          </div>
        )}
      </div>

      {/* Auto Generate 4 Start Times Button */}
      <button type="button" onClick={autoGenerateFiles} style={{
        padding:'12px 20px', fontSize:16, backgroundColor:'#28a745', color:'white',
        border:'none', borderRadius:8, cursor:'pointer', transition:'background-color 0.3s ease',
        marginBottom:12, display:'block', width:'100%', maxWidth:600, marginLeft:'auto', marginRight:'auto',
      }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#218838')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#28a745')}
      >
        Auto Generate 4 Start Times
      </button>

      {/* Remove All Files Button */}
      <button type="button" onClick={() => { setFiles([]); setExpandedIndex(null); setMiniMapOpen([]); }} style={{
        padding:'12px 20px', fontSize:16, backgroundColor:'#dc3545', color:'white',
        border:'none', borderRadius:8, cursor:'pointer', transition:'background-color 0.3s ease',
        marginBottom:12, display:'block', width:'100%', maxWidth:600, marginLeft:'auto', marginRight:'auto',
      }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c82333')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#dc3545')}
      >
        Remove All Files
      </button>

      {/* Add File and Aligned Toggle Buttons */}
      <div style={{ display:'flex', gap:12, marginBottom:16 }}>
        <button type="button" onClick={addFile} style={{
          flex:1, padding:'12px 20px', fontSize:16, backgroundColor:'#007bff',
          color:'white', border:'none', borderRadius:8, cursor:'pointer',
          transition:'background-color 0.3s ease', userSelect:'none',
        }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          + Add File
        </button>

        <button type="button" onClick={toggleAligned} style={{
          flex:1, padding:'12px 20px', fontSize:16,
          backgroundColor: aligned ? '#28a745' : 'white',
          color: aligned ? 'white' : '#28a745',
          border: `2px solid #28a745`,
          borderRadius: 8, cursor: 'pointer',
          userSelect: 'none',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }} aria-pressed={aligned} title="Toggle aligned status"
        >
          {aligned ? 'Aligned: ON' : 'Aligned: OFF'}
        </button>
      </div>

      {/* File inputs */}
      {files.map((file, idx) => {
        const isExpanded = expandedIndex === idx;
        const isMiniMapShown = miniMapOpen[idx];
        return (
          <div key={idx} style={{
            marginBottom: 20, padding: 16, border: '1px solid #ccc',
            borderRadius: 8, backgroundColor: '#fafafa', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            userSelect: 'none', position:'relative', display:'flex', flexDirection:'column',
          }}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'default'}}>
              <div style={{
                fontSize: 16,
                color: file.station ? '#222' : '#888',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: 1,
                paddingRight: 8,
              }} title={file.station || 'No station selected'}>
                {file.station || 'No station selected'}
              </div>

              <button type="button" onClick={e => { e.stopPropagation(); toggleExpand(idx); }}
                aria-label={isExpanded ? 'Collapse file details' : 'Expand file details'}
                title={isExpanded ? 'Collapse' : 'Expand'}
                style={{
                  marginRight: 8,
                  width: 32,
                  height: 32,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: 20,
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  userSelect: 'none',
                }}
              >
                {isExpanded ? '−' : '+'}
              </button>

              <button type="button" onClick={e => { e.stopPropagation(); removeFile(idx); }}
                aria-label={`Remove file input ${idx + 1}`} title="Remove this file input"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: '#f8d7da',
                  border: 'none',
                  color: '#721c24',
                  fontSize: 18,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  userSelect: 'none',
                }}
                onMouseEnter={e => {
                  const btn = e.currentTarget;
                  btn.style.backgroundColor = '#f5c6cb';
                  btn.style.color = '#491217';
                }}
                onMouseLeave={e => {
                  const btn = e.currentTarget;
                  btn.style.backgroundColor = '#f8d7da';
                  btn.style.color = '#721c24';
                }}
              >
                &times;
              </button>
            </div>

            {isExpanded && (
              <div style={{ marginTop: 16 }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: 8 }}>
                  Station:
                  <input type="text" value={file.station} onChange={e => updateFileField(idx, 'station', e.target.value)}
                    placeholder="Enter station or select from map"
                    style={{
                      width: '100%',
                      padding: 10,
                      marginTop: 6,
                      marginBottom: 16,
                      fontSize: 15,
                      borderRadius: 6,
                      border: '1px solid #ccc',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onClick={e => e.stopPropagation()}
                  />
                </label>

                <label style={{ display: 'block', fontWeight: '600', marginBottom: 8 }}>
                  Model:
                  <select value={file.model} onChange={e => updateFileField(idx, 'model', e.target.value)}
                    style={{
                      width: '100%',
                      padding: 10,
                      marginTop: 6,
                      marginBottom: 16,
                      fontSize: 15,
                      borderRadius: 6,
                      border: '1px solid #ccc',
                      outline: 'none',
                      backgroundColor: globalModel ? '#e9ecef' : 'white',
                      boxSizing: 'border-box',
                      cursor: globalModel ? 'not-allowed' : 'pointer',
                    }}
                    onClick={e => e.stopPropagation()}
                    disabled={!!globalModel}
                  >
                    <option value="" disabled>Select model</option>
                    {modelGroups.map(group => (
                      <optgroup key={group.label} label={group.label}>
                        {group.options.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </label>

                {file.model && <>
                  <button type="button" onClick={e => { e.stopPropagation(); toggleMiniMap(idx); }}
                    style={{
                      marginBottom: 8,
                      padding: '6px 10px',
                      width: '350px',
                      cursor: 'pointer',
                      borderRadius: 6,
                      border: '1px solid #007bff',
                      backgroundColor: isMiniMapShown ? '#0056b3' : 'white',
                      color: isMiniMapShown ? 'white' : '#007bff',
                      userSelect: 'none',
                    }}>
                    {isMiniMapShown ? 'Hide MiniMap' : 'Show MiniMap'}
                  </button>

                  {isMiniMapShown && (
                    <div style={{
                      width: '300px',
                      height: '200px',
                      border: '1px solid #888',
                      borderRadius: 8,
                      marginBottom: 16,
                      marginLeft: 22,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#eef6ff',
                      fontSize: 14,
                      color: '#333',
                    }} onClick={e => e.stopPropagation()}>
                      <MiniMap model={file.model} positions={positions} onLabelSelect={label => updateFileField(idx, 'station', label)} />
                    </div>
                  )}
                </>}

                <label style={{ display: 'block', fontWeight: '600', marginBottom: 8 }}>
                  Time:
                  <select value={file.time} onChange={e => updateFileField(idx, 'time', e.target.value)}
                    style={{
                      width: '100%',
                      padding: 10,
                      marginTop: 6,
                      marginBottom: 16,
                      fontSize: 15,
                      borderRadius: 6,
                      border: '1px solid #ccc',
                      outline: 'none',
                      backgroundColor: 'white',
                      boxSizing: 'border-box',
                    }}
                    onClick={e => e.stopPropagation()}
                  >
                    <option value="" disabled>Select time</option>
                    {times.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </label>

                {/* Date dropdowns */}
                <fieldset style={{ border: '1px solid #ddd', padding: 16, marginBottom: 16, borderRadius: 8, userSelect: 'none' }}
                  onClick={e => e.stopPropagation()}>
                  <legend style={{ fontWeight: '700', marginBottom: 12 }}>Select Date (Dropdowns)</legend>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontWeight: '600' }}>
                        Day
                        <select value={file.day} onChange={e => updateFileField(idx, 'day', parseInt(e.target.value, 10))}
                          style={{
                            width: '100%', padding: 8, fontSize: 14, marginTop: 6,
                            borderRadius: 6, border: '1px solid #ccc', outline: 'none', backgroundColor: 'white',
                            boxSizing: 'border-box',
                          }}
                        >
                          <option value={0} disabled>Select day</option>
                          {days.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </label>
                    </div>
                    <div style={{ flex: 2 }}>
                      <label style={{ display: 'block', fontWeight: '600' }}>
                        Month
                        <select value={file.month} onChange={e => updateFileField(idx, 'month', parseInt(e.target.value, 10))}
                          style={{
                            width: '100%', padding: 8, fontSize: 14, marginTop: 6,
                            borderRadius: 6, border: '1px solid #ccc', outline: 'none', backgroundColor: 'white',
                            boxSizing: 'border-box',
                          }}
                        >
                          <option value={0} disabled>Select month</option>
                          {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                        </select>
                      </label>
                    </div>
                    <div style={{ flex: 2 }}>
                      <label style={{ display: 'block', fontWeight: '600' }}>
                        Year
                        <select value={file.year} onChange={e => updateFileField(idx, 'year', parseInt(e.target.value, 10))}
                          style={{
                            width: '100%', padding: 8, fontSize: 14, marginTop: 6,
                            borderRadius: 6, border: '1px solid #ccc', outline: 'none', backgroundColor: 'white',
                            boxSizing: 'border-box',
                          }}
                        >
                          <option value={0} disabled>Select year</option>
                          {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </label>
                    </div>
                  </div>
                </fieldset>

                {/* Combined Date & Time Dropdown */}
                <label style={{ display: 'block', fontWeight: '600', marginBottom: 16 }}>
                  Select Date & Time:
                  <select value={file.year && file.month && file.day && file.time ? `${file.year}${pad2(file.month)}${pad2(file.day)} ${file.time}` : ''}
                    onChange={e => handleCombinedDateTimeChange(idx, e.target.value)}
                    style={{
                      width: '100%',
                      padding: 10,
                      fontSize: 15,
                      borderRadius: 6,
                      border: '1px solid #ccc',
                      outline: 'none',
                      backgroundColor: 'white',
                      boxSizing: 'border-box',
                    }}
                    onClick={e => e.stopPropagation()}
                  >
                    <option value="" disabled>Select date and time</option>
                    {combinedDateTimeOptions.map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>

                {/* Calendar input */}
                <label style={{ display: 'block', fontWeight: '600' }}>
                  Or select date (Calendar):
                  <input type="date" value={file.dateInput} onChange={e => updateFileField(idx, 'dateInput', e.target.value)}
                    style={{
                      width: '100%', padding: 10, fontSize: 14, marginTop: 6,
                      borderRadius: 6, border: '1px solid #ccc', outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </label>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilenameInputPanelTS;
