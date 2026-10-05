import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { Booking } from "@/components/sections/Booking";
import { Location } from "@/components/sections/Location";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { MobileBookingBar } from "@/components/ui/MobileBookingBar";
import { PoleMarquee } from "@/components/ui/PoleMarquee";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="contenido">
        <Hero />
        <PoleMarquee />
        <Services />
        <Team />
        <Gallery />
        <Reviews />
        <PoleMarquee rotate="rotate-1" />
        <Booking />
        <Location />
        <Faq />
      </main>
      <Footer />
      <MobileBookingBar />
    </>
  );
}
