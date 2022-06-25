import Hero from "../components/landing_page/hero";
import Services from "../components/landing_page/services";

export default function Home({user, setUser}) {
  return (
    <>
      <Hero />
      <Services />
    </>
  );
}
