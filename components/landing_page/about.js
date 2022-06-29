export default function About() {
  return (
    <div id="about" className="bg-img px-20 text-center py-36 ">
      <p className="text-3xl  font-bold text-gray-900">About Edufy</p>
      <p className="text-gray-500 text-lg md:text-xl mt-3 lg:mx-32">
        Edufy is an emotion-based Elearning platform that aims to improve the online learning experience by making it more practical and interactive.
        The idea is to track the emotion state of the students throughout the online class and provide realtime feedback for the lecturers.</p>
      <div className="mt-12 w-full lg:pl-20 px-12">
        <p className="text-xl text-gray-900 font-semibold">Our Team</p>
        <div className="flex flex-wrap justify-center mt-12">
          <div className="md:flex my-6 lg:w-1/3">
            <picture src="/team/drsherine.jpg">
              <source srcSet="/team/drsherine.jpg" type="image/jpg" />
              <img
                src="/team/drsherine.jpg"
                alt="Landscape picture"
                className="w-36 rounded-full mx-auto"
              />
            </picture>
            <div className=" ml-0 md:ml-5 text-center md:text-left mt-3 md:my-auto">
              <p className="text-indigo-600 font-bold text-lg">
                Dr. Sherine Nagy
              </p>
              <p className="text-gray-500">Supervisor and Coordinator</p>
            </div>
          </div>
          <div className="md:flex my-6 lg:w-1/3">
            <picture src="/team/khaled.jpg">
              <source srcSet="/team/khaled.jpg" type="image/jpg" />
              <img
                src="/team/khaled.jpg"
                alt="Landscape picture"
                className="w-36 rounded-full mx-auto"
              />
            </picture>
            <div className=" ml-0 md:ml-5 text-center md:text-left mt-3 md:my-auto">
              <p className="text-indigo-600 font-bold text-lg">
                Khaled Tag
              </p>
              <p className="text-gray-500">Software Engineer</p>
            </div>
          </div>
          <div className="md:flex my-6 lg:w-1/3">
            <picture src="/team/shaimaa.jpg">
              <source srcSet="/team/shaimaa.jpg" type="image/jpg" />
              <img
                src="/team/shaimaa.jpg"
                alt="Landscape picture"
                className="w-36 rounded-full mx-auto"
              />
            </picture>
            <div className=" ml-0 md:ml-5 text-center md:text-left mt-3 md:my-auto">
              <p className="text-indigo-600 font-bold text-lg">
                Shaimaa Hossam
              </p>
              <p className="text-gray-500">Software Engineer</p>
            </div>
          </div>
          <div className="md:flex my-6 lg:w-1/3">
            <picture src="/team/huda.jpg">
              <source srcSet="/team/huda.jpg" type="image/jpg" />
              <img
                src="/team/huda.jpg"
                alt="Landscape picture"
                className="w-36 rounded-full mx-auto"
              />
            </picture>
            <div className=" ml-0 md:ml-5 text-center md:text-left mt-3 md:my-auto">
              <p className="text-indigo-600 font-bold text-lg">
                Huda Elkhodary
              </p>
              <p className="text-gray-500">Machine Learning Engineer</p>
            </div>
          </div>
          <div className="md:flex my-6 lg:w-1/3">
            <picture src="/team/anis.jpg">
              <source srcSet="/team/anis.jpg" type="image/jpg" />
              <img
                src="/team/anis.jpg"
                alt="Landscape picture"
                className="w-36 rounded-full mx-auto"
              />
            </picture>
            <div className=" ml-0 md:ml-5 text-center md:text-left mt-3 md:my-auto">
              <p className="text-indigo-600 font-bold text-lg">
                Anis Albert
              </p>
              <p className="text-gray-500">Machine Learning Engineer</p>
            </div>
          </div>
          <div className="md:flex my-6 lg:w-1/3">
            <picture src="/team/mohamed.jpg">
              <source srcSet="/team/mohamed.jpg" type="image/jpg" />
              <img
                src="/team/mohamed.jpg"
                alt="Landscape picture"
                className="w-36 rounded-full mx-auto"
              />
            </picture>
            <div className=" ml-0 md:ml-5 text-center md:text-left mt-3 md:my-auto">
              <p className="text-indigo-600 font-bold text-lg">
                Mohamed Adel
              </p>
              <p className="text-gray-500">Documentation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
