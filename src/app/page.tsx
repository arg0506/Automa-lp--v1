import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import LogoCarousel from "@/components/sections/LogoCarousel";
import Vision from "@/components/sections/Vision";
import HowItWorks from "@/components/sections/HowItWorks";
import Problem from "@/components/sections/Problem";
import Principles from "@/components/sections/Principles";
import UseCases from "@/components/sections/UseCases";
import BuiltOnNear from "@/components/sections/BuiltOnNear";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <LogoCarousel />
        <Vision />
        <Problem />
        <HowItWorks />
        <UseCases />
        <Principles />
        <BuiltOnNear />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
