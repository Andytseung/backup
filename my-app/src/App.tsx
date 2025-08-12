import React, { useState } from 'react';
import MetoTab from './MetoTab';
import TimeSeriesTab from './TimeSeriesTab';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'meto' | 'timeseries'>('meto');

  return (
    <div>
      <header style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <p>NWP Model Time Series (HighChart)</p>

        <button
          onClick={() => setActiveTab('meto')}
          style={{
            marginRight: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: activeTab === 'meto' ? '#007bff' : '#ccc',
            color: activeTab === 'meto' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          MetoTab
        </button>
        <button
          onClick={() => setActiveTab('timeseries')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: activeTab === 'timeseries' ? '#007bff' : '#ccc',
            color: activeTab === 'timeseries' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          TimeSeriesTab
        </button>
      </header>

      <main style={{ padding: '1rem' }}>
        {activeTab === 'meto' && <MetoTab />}
        {activeTab === 'timeseries' && <TimeSeriesTab />}
      </main>
    </div>
  );
};

export default App;
