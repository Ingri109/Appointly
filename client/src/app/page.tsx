import Main from "@/components/Main";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-custom1">
      <Header />
      <main className="flex-1 flex flex-col overflow-y-auto bg-custom1">
        <Main />
      </main>
      <Footer />
    </div>
  );
}
