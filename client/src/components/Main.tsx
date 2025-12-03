import Link from "next/link";

const Main = () => {
    return (
        <main className="flex flex-col justify-start items-center px-6 py-8 md:py-0">
            <div className="text-center mb-6 md:mt-28">
                <h1 className="text-slate-900 md:text-custom5 text-3xl md:text-[48px] font-bold">Appointly</h1>
                <h2 className="text-slate-600 md:text-custom2 text-base md:text-[20px] font-medium mt-2">
                    Platforma do rezerwacji
                </h2>
            </div>
            <Link 
                href="/Booking" 
                className="w-full md:w-auto bg-teal-700 md:bg-custom3 rounded-2xl md:rounded-xl px-8 md:px-16 py-4 md:py-1.5 text-white md:text-custom1 text-lg md:text-[22px] mt-4 hover:scale-105 hover:bg-teal-800 md:hover:bg-[#2D7C88] focus:bg-teal-900 md:focus:bg-[#00545E] md:focus:text-[#BDC9C0] transition-all text-center"
            >
                Umów wizytę
            </Link>
        </main>
    )
}

export default Main;