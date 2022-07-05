import Link from "next/link";
import Logo from "../components/logo";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import StudentContext from '../contexts/StudentContext';
import axios from "axios";

function JoinMeeting() {
  const { studentName, regNumber, meetingId, setStudentName, setRegNumber, setMeetingId, courseTitle, setCourseTitle } = useContext(StudentContext);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return
    setUser(user);
  }, [])

  const join = () => {
    if (studentName == '' || regNumber == '' || meetingId == '') {
      setError("Please enter the required fields");
      return;
    }

    try {
      router.push('/meeting');
    } catch (e) {
      console.log(e)
    }
  };

  const create = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (meetingId == '') {
      setError("Please enter the required fields");
      return;
    }
    try {
      const res = await axios.post('http://edufy-backend.jjdu4f46bt-xlm41rjo56dy.p.runcloud.link/api/meeting/create', {
        user_id: user.id,
        meeting_id: meetingId,
        courseTitle: courseTitle
      })
      console.log(res);
      if (res.status == 200) {
        router.push('/meeting');
      }
    } catch (e) {
      console.log(e)
    }
  };

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
                  placeholder={user ? "create Meeting ID" : "Meeting ID"}
                  onChange={(e) => setMeetingId(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label
                htmlFor="name"
                className="mb-1 text-sm  tracking-wide text-white"
              >
                {user ? 'Course Title' : 'Name'}:
              </label>
              <div >
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder={user ? 'course title' : 'Enter you name'}
                  onChange={(e) => user ? setCourseTitle(e.target.value) : setStudentName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full mt-2">
              <button
                onClick={user ? create : join}
                className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
              >
                <span className="mr-2 uppercase">{user ? 'create' : 'join'}</span>
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
