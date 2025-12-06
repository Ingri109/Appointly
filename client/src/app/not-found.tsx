'use client';

import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-custom1 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion size={40} className="text-slate-400" />
        </div>
        
        <h1 className="text-6xl font-bold text-teal-600 mb-2">404</h1>
        
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Strona nie znaleziona
        </h2>
        
        <p className="text-slate-600 mb-8">
          Przepraszamy, nie możemy znaleźć strony, której szukasz. Sprawdź adres URL lub wróć do strony głównej.
        </p>
        
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              <Home size={18} className="mr-2" />
              Strona główna
            </Button>
          </Link>
          
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-slate-300"
          >
            <ArrowLeft size={18} className="mr-2" />
            Wróć
          </Button>
        </div>
      </div>
    </div>
  );
}
