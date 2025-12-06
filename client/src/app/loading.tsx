import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-custom1 flex items-center justify-center">
      <div className="text-center">
        <Loader2 size={48} className="text-teal-600 animate-spin mx-auto mb-4" />
        <p className="text-slate-600 text-lg">Ładowanie...</p>
      </div>
    </div>
  );
}
