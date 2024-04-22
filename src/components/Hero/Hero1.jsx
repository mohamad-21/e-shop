import { Link } from "react-router-dom"
import Title from '../Title';
import AnimatedCard from '../AnimatedCard';

function Hero1() {
  return (
    <div className="bg-cover bg-center text-white h-screen py-16 px-8 max-md:h-auto" style={{
      backgroundImage: "linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.65)), url('assets/backgrounds/hero-section.jpg')"
    }}>
      <div className="flex items-center justify-around gap-12 max-md:flex-col-reverse">
        <AnimatedCard fadeStyle="from-left" className="flex flex-col items-start gap-5 max-w-sm max-md:items-center max-md:text-center">
          <Title style="text-2xl max-md:text-xl">Up to 50% Off</Title>
          <h1 className="text-5xl leading-[1.125] max-md:text-4xl max-md:leading-[1.3]">
            Grab Your Favorites Before They're Gone
          </h1>
          <small className="text-sm leading-6">
            You can trust us to bring you the latest technology at unbeatable prices. Don’t miss this limited-time opportunity to upgrade your audio game. Grab your perfect pair now!
          </small>
          <Link to="/shop" className="bg-blue-500 py-2.5 px-6 text-center rounded transition hover:opacity-75 focus:ring-2 font-medium uppercase">Shop Now</Link>
        </AnimatedCard>
        <AnimatedCard fadeStyle="from-right" className="shrink-0 max-w-xs max-md:max-w-[250px]">
          <img src="/assets/images/headphone-1.png" alt="banner" />
        </AnimatedCard>
      </div>
    </div>
  )
}

export default Hero1