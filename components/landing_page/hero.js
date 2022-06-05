import Link from "next/link";
import Image from 'next/image'
export default function Hero() {
  return (
    <>
      <div className="lg:flex justify-around  lg:px-0  mt-20 lg:mt-4 ">
        <div className="lg:w-1/2 my-auto text-center px-8 relative">
          {
            /***
             *  <div className="lg:hidden w-72 mix-blend-multiply absolute filter blur-2xl h-72 bg-cyan-100 rounded-full -bottom-1"></div>
          <div className="lg:hidden w-72 mix-blend-multiply absolute filter blur-2xl h-72 bg-purple-200 -right-16 -top-1 rounded-full"></div> */
          }
          <p className=" text-start text-4xl md:text-5xl font-extrabold text-gray-900">
            Modern learning solutions for today&apos;s{" "}
            <span className="text-violet-600 ">digital world</span>
          </p>
          <p className="text-center mt-3 text-gray-500 sm:mt-5  sm:max-w-xl sm:mx-auto md:mt-5 text-lg md:text-xl ">
            Today, learning doesn&apos;t need to be confined to a classroom or a
            lecture hall.
          </p>
          <div className="mt-12">
            <Link href="/" passHref>
              <a className="bg-gray-800 hover:bg-gray-900 text-center mt-3 text-base text-white font-bold px-8 py-3 rounded-md lg:px-12 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xlhover:bg-gray-900 transition">
                Download Now
              </a>
            </Link>
          </div>
        </div>
        <div className="lg:w-2/5 lg:p-12 lg:block mt-12 lg:mt-0 px-8 lg:px-0">
          <Image alt="heroimg" className="w-full h-auto shadow-2xl rounded-lg" src="/img1.jpg" />
        </div>
      </div>
    </>
  );
}
