// ViolinPlot.jsx
import React from 'react';
import Plot from 'react-plotly.js';

export function ViolinPlot({ traces }) {
  return traces.length ? (
    <Plot
      data={traces}
      layout={{
        title: 'Violin Plot',
        autosize: true,
        margin: { l: 40, r: 20, t: 40, b: 40 },
      }}
      style={{ width: '100%', height: '400px' }}
    />
  ) : (
    <p className="text-gray-500">No numeric data for plot.</p>
  );
}
