import Hero from "@/components/Hero";
import About from "@/components/About";
import Dining from "@/components/Dining";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      <Hero />
      <About />
      <Dining />
      <Gallery />
    </div>
  );
}
