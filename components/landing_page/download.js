import Link from "next/link";

export default function Download(){
    return(
        <div className="bg-indigo-600 w-full py-20 text-center md:text-left flex justify-center flex-wrap px-12">
            <div>
            <p className="text-white text-3xl font-bold">Are you a student?</p>
            <p className="text-gray-200 text-lg">Join your class now through the meeting ID provided by your teacher</p>
            </div>
            <div className="py-6 mt-6 md:mt-0 ml-0 md:ml-12">
                <Link href="/join-meeting" passHref>
                    <a className="text-xl mx-auto bg-white text-indigo-600 font-bold rounded px-6 py-2 shadow-md">Join Meeting</a>
                </Link>
            </div>
        </div>
    );
}