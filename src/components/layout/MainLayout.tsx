import Header from "../shared/Header";
import HeroSection from "../shared/HeroSection";
import Footer from "../shared/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-dark text-light">
      <div className="header-container">
        <Header />
        <HeroSection />
      </div>
      <main className="p-6">{children}</main>
      <Footer />
    </div>
  );
}
