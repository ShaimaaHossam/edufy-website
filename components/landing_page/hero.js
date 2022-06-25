import Link from "next/link";
export default function Hero() {
  return (
    <>
      <div className="relative m-0 ">
        <div className="w-full overflow-clip hero-height md:opacity-50 opacity-20">
          <picture src="/img.jpg">
            <source srcSet="/img.jpg" type="image/jpg" />
            <img src="/img.jpg" alt="Landscape picture"  className="w-full h-full object-fill" />
          </picture>
        </div>
        <div className="lg:w-1/3 absolute top-0 mt-6   md:pt-40 py-10 md:ml-8  px-8 ">
          <p className=" text-start text-2xl md:text-4xl font-extrabold text-gray-900">
            Modern learning solutions for today&apos;s{" "}
            <span className="text-violet-800">digital world</span>
          </p>
          <p className=" mt-3 text-gray-500 sm:mt-5 md:mt-5 text-lg md:text-xl ">
            Today, learning doesn&apos;t need to be confined to a classroom or a
            lecture hall.
          </p>
          <div className="mt-5 md:mt-12">
            <Link href="/join-meeting" passHref>
              <a className="bg-gray-800 hover:bg-gray-900 text-center mt-1 text-base text-white font-bold px-8 py-3 rounded-md lg:px-12 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xlhover:bg-gray-900 transition">
                Meet Now
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}