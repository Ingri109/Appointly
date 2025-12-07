"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  CreditCard,
  Wallet,
  Building2,
  CheckCircle,
  ArrowLeft,
  Shield,
  Clock,
  Receipt,
  Calendar,
  User,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

// Mock payment history data
const paymentHistory = [
  {
    id: 1,
    date: "2025-12-01",
    description: "Konsultacja - Dr. Kowalski",
    amount: 150,
    status: "paid",
  },
  {
    id: 2,
    date: "2025-11-25",
    description: "Badania laboratoryjne",
    amount: 85,
    status: "paid",
  },
  {
    id: 3,
    date: "2025-11-20",
    description: "Wizyta kontrolna",
    amount: 120,
    status: "paid",
  },
];

// Mock pending payments
const pendingPayments = [
  {
    id: 1,
    dueDate: "2025-12-10",
    description: "Konsultacja Online - Dr. Nowak",
    amount: 100,
  },
  {
    id: 2,
    dueDate: "2025-12-15",
    description: "Plan Ubezpieczeniowy - Grudzień",
    amount: 200,
  },
];

const paymentMethods = [
  { id: "card", name: "Karta płatnicza", icon: CreditCard, description: "Visa, Mastercard, Maestro" },
  { id: "blik", name: "BLIK", icon: Wallet, description: "Szybki przelew BLIK" },
  { id: "transfer", name: "Przelew bankowy", icon: Building2, description: "Tradycyjny przelew" },
];

export default function PaymentPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "history" | "methods">("pending");
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      
      <main className="flex-1 px-4 md:px-8 py-6 md:py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button - Mobile Only */}
          <Link 
            href="/" 
            className="md:hidden inline-flex items-center text-teal-600 hover:text-teal-700 mb-4 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">Powrót</span>
          </Link>

          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              Płatności
            </h1>
            <p className="text-slate-600 text-sm md:text-base">
              Zarządzaj swoimi płatnościami i metodami płatności
            </p>
          </div>

          {/* Summary Card */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 mb-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-teal-100 text-sm mb-1">Do zapłaty</p>
                <p className="text-3xl md:text-4xl font-bold">{totalPending} PLN</p>
                <p className="text-teal-200 text-sm mt-2">
                  {pendingPayments.length} oczekujące płatności
                </p>
              </div>
              <button 
                className="bg-white text-teal-700 px-6 py-3 rounded-xl font-semibold hover:bg-teal-50 transition-colors flex items-center justify-center gap-2"
                onClick={() => setActiveTab("pending")}
              >
                <CreditCard className="w-5 h-5" />
                Zapłać teraz
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl">
            {[
              { id: "pending", label: "Oczekujące", icon: Clock },
              { id: "history", label: "Historia", icon: Receipt },
              { id: "methods", label: "Metody płatności", icon: CreditCard },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all
                  ${activeTab === tab.id 
                    ? 'bg-white text-teal-700 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800'}`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Pending Payments Tab */}
          {activeTab === "pending" && (
            <div className="space-y-4">
              {pendingPayments.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Wszystko opłacone!</h3>
                  <p className="text-slate-500">Nie masz żadnych oczekujących płatności.</p>
                </div>
              ) : (
                <>
                  {pendingPayments.map((payment) => (
                    <div 
                      key={payment.id}
                      className={`bg-white rounded-2xl p-4 md:p-6 shadow-sm border-2 transition-all cursor-pointer
                        ${selectedPayment === payment.id ? 'border-teal-500' : 'border-transparent hover:border-slate-200'}`}
                      onClick={() => setSelectedPayment(selectedPayment === payment.id ? null : payment.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-amber-100 rounded-xl">
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800">{payment.description}</h3>
                            <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                              <Calendar className="w-3 h-3" />
                              Termin: {new Date(payment.dueDate).toLocaleDateString('pl-PL')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-slate-800">{payment.amount} PLN</p>
                          <ChevronRight className={`w-5 h-5 text-slate-400 ml-auto transition-transform ${selectedPayment === payment.id ? 'rotate-90' : ''}`} />
                        </div>
                      </div>

                      {/* Expanded Payment Options */}
                      {selectedPayment === payment.id && (
                        <div className="mt-6 pt-6 border-t border-slate-100">
                          <p className="text-sm font-medium text-slate-700 mb-3">Wybierz metodę płatności:</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                            {paymentMethods.map((method) => (
                              <button
                                key={method.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedMethod(method.id);
                                }}
                                className={`p-3 rounded-xl border-2 text-left transition-all
                                  ${selectedMethod === method.id 
                                    ? 'border-teal-500 bg-teal-50' 
                                    : 'border-slate-200 hover:border-teal-300'}`}
                              >
                                <method.icon className={`w-5 h-5 mb-2 ${selectedMethod === method.id ? 'text-teal-600' : 'text-slate-600'}`} />
                                <p className="font-medium text-sm text-slate-800">{method.name}</p>
                              </button>
                            ))}
                          </div>
                          <button 
                            className={`w-full py-3 rounded-xl font-semibold transition-all
                              ${selectedMethod 
                                ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                            disabled={!selectedMethod}
                          >
                            Zapłać {payment.amount} PLN
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Payment History Tab */}
          {activeTab === "history" && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {paymentHistory.length === 0 ? (
                <div className="p-8 text-center">
                  <Receipt className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Brak historii</h3>
                  <p className="text-slate-500">Nie masz jeszcze żadnych płatności.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="p-4 md:p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">{payment.description}</h3>
                          <p className="text-sm text-slate-500">
                            {new Date(payment.date).toLocaleDateString('pl-PL', { 
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-800">{payment.amount} PLN</p>
                        <span className="text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                          Opłacone
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === "methods" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-4">Zapisane metody płatności</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-8 h-8 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-800">•••• •••• •••• 4242</p>
                        <p className="text-sm text-slate-500">Ważna do 12/26</p>
                      </div>
                    </div>
                    <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">Domyślna</span>
                  </div>
                </div>

                <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-teal-500 hover:text-teal-600 transition-colors font-medium">
                  + Dodaj nową metodę płatności
                </button>
              </div>

              {/* Security Note */}
              <div className="flex items-start gap-3 p-4 bg-slate-100 rounded-xl">
                <Shield className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600">
                  Twoje dane płatnicze są bezpieczne. Wszystkie transakcje są szyfrowane i przetwarzane przez certyfikowanych operatorów płatności.
                </p>
              </div>
            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
