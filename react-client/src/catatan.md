```js

import React from 'react';
import { parse } from 'papaparse';
import { useAnova } from '../hooks/useAnova';
import { useTtest } from '../hooks/useTtest';

export default function DataUploader() {
  const [uploads, setUploads] = React.useState([]);
  const [isRepeated, setIsRepeated] = React.useState(false);

  // Hooks for ANOVA and t-test
  const {
    runAnovaMutation,
    isLoading: isAnovaLoading,
  } = useAnova(setUploads);

  const {
    runTtestMutation,
    isLoading: isTtestLoading,
  } = useTtest(setUploads);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        if (!data.length) return;

        const headers = Object.keys(data[0]);
        const rows = data.slice(0, 5);

        const numericColumns = headers.filter(col =>
          data.every(row => !isNaN(parseFloat(row[col])))
        );

        const violinTraces = numericColumns.map(col => ({
          type: 'violin',
          y: data.map(row => parseFloat(row[col])),
          name: col,
          box: { visible: true },
          meanline: { visible: true },
        }));

        setUploads(prev => [
          ...prev,
          { id: crypto.randomUUID(), headers, rows, violinTraces, result: null }
        ]);
      },
      error: (err) => console.error('CSV parse error:', err),
    });
  };

  // Unified runner for statistical tests
  const runGroupTest = (uploadId) => {
    const target = uploads.find(u => u.id === uploadId);
    if (!target) return;

    const groups = target.violinTraces.map(t => t.y);

    if (groups.length === 2) {
      // Two groups: use t-test
      const [group1, group2] = groups;
      runTtestMutation({ group1, group2, paired: isRepeated, uploadId });
    } else if (groups.length > 2) {
      // More than two groups: use ANOVA
      runAnovaMutation({ groups, repeated: isRepeated, uploadId });
    } else {
      console.warn('Need at least two groups for statistical testing');
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {uploads.map(u => (
        <div key={u.id} style={{ marginTop: 20 }}>
          <button
            onClick={() => runGroupTest(u.id)}
            disabled={isAnovaLoading || isTtestLoading}
          >
            {groupsLabel(u.violinTraces.length)} Test
          </button>
          {/* render traces and results... */}
        </div>
      ))}
    </div>
  );
}

function groupsLabel(count) {
  if (count === 2) return 't-test';
  if (count > 2) return 'ANOVA';
  return 'N/A';
}

