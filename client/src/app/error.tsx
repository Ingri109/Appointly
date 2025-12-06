'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Błąd aplikacji:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-custom1 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={32} className="text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Coś poszło nie tak
        </h1>
        
        <p className="text-slate-600 mb-6">
          Przepraszamy, wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę lub wrócić do strony głównej.
        </p>
        
        {error.message && process.env.NODE_ENV === 'development' && (
          <div className="bg-slate-100 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-slate-600 font-mono break-words">
              {error.message}
            </p>
          </div>
        )}
        
        <div className="flex gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <RefreshCw size={18} className="mr-2" />
            Spróbuj ponownie
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="border-slate-300"
          >
            <Home size={18} className="mr-2" />
            Strona główna
          </Button>
        </div>
      </div>
    </div>
  );
}
