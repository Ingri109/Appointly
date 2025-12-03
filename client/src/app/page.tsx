import Main from "@/components/Main";
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-custom1">
      <Menu />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto bg-custom1">
          <Main />
        </main>
        <Footer />
      </div>
    </div>
  );
}
