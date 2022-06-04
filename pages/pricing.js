import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'
export default function Pricing() {
    return (
       <div className="pb-20 ">
       <div className="w-full text-center  py-20  ">
          <h1 className="text-4xl md:text-4xl font-extrabold text-gray-900 ">Ready to use Edufy?</h1>
          <p className="text-2xl font-medium text-gray-500 mt-3">Choose the right plan for you, and make the most of our service!</p>
        </div>

        <div className="md:flex justify-around align-baseline">
            <div className="bg-white rounded-2xl  shadow-xl w-1/2 mx-2">
              <h1 className="bg-gray-100 w-32 font-bold mx-12 mt-12 text-purple-600 rounded-full px-4 py-2 text-start ">Free</h1>
              <h1 className="text-5xl mt-4 text-gray-900 mx-12 font-extrabold">$0 <span className="font-medium text-gray-400 text-2xl">/mo</span></h1>
              <p className="mt-12 text-gray-500 mx-12 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
              <div className="bg-gray-100 mt-12 rounded-b-2xl px-12 py-6">
                <div className="flex align-middle mb-2">
                <FontAwesomeIcon className="mt-2 mr-4 text-green-500" icon={faCheck} />
                <p className="text-gray-600"><span className="font-bold">Free</span> feature</p>
                </div>
                <div className="flex align-middle mb-2">
                <FontAwesomeIcon className="mt-2 mr-4 text-green-500" icon={faCheck} />
                <p className="text-gray-600"><span className="font-bold">Free</span> feature</p>
                </div><div className="flex align-middle mb-2">
                <FontAwesomeIcon className="mt-2 mr-4 text-green-500" icon={faCheck} />
                <p className="text-gray-600"><span className="font-bold">Free</span> feature</p>
                </div>

                <div className="mt-12">
                <Link href="/pricing"><a className="bg-purple-600 px-12 py-2 rounded-md font-bold text-white">Choose Plan</a></Link>
                </div>
                
              </div>
            </div>
            <div className="bg-purple-500 rounded-2xl  shadow-xl w-1/2 mx-2 relative">
              <h1 className="bg-gray-100 w-32 mx-12 mt-12 font-bold text-purple-600 rounded-full px-4 py-2 text-start">Standard</h1>
              <h1 className="text-5xl mt-4 mx-12 text-white font-extrabold">$49 <span className="font-medium text-gray-200 text-2xl">/mo</span></h1>
              <p className="mt-12 mx-12 text-white ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
              <div className="bg-purple-300 mt-12 px-12 py-6 rounded-b-2xl absolute bottom-0 w-full">
                <div className="flex align-middle mb-2">
                <FontAwesomeIcon className="mt-2 mr-4 text-green-500 font-extrabold" icon={faCheck} />
                <p className="text-gray-900"><span className="font-bold">Standard</span> feature</p>
                </div>
                <div className="flex align-middle mb-2">
                <FontAwesomeIcon className="mt-2 mr-4 text-green-500 font-extrabold" icon={faCheck} />
                <p className="text-gray-900"><span className="font-bold">Standard</span> feature</p>
                </div>
                <div className="flex align-middle mb-2">
                <FontAwesomeIcon className="mt-2 mr-4 text-green-500 font-extrabold" icon={faCheck} />
                <p className="text-gray-900"><span className="font-bold">Standard</span> feature</p>
                </div>
                <div className="flex align-middle mb-2">
                <FontAwesomeIcon className="mt-2 mr-4 text-green-500 font-extrabold" icon={faCheck} />
                <p className="text-gray-900"><span className="font-bold">Standard</span> feature</p>
                </div>
                <div className="mt-12 ml-4">
                <Link href="/pricing"><a className="bg-white px-12 py-2 rounded-md font-bold text-purple-600 shadow-md text-xl">Choose Plan</a></Link>
                </div>
                
              </div>
            </div>
            <div className="bg-white rounded-2xl  shadow-xl w-1/2 mx-2 relative">
              <h1 className="bg-gray-100 w-32 font-bold mx-12 mt-12 text-purple-600 rounded-full px-4 py-2 text-start ">Premium</h1>
              <h1 className="text-5xl mt-4 text-gray-900 mx-12 font-extrabold">$75 <span className="font-medium text-gray-400 text-2xl">/mo</span></h1>
              <p className="mt-12 text-gray-500 mx-12 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
              <div className="bg-gray-100 mt-12 rounded-b-2xl px-12 py-8 absolute bottom-0 w-full">
                <div className="flex align-middle mb-2">
                <FontAwesomeIcon className="mt-2 mr-4 text-green-500" icon={faCheck} />
                <p className="text-gray-600"><span className="font-bold">Premium</span> feature</p>
                </div>
                <div className="flex align-middle mb-2">
                <FontAwesomeIcon className="mt-2 mr-4 text-green-500" icon={faCheck} />
                <p className="text-gray-600"><span className="font-bold">Premium</span> feature</p>
                </div><div className="flex align-middle mb-2">
                <FontAwesomeIcon className="mt-2 mr-4 text-green-500" icon={faCheck} />
                <p className="text-gray-600"><span className="font-bold">Premium</span> feature</p>
                </div>

                <div className="mt-12">
                <Link href="/pricing"><a className="bg-purple-600 px-12 py-2 rounded-md font-bold text-white">Choose Plan</a></Link>
                </div>
                
              </div>
            </div>
        </div>
       </div>
        
    )
  }
  