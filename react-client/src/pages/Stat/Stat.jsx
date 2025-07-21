import React, { useState, useRef } from 'react';
import { parse } from 'papaparse';
import { Trash, Info, Activity, UploadCloud } from 'lucide-react';
import { PreviewTable } from './PreviewTable';
import { ViolinPlot } from './ViolinPlot';
import { useAnova } from '../../hooks/useAnova';
import FolderFloatButton from "./FolderFloatButton"
import { useTtest } from '../../hooks/useTtest';

export default function Stat() {
  const [uploads, setUploads] = useState([]);
  const [isRepeated, setIsRepeated] = useState(false);
  const fileInputRef = useRef(null);

  const { runTtestMutation, isTtestLoading } = useTtest(setUploads)

  const { runAnovaMutation, isAnovaLoading } = useAnova(setUploads);



  const isLoading = isTtestLoading || isAnovaLoading;


  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

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

  const runGroupTest = uploadId => {
    const target = uploads.find(u => u.id === uploadId);
    if (!target) return;
    const groups = target.violinTraces.map(t => t.y);

    if (groups.length === 2) {
      const [group1, group2] = groups
      runTtestMutation({ group1, group2, paired: isRepeated, uploadId })

      return
    }

    runAnovaMutation({ groups, repeated: isRepeated, uploadId });
  };


  const removeUpload = (id) => {
    setUploads(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="p-4 space-y-6">

      {uploads.map(({ id, headers, rows, violinTraces, stat, p_value, conclusion, test_type }, idx) => (
        <div key={id} className="border border-amber-500 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Upload #{idx + 1}</h3>
            <Trash className="w-5 h-5 text-red-600 cursor-pointer" onClick={() => removeUpload(id)} />
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-6 mb-4">
            <div className="flex-1 daisy-table">
              <h4 className="text-sm text-gray-500 text-center mb-2">Showing first 5 rows</h4>
              <PreviewTable headers={headers} rows={rows} />
            </div>
            <div className="flex-1 flex justify-center items-center">
              <ViolinPlot traces={violinTraces} />
            </div>
          </div>

          {!stat && uploads.length > 0 && (
            <div className='flex justify-center gap-8'>
              <div className="flex justify-center items-center space-x-2">
                <input
                  type="checkbox"
                  id="repeatedSwitch"
                  className="checkbox"
                  checked={isRepeated}
                  onChange={() => setIsRepeated(prev => !prev)}
                />
                <label htmlFor="repeatedSwitch" className="text-sm font-bold cursor-pointer">
                  Repeated Measures?
                </label>
                <div className="tooltip" data-tip="Pilih jika setiap subjek diuji di setiap kondisi">
                  <Info className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="flex justify-center">
                <button className="btn btn-primary" onClick={() => { if (!isLoading) runGroupTest(id) }}>
                  {isLoading ? 'Running...' : 'Run Test'}
                </button>
              </div>


            </div>


          )}

          {stat && (
            <div className="p-6 bg-white rounded-2xl shadow-lg space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Activity className="w-6 h-6 text-blue-500" />
                <h5 className="text-xl font-semibold text-gray-800">Inference Result</h5>
              </div>

              <div className="flex justify-around text-sm text-gray-700">
                <div className="flex flex-col">
                  <span className="font-medium">Test type</span>
                  <span>{test_type}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Statistic</span>
                  <span>{stat}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">p‑value</span>
                  <span>{p_value}</span>
                </div>
              </div>

              <div className={`mt-2 flex justify-center px-4 py-2 rounded-full text-sm font-semibold ${conclusion.toLowerCase().startsWith("reject")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
                }`}
              >
                {conclusion}
              </div>
            </div>
          )}
        </div>
      ))}


      {/* Bagian trigger upload */}
      <div className="flex justify-center">
        {/* Input file tersembunyi */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept=".csv,text/csv"
          className="hidden"
        />

        {uploads.length > 0 && (
          <button
            type="button"
            onClick={triggerFileSelect}
            className="btn btn-ghost flex items-center space-x-2"
          >
            <UploadCloud className="w-6 h-6 text-blue-500" />
            <span>Upload CSV</span>
          </button>

        )}

        {uploads.length === 0 && (
          <FolderFloatButton onClick={triggerFileSelect} />
        )}

      </div>
    </div>
  );
}
