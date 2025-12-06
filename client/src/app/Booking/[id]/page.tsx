// app/Booking/[id]/page.tsx
"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import Menu from "@/components/Menu";
import Stars from "@/components/Stars";
import { useAppointmentDate } from "@/hooks/useAppointmentDate";
import { GET_STAFF_MEMBER_QUERY } from "@/graphql/queries";

type StaffMember = {
  id: string;
  fullName: string;
  email: string;
  roomNumber: number;
  specialty: string;
  dateOfBirth?: string;
};

type StaffMemberResponse = {
  staffMember: StaffMember;
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function WorkerPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const { data, loading, error } = useQuery<StaffMemberResponse>(GET_STAFF_MEMBER_QUERY, {
    variables: { id },
    skip: !id,
  });

  const { getDefaultDateTime, getMinDateTime } = useAppointmentDate();
  const [value, setValue] = useState(getDefaultDateTime());
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;
    
    setSubmitting(true);
    try {
      // TODO: Implement appointment booking via GraphQL mutation when server supports it
      alert("Rezerwacja powiodła się!");
      router.push("/Visits");
    } catch (err) {
      console.error(err);
      alert("Wystąpił nieoczekiwany błąd.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Ładowanie danych specjalisty...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.staffMember) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl text-red-600 mb-4">Błąd</h2>
          <p>{error?.message || "Nie znaleziono specjalisty"}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Powrót
          </button>
        </div>
      </div>
    );
  }

  const staff = data.staffMember;

  return (
    <main className="flex">
      <Menu />
      <section className="flex-1 px-5 py-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Informacje o pracowniku */}
          <div className="flex items-start mb-8">
            <div className="w-48 h-48 bg-gray-500 rounded-full" />
            <div className="ml-8 flex-1">
              <h2 className="text-3xl font-bold text-custom5">
                {staff.fullName}
              </h2>
              <div className="mt-4 space-y-2">
                <p>
                  <span className="font-semibold text-custom3">E-mail: </span>
                  <span className="font-semibold text-custom5">
                    {staff.email}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-custom3">Gabinet: </span>
                  <span className="font-semibold text-custom5">
                    {staff.roomNumber}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-custom3">Specjalizacja: </span>
                  <span className="font-semibold text-custom5">
                    {staff.specialty || "Specjalista"}
                  </span>
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-custom5">5.0</span>
                  <Stars stylesStar="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-b border-black py-4 mb-6 text-center">
            <h3 className="text-4xl font-semibold text-custom2">Opis</h3>
            <p className="mt-2 text-custom5 font-semibold">
              {staff.specialty ? `Specjalista z dziedziny: ${staff.specialty}` : "Doświadczony specjalista"}
            </p>
          </div>

          <div className="flex flex-row justify-between items-end lg:flex-row gap-8 w-full lg:w-1/1">
            {/* Schedule table */}
            <div className="flex-1 bg-[#E8F5F2] p-4 rounded-2xl border-2 border-[#004D5A]">
              <h4 className="text-xl font-bold text-[#003237] mb-4 text-center">
                Dni i godziny pracy
              </h4>
              <table className="w-full border-separate border-spacing-y-2">
                <tbody>
                  {[
                    ["Poniedziałek", "08:00 - 16:00"],
                    ["Wtorek", "08:00 - 16:00"],
                    ["Środa", "08:00 - 16:00"],
                    ["Czwartek", "08:00 - 16:00"],
                    ["Piątek", "08:00 - 16:00"],
                    ["Sobota", "Nie pracujemy"],
                    ["Niedziela", "Nie pracujemy"],
                  ].map(([day, hours]) => (
                    <tr
                      key={day}
                      className="bg-white rounded-lg overflow-hidden hover:scale-105 hover:shadow-lg hover:p"
                    >
                      <td className="px-2 py-1 text-[12px] font-semibold text-[#004D5A]">
                        {day}
                      </td>
                      <td className="px-2 py-1 text-[12px] font-semibold text-[#2AA79B] text-right">
                        {hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Date-picker form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-md border border-gray-300"
            >
              <label
                htmlFor="visit-date"
                className="block mb-2 text-lg font-semibold text-[#004D5A]"
              >
                Wybierz datę wizyty:
              </label>
              <input
                type="datetime-local"
                value={value}
                onChange={handleChange}
                min={getMinDateTime()}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />

              <button
                type="submit"
                disabled={submitting}
                className="bg-[#00545E] hover:bg-[#2D7C88] text-custom1 text-lg font-semibold py-2 px-10 rounded-xl mt-3 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Rezerwowanie..." : "Zarezerwuj termin"}
              </button>
            </form>
          </div>
        </div>

        <footer className="text-center text-sm text-custom3.2 mt-8">
          Since 2025© Creators: Pavlo Satsyk & Orest Muzyka
          <br />
          <a
            href="mailto:Appointly.support.team@gmail.com"
            className="underline hover:text-custom3.1"
          >
            Appointly.support.team@gmail.com
          </a>
        </footer>
      </section>
    </main>
  );
}