import Link from "next/link";
import Logo from "../components/logo";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { auth } from "../firebase/firebase-config";
import StudentContext from '../contexts/StudentContext';
import axios from 'axios';
function JoinMeeting() {
  const { studentName, regNumber, meetingId, setStudentName, setRegNumber, setMeetingId, setToken } = useContext(StudentContext);
  const [error, setError] = useState("");
  // const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser != null) {
      router.push("/");
      return null;
    }
  })



  const join = async () => {
    if (studentName == '' || regNumber == '' || meetingId == '') {
      setError("Please enter the required fields");
      return;
    }

    try {
      const token = await axios.get('https://edufy-backend-nodejs.herokuapp.com/get-token')
      setToken(token.data.token);
      router.push('/meeting');
    } catch (e) {
      console.log(e)
    }

    // try {
    //   const user = await signInWithEmailAndPassword(
    //     auth,
    //     loginEmail,
    //     loginPassword
    //   );
    //   console.log(user);
    //   router.replace("/dashboard");
    // } catch (error) {
    //   setError(error.message);
    // }
  };
  if (auth.currentUser != null) {
    router.replace("/");
    return null;
  } else
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#212032] px-6">

          <div className="flex flex-col bg-[#32305a] shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-2 rounded-md w-full max-w-md">
            {error != '' ? (<p className="text-red mx-auto text-red-200 font-semibold my-4">
              {error}
            </p>) : (<></>)}
            <div className="my-10">
              <div className="flex flex-col mb-6 ">
                <label
                  htmlFor="meeting"
                  className="mb-1 text-sm  tracking-wide text-white"
                >
                  Meeting ID:
                </label>
                <div >
                  <input
                    id="meeting"
                    type="text"
                    name="meeting"
                    className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Meeting ID"
                    onChange={(e) => setMeetingId(e.target.value)}
                  />
                </div>
              </div>


              <div className="flex flex-col mb-6">
                <label
                  htmlFor="name"
                  className="mb-1 text-sm  tracking-wide text-white"
                >
                  Name:
                </label>
                <div >
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your name"
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-8">
                <label
                  htmlFor="password"
                  className="mb-1 text-sm  tracking-wide text-white"
                >
                  Registration Number:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>

                  <input
                    id="regNumber"
                    type="number"
                    name="regNumber"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Reg Number"
                    onChange={(e) => setRegNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex w-full mt-2">
                <button
                  onClick={join}
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">join</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </>
    );
}
export default JoinMeeting;
