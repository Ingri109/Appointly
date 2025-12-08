'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BackToMenu from '@/components/BackToMenu';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Image, CheckCircle, Clock, Download, Trash2, AlertCircle, RefreshCw } from 'lucide-react';

// TODO: When server has tests/documents GraphQL support, add proper queries/mutations
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_USER_TESTS_QUERY, UPLOAD_TEST_MUTATION, DELETE_TEST_MUTATION } from '@/graphql/queries';

type TestResult = {
  id: string;
  name: string;
  date: string;
  type: string;
  status: 'reviewed' | 'pending';
  fileUrl?: string;
};

const supportedFormats = [
  { type: 'PDF', icon: FileText },
  { type: 'JPG/PNG', icon: Image },
  { type: 'DICOM', icon: FileText },
];

export default function UploadTestsPage() {
  const router = useRouter();
  const [tests, setTests] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      router.push('/Login');
      return;
    }
    
    setIsAuthenticated(true);
    
    // TODO: Replace with GraphQL query when server supports it
    // For now, show mock data
    setTests([
      { id: '1', name: 'Wyniki Badania Krwi', date: '2025-11-25', type: 'Raport Laboratoryjny', status: 'reviewed' },
      { id: '2', name: 'RTG Klatki Piersiowej', date: '2025-11-20', type: 'Obrazowanie', status: 'pending' },
      { id: '3', name: 'Rezonans Magnetyczny', date: '2025-11-15', type: 'Obrazowanie', status: 'reviewed' },
    ]);
    setLoading(false);
  }, [router]);

  // Handle file upload
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setUploading(true);
    try {
      // TODO: Implement file upload via GraphQL mutation when server supports it
      // For now, just simulate upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add mock uploaded file to the list
      const newTest: TestResult = {
        id: Date.now().toString(),
        name: files[0].name,
        date: new Date().toISOString().split('T')[0],
        type: 'Nowy dokument',
        status: 'pending',
      };
      
      setTests(prev => [newTest, ...prev]);
      alert('Plik został przesłany pomyślnie!');
    } catch (err) {
      console.error('Upload error:', err);
      alert('Nie udało się przesłać pliku. Spróbuj ponownie.');
    } finally {
      setUploading(false);
    }
  };

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten plik?')) return;
    
    // TODO: Implement delete via GraphQL mutation when server supports it
    setTests(prev => prev.filter(t => t.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="flex flex-col min-h-screen bg-custom1">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#3CA6A6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Ładowanie wyników badań...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-custom1">
      <Header />
      <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <BackToMenu />
            
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Wyniki Badań</h1>
              <p className="text-slate-600">Prześlij i zarządzaj swoimi wynikami badań</p>
            </div>

            {/* Upload Section */}
            <div 
              className={`bg-white rounded-2xl p-8 shadow-lg mb-8 border-2 border-dashed transition-colors ${
                dragActive ? 'border-teal-500 bg-teal-50' : 'border-slate-200'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <Upload size={48} className="mx-auto mb-4 text-teal-600" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Prześlij wyniki badań</h3>
                <p className="text-slate-500 mb-4">Przeciągnij i upuść pliki lub kliknij aby wybrać</p>
                
                <div className="flex justify-center gap-4 mb-4">
                  {supportedFormats.map(({ type, icon: Icon }) => (
                    <div key={type} className="flex items-center gap-1 text-sm text-slate-500">
                      <Icon size={16} />
                      <span>{type}</span>
                    </div>
                  ))}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.dcm"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  {uploading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Przesyłanie...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Wybierz pliki
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Tests List */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">Twoje wyniki ({tests.length})</h2>
              </div>

              {tests.length === 0 ? (
                <div className="p-12 text-center">
                  <AlertCircle size={48} className="mx-auto mb-4 text-slate-300" />
                  <p className="text-slate-500">Nie masz jeszcze żadnych przesłanych wyników</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {tests.map((test) => (
                    <div 
                      key={test.id}
                      className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                          <FileText className="text-teal-600" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{test.name}</h3>
                          <p className="text-sm text-slate-500">{test.type} • {formatDate(test.date)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full ${
                          test.status === 'reviewed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {test.status === 'reviewed' ? (
                            <>
                              <CheckCircle size={14} />
                              Przejrzane
                            </>
                          ) : (
                            <>
                              <Clock size={14} />
                              Oczekuje
                            </>
                          )}
                        </span>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-teal-600"
                          onClick={() => test.fileUrl && window.open(test.fileUrl, '_blank')}
                          disabled={!test.fileUrl}
                        >
                          <Download size={18} />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-red-600"
                          onClick={() => handleDelete(test.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
      </main>
      <Footer />
    </div>
  );
}
