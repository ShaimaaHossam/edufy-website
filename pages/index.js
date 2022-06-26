import Hero from "../components/landing_page/hero";
import Services from "../components/landing_page/services";
import Download from "../components/landing_page/download";
import About from "../components/landing_page/about";
export default function Home({user, setUser}) {
  return (
    <>
      <Hero />
      <Services />
      <Download />
      <About />
    </>
  );
}
