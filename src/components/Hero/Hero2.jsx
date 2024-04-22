import { Link } from "react-router-dom"
import AnimatedCard from '../AnimatedCard';

function Hero2() {
  return (
    <AnimatedCard className="bg-cover bg-center text-darkblue font-normal h-screen py-16 px-8 max-lg:h-auto">
      <div className="flex w-full h-full justify-around gap-8 max-lg:flex-col-reverse max-lg:items-center">
        <div className="w-full flex flex-col items-start gap-5 max-w-xs max-lg:max-w-md max-md:max-w-sm max-lg:items-center max-lg:text-center">
          <h1 className="text-5xl leading-tight max-md:text-3xl max-sm:text-2xl">
          Save big: <span className="text-blue-500">Up to 75% Off</span> on Headphones
          </h1>
          <small className="text-sm leading-6">
          You can trust us to bring you the latest technology at unbeatable prices. Don’t miss this limited-time opportunity to upgrade your audio game.
          </small>
          <Link to="/shop" className="bg-blue-500 text-white py-2.5 px-6 text-center rounded transition hover:opacity-75 focus:ring-2 font-medium uppercase">Shop Now</Link>
        </div>
        <div className="max-w-lg max-lg:max-w-full">
          <img src="/assets/backgrounds/headphone.jpg" className="w-full h-full object-cover" alt="banner" />
        </div>
      </div>
    </AnimatedCard>
  )
}

export default Hero2