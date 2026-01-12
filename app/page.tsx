import Hero from "@/components/Hero";
import About from "@/components/About";
import Dining from "@/components/Dining";
import Gallery from "@/components/Gallery";
import WhyUs from "@/components/WhyUs";
import Reservation from "@/components/Reservation";

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      <Hero />
      <About />
      <WhyUs />
      <Dining />
      <Gallery />
      <Reservation />
    </div>
  );
}
