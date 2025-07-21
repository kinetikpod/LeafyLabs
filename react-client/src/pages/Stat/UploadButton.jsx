import { Upload } from 'lucide-react';

export default function UploadButton({ onFileSelect }) {
  const fileInputRef = useRef(null);

  return (
    <div className="flex justify-center">
      <button
        onClick={() => fileInputRef.current?.click()}
        className="btn btn-circle btn-primary tooltip"
        data-tip="Upload CSV"
      >
        <Upload className="w-6 h-6" />
      </button>

      <input
        type="file"
        accept=".csv,text/csv"
        ref={fileInputRef}
        onChange={onFileSelect}
        className="hidden"
      />
    </div>
  );
}

