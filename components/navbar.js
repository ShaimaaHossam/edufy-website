import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Logo from "./logo";
import Dropdown from "../components/dropdown";
import { auth } from "../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
export default function Navbar() {
  const [flag, setFlag] = useState(0);
  const [user, setUser] = useState({});
  const [dropdown, setDropdown] = useState(false);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  function switchFlag() {
    flag === 0 ? setFlag(1) : setFlag(0);
  }
  function closeMenu() {
    setDropdown(false);
  }
  return (
    <>
      <nav className="  px-2 sm:px-4 py-2.5  bg-gray-900 relative">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className="ml-16">
            <Logo />
          </div>
          <button
            onClick={switchFlag}
            type="button"
            className="inline-flex items-center p-2 mr-6 text-sm text-gray-500 rounded-lg lg:hidden focus:outline-none focus:ring-2  dark:text-gray-400 "
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={
              flag == 1
                ? "w-full  absolute top-16 left-0 bg-gray-900 z-20 pb-6"
                : "hidden lg:block"
            }
            id="mobile-menu"
          >
            <ul className="flex flex-col lg:flex-row mt-4 md:mt-0 md:text-sm ">
              <li>
                <Link href="/" passHref>
                  <a
                  
                    className="block py-2 pr-4 pl-3 text-gray-200 border-b lg:border-0 border-gray-100  "
                    aria-current="page"
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="#about" passHref>
                <a
                
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-200 border-b border-gray-100 lg:border-0  "
                >
                  About
                </a>
                </Link>
                
              </li>
              <li>
                <Link href="/pricing" passHref>
                <a
                
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-200 border-b border-gray-100 lg:border-0  "
                >
                  Pricing
                </a>
                </Link>
              </li>
              <li>
                <Link href="#contact" passHref>
                <a
                
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-200 border-b border-gray-100 lg:border-0  "
                >
                  Contact
                </a>
                </Link>
                
              </li>
              <li>
                <Link href="/sign-up" passHref>
                <a
                
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-200  lg:border-l-2 "
                >
                  Sign Up
                </a>
                </Link>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
