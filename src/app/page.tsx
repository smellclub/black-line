import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { PoleBand } from "@/components/sections/PoleBand";
import { Prices } from "@/components/sections/Prices";
import { Booking } from "@/components/sections/Booking";
import { Location } from "@/components/sections/Location";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="contenido">
        <Hero />
        <PoleBand />
        <Prices />
        <Booking />
        <Location />
      </main>
      <Footer />
    </>
  );
}
