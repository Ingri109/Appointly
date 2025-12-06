'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Shield, AlertCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import { LOGIN_STAFF_MUTATION } from '@/graphql/mutations';

type Staff = {
  id: string;
  fullName: string;
  email: string;
  specialty: string;
};

type LoginStaffResponse = {
  loginStaff: {
    accessToken: string;
    user: Staff;
  };
};

export default function DoctorLoginPage() {
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const [loginStaff, { loading }] = useMutation<LoginStaffResponse>(LOGIN_STAFF_MUTATION, {
    onCompleted: (data) => {
      // Store the access token and user data
      localStorage.setItem('staffToken', data.loginStaff.accessToken);
      localStorage.setItem('staffUser', JSON.stringify(data.loginStaff.user));
      router.push('/DoctorDashboard');
    },
    onError: (err) => {
      setError(err.message || 'Nieprawidłowy ID lub hasło');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await loginStaff({
        variables: {
          input: {
            id: staffId,
            password,
          },
        },
      });
    } catch {
      // Error handled by onError callback
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-2xl mb-4 shadow-lg">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Portal dla Lekarzy
            </h1>
            <p className="text-slate-600">
              Bezpieczny dostęp dla personelu medycznego
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Zaloguj się
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="staffId" className="block text-sm font-medium text-slate-700 mb-2">
                  ID Pracownika
                </label>
                <input
                  id="staffId"
                  type="text"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  placeholder="Wprowadź swój ID pracownika"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Hasło
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Wprowadź hasło"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logowanie...' : 'Zaloguj się'}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-start gap-3">
                <Shield size={18} className="text-slate-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-600">
                  <p className="font-medium text-slate-700 mb-1">Informacja o bezpieczeństwie</p>
                  <p>To jest bezpieczny portal dla autoryzowanego personelu medycznego. Dane logowania są dostarczane przez administratora systemu.</p>
                </div>
              </div>
            </div>

            {/* Support Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Problem z logowaniem?{' '}
                <a href="mailto:support@appointly.com" className="text-teal-600 hover:text-teal-700 font-medium">
                  Skontaktuj się z IT
                </a>
              </p>
            </div>
          </div>

          {/* Patient Portal Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Pacjent?{' '}
              <a href="/Login" className="text-teal-600 hover:text-teal-700 font-medium">
                Przejdź do portalu pacjenta
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
