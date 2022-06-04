import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Logo from "./logo";
import Dropdown from '../components/dropdown';
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
    setDropdown(false)
  }
  return (
    <>
      {/**Large Screens */}
      <div className="w-full flex justify-between shadow-md py-4">
        {/** LOGO */}
        <div className="ml-16">
          <Logo />
        </div>
        {/**LINKS */}
        <FontAwesomeIcon
          icon={faAlignJustify}
          onClick={switchFlag}
          className="text-gray-400 lg:hidden my-2 cursor-pointer z-20"
        />
        <div className="hidden lg:block mr-16">
          <ul className="text-gray-700 flex">
            <li className="lg:mr-6 hover:cursor-pointer hover:border-b-2 border-gray-200">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="lg:mr-6 hover:cursor-pointer hover:border-b-2 border-gray-200">
              <Link href="/#about">
                <a>About Us</a>
              </Link>
            </li>
            <li className="lg:mr-6 hover:cursor-pointer hover:border-b-2 border-gray-200">
              <Link href="/pricing">
                <a>Pricing</a>
              </Link>
            </li>
            <li className="lg:mr-6 hover:cursor-pointer hover:border-b-2 border-gray-200">
              <Link href="/contact-us">
                <a>Contact Us</a>
              </Link>
            </li>
            <li className="lg:mr-6 hover:cursor-pointer border-l-2 px-4 border-gray-200">
              {user ? (
                <p onClick={()=>setDropdown(!dropdown)}>{user.email}</p>
              ) : (
                <Link href="/login">
                  <a>Log In</a>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      {dropdown ? <Dropdown closeMenu={closeMenu} /> : null}
    
      {/**Medium and Small Screens */}
      <ul
        className={
          flag === 1
            ? "absolute top-1  z-10 w-full h-full lg:hidden bg-gray-200  py-8 rounded-b-xl transition"
            : "hidden"
        }
      >
        <li
          onClick={switchFlag}
          className=" border-b-2 border-gray-100 text-center py-4"
        >
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li
          onClick={switchFlag}
          className="border-b-2 border-gray-100 text-center py-4"
        >
          <Link href="/#about">
            <a>About Us</a>
          </Link>
        </li>
        <li
          onClick={switchFlag}
          className=" border-b-2 border-gray-100 text-center py-4  "
        >
          <Link href="/pricing">
            <a>Pricing</a>
          </Link>
        </li>
        <li onClick={switchFlag} className=" text-center py-4  ">
          <Link href="/contact-us">
            <a>Contact Us</a>
          </Link>
        </li>
        <li
          onClick={switchFlag}
          className="text-white text-center font-bold  my-12"
        >
          <Link href="/login">
            <a className="bg-purple-600 px-12 rounded-md py-2 mb-48">Log In</a>
          </Link>
        </li>
      </ul>
    </>
  );
}
