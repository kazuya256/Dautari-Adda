import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      <Hero />
      <WhyUs />
    </div>
  );
}

