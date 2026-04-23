import { ImageIcon } from 'lucide-react';

export default function ImagePlaceholder({ label = 'Drop image here' }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed"
      style={{ backgroundColor: '#111a3a', borderColor: '#2a3566' }}>
      <ImageIcon size={40} style={{ color: '#3a4880' }} strokeWidth={1.5} />
      <p className="text-sm text-center px-4 leading-relaxed" style={{ color: '#8b94b8' }}>
        {label}
      </p>
    </div>
  );
}
