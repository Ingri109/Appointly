import Header from '@/components/Header';
import Menu from '@/components/Menu';
import BackToMenu from '@/components/BackToMenu';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Image, CheckCircle, Clock } from 'lucide-react';

const recentTests = [
  { id: 1, name: 'Blood Test Results', date: '2025-11-25', type: 'Lab Report', status: 'reviewed' },
  { id: 2, name: 'X-Ray Chest', date: '2025-11-20', type: 'Imaging', status: 'pending' },
  { id: 3, name: 'MRI Scan', date: '2025-11-15', type: 'Imaging', status: 'reviewed' },
];

const supportedFormats = [
  { type: 'PDF', icon: FileText },
  { type: 'JPG/PNG', icon: Image },
  { type: 'DICOM', icon: FileText },
];

export default function UploadTestsPage() {
  return (
    <div className="flex min-h-screen bg-custom1">
      <Menu />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto bg-custom1">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <BackToMenu />
            
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Wyniki Badań</h1>
              <p className="text-slate-600">Udostępnij swoje wyniki medyczne lekarzom</p>
            </div>

            {/* Desktop Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upload Area - Spans 2 cols on desktop */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl p-8 border-2 border-dashed border-teal-300 shadow-lg hover:border-teal-400 transition-colors">
                  <div className="text-center">
                    <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload size={40} className="text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Prześlij Swoje Wyniki Badań</h3>
                    <p className="text-slate-600 mb-6">Przeciągnij i upuść pliki tutaj lub kliknij, aby przeglądać</p>
                    <Button className="bg-teal-700 hover:bg-teal-800 text-white px-8">Wybierz Pliki</Button>
                  </div>
                </div>

                {/* Recent Uploads */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Ostatnio Przesłane</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentTests.map((test) => (
                      <div key={test.id} className="p-4 bg-slate-50 rounded-xl hover:bg-teal-50 transition-colors flex flex-col">
                        <div className="flex items-start justify-between mb-3 flex-grow">
                          <div className="flex gap-3">
                            <div className="bg-teal-100 p-2 rounded-lg h-fit">
                              <FileText size={20} className="text-teal-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-800">{test.name}</h4>
                              <p className="text-xs text-slate-500">{test.type} • {test.date}</p>
                            </div>
                          </div>
                          {test.status === 'reviewed' ? (
                            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full h-fit">
                              <CheckCircle size={12} />
                              Sprawdzone
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full h-fit">
                              <Clock size={12} />
                              Oczekujące
                            </span>
                          )}
                        </div>
                        <Button variant="outline" className="w-full text-teal-700 border-teal-200 hover:bg-teal-50 text-sm">
                          Zobacz Raport
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Supported Formats */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Obsługiwane Formaty</h3>
                  <div className="space-y-3">
                    {supportedFormats.map((format, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                        <div className="bg-teal-100 p-2 rounded-lg">
                          <format.icon size={20} className="text-teal-600" />
                        </div>
                        <span className="font-medium text-slate-700">{format.type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Wskazówki</h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-teal-600 mt-0.5 shrink-0" />
                      <span>Upewnij się, że pliki są wyraźnie zeskanowane</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-teal-600 mt-0.5 shrink-0" />
                      <span>Maksymalny rozmiar pliku: 25MB</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-teal-600 mt-0.5 shrink-0" />
                      <span>Usuń dane osobowe jeśli potrzeba</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
