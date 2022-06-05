import Link from "next/link";
import { auth } from "../firebase/firebase-config";
import { useRouter } from "next//router";
export default function Dropdown({closeMenu}) {
    const router = useRouter();
    const logout = async () => {
        await auth.signOut();
        closeMenu();
        router.push('/')
    }
  return (
    <>
      <div className="absolute right-0 z-10 bg-white shadow-md px-8 py-4 mr-20">
        <div className="mb-4 ">
        <Link href="/dashboard" passHref>
            <div className="flex hover:cursor-pointer">
          <svg
            className="mr-2 h-5 w-5 mt-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
            <a>Dashboard</a>
            </div>
          </Link>
        </div>
        <div  onClick={closeMenu} className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg>
          
            <p className="hover:cursor-pointer" onClick={logout}>Sign Out</p>
          
        </div>
      </div>
    </>
  );
}
