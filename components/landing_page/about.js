export default function About() {
  return (
    <div id="about" className="bg-img px-20 text-center py-36 ">
      <p className="text-3xl  font-bold text-gray-900">About Edufy</p>
      <p className="text-gray-500 text-lg md:text-xl mt-3 lg:mx-32">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
      <div className="mt-12 px-12">
        <p className="text-xl text-gray-900 font-semibold">Our Team</p>
        <div className="flex flex-wrap justify-around mt-12">
        <div className="md:flex my-6 mx-6">
          <picture src="">
                <source srcSet="" type="image/jpg" />
                <img
                  src=""
                  alt="Landscape picture"
                  className="w-36 rounded-full"
                />
              </picture>
              <div className="my-auto ml-0 md:ml-5 text-center md:text-left mt-3 md:mt-0">
                <p className="text-indigo-600 font-bold text-lg">Dr. Sherine Nagy</p>
                <p className="text-gray-500">Supervisor and Coordinator</p>
              </div>
          </div>
          <div className="md:flex my-6 mx-6">
          <picture src="">
                <source srcSet="" type="image/jpg" />
                <img
                  src=""
                  alt="Landscape picture"
                  className="w-36 rounded-full"
                />
              </picture>
              <div className="my-auto ml-0 md:ml-5 text-center md:text-left mt-3 md:mt-0">
                <p className="text-indigo-600 font-bold text-lg">Khaled Tag</p>
                <p className="text-gray-500">Software Engineer</p>
              </div>
          </div>
          <div className="md:flex my-6 mx-6">
          <picture src="/shaimaa.jpg">
                <source srcSet="/shaimaa.jpg" type="image/jpg" />
                <img
                  src="/shaimaa.jpg"
                  alt="Landscape picture"
                  className="w-36 rounded-full"
                />
              </picture>
              <div className="my-auto ml-0 md:ml-5 text-center md:text-left mt-3 md:mt-0">
                <p className="text-indigo-600 font-bold text-lg">Shaimaa Hossam</p>
                <p className="text-gray-500">Software Engineer</p>
              </div>
          </div>
          
          <div className="md:flex my-6 mx-6">
          <picture src="">
                <source srcSet="" type="image/jpg" />
                <img
                  src=""
                  alt="Landscape picture"
                  className="w-36 rounded-full"
                />
              </picture>
              <div className="my-auto ml-0 md:ml-5 text-center md:text-left mt-3 md:mt-0">
                <p className="text-indigo-600 font-bold text-lg">Huda Elkhodary</p>
                <p className="text-gray-500">Machine Learning Engineer</p>
              </div>
          </div>
          <div className="md:flex my-6 mx-6">
          <picture src="">
                <source srcSet="" type="image/jpg" />
                <img
                  src=""
                  alt="Landscape picture"
                  className="w-36 rounded-full"
                />
              </picture>
              <div className="my-auto ml-0 md:ml-5 text-center md:text-left mt-3 md:mt-0">
                <p className="text-indigo-600 font-bold text-lg">Anis Albert</p>
                <p className="text-gray-500">Machine Learning Engineer</p>
              </div>
          </div>
          <div className="md:flex my-6 mx-6">
          <picture src="">
                <source srcSet="" type="image/jpg" />
                <img
                  src=""
                  alt="Landscape picture"
                  className="w-36 rounded-full"
                />
              </picture>
              <div className="my-auto ml-0 md:ml-5 text-center md:text-left mt-3 md:mt-0">
                <p className="text-indigo-600 font-bold text-lg">Mohamed Adel</p>
                <p className="text-gray-500">Documentation</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
