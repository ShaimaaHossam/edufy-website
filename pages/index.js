import Hero from "../components/landing_page/hero";
import About from "../components/landing_page/about";
import Download from "../components/landing_page/download";

export default function Home({user, setUser}) {
  return (
    <>
      <Hero />
      <About />
      <Download />
    </>
  );
}
