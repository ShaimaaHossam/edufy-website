import Link from "next/link";
export default function Hero() {
  return (
    <>
      <div className="relative m-0 ">
        
        <div className="w-full h-96 md:h-auto md:opacity-50 opacity-20">
          <picture src="/img.jpg" className="w-full">
            <source srcSet="/img.jpg" type="image/jpg" />
            <img src="/img.jpg" alt="Landscape picture"  className="w-full h-full object-fit" />
          </picture>
        </div>
        <div className="absolute top-0 px-8 py-10 mt-12 lg:w-1/3 md:pt-40 md:ml-8 ">
          <p className="mt-3 text-2xl font-extrabold text-gray-900  text-start md:text-4xl">
            Modern learning solutions for today&apos;s{" "} digital world
          </p>
          <p className="mt-3 text-lg text-gray-500  sm:mt-5 md:mt-5 md:text-xl">
            Today, learning doesn&apos;t need to be confined to a classroom or a
            lecture hall.
          </p>
          <div className="mt-5 md:mt-12">
            <Link href="/join-meeting" passHref>
              <a className="px-8 py-3 mt-1 text-base font-bold text-center text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700 lg:px-12 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xlhover:bg-gray-900">
                Join Meeting
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}