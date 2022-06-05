import Link from "next/link";
import { auth } from "../../firebase/firebase-config";
import {useRouter} from 'next/router';
export default function LeftMenu({ menu, active,  updateMenu,  }) {
  const router = useRouter();
  const logout = async () => {
    await auth.signOut();
    router.push('/')
}
  return (
    <div className="w-44 h-screen  fixed  flex flex-col  content-center    bg-gray-900  py-12   text-white">
        <Link href="/">
          <svg
            className="mx-auto  my-6 mb-20 hover:cursor-pointer"
            width="100"
            height="36"
            viewBox="0 0 158 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.443182 35V0.0909081H23.1477V5.39205H6.76705V14.8693H21.9716V20.1705H6.76705V29.6989H23.2841V35H0.443182ZM41.429 35H29.5994V0.0909081H41.6676C45.1335 0.0909081 48.1108 0.789772 50.5994 2.1875C53.0994 3.57386 55.0199 5.56818 56.3608 8.17045C57.7017 10.7727 58.3722 13.8864 58.3722 17.5114C58.3722 21.1477 57.696 24.2727 56.3438 26.8864C55.0028 29.5 53.0653 31.5057 50.5312 32.9034C48.0085 34.3011 44.9744 35 41.429 35ZM35.9233 29.5284H41.1222C43.554 29.5284 45.5824 29.0852 47.2074 28.1989C48.8324 27.3011 50.054 25.9659 50.8722 24.1932C51.6903 22.4091 52.0994 20.1818 52.0994 17.5114C52.0994 14.8409 51.6903 12.625 50.8722 10.8636C50.054 9.09091 48.8438 7.76705 47.2415 6.89205C45.6506 6.00568 43.6733 5.5625 41.3097 5.5625H35.9233V29.5284ZM86.3864 0.0909081H92.7102V22.8977C92.7102 25.3977 92.1193 27.5966 90.9375 29.4943C89.767 31.392 88.1193 32.875 85.9943 33.9432C83.8693 35 81.3864 35.5284 78.5455 35.5284C75.6932 35.5284 73.2045 35 71.0795 33.9432C68.9545 32.875 67.3068 31.392 66.1364 29.4943C64.9659 27.5966 64.3807 25.3977 64.3807 22.8977V0.0909081H70.7045V22.3693C70.7045 23.8239 71.0227 25.1193 71.6591 26.2557C72.3068 27.392 73.2159 28.2841 74.3864 28.9318C75.5568 29.5682 76.9432 29.8864 78.5455 29.8864C80.1477 29.8864 81.5341 29.5682 82.7045 28.9318C83.8864 28.2841 84.7955 27.392 85.4318 26.2557C86.0682 25.1193 86.3864 23.8239 86.3864 22.3693V0.0909081ZM99.5838 35V0.0909081H121.947V5.39205H105.908V14.8693H120.413V20.1705H105.908V35H99.5838ZM125.322 0.0909081H132.464L141.004 15.5341H141.345L149.885 0.0909081H157.027L144.328 21.9773V35H138.021V21.9773L125.322 0.0909081Z"
              fill="url(#paint0_linear_2_29)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2_29"
                x1="-3"
                y1="18"
                x2="159"
                y2="18"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#5976DB" />
                <stop offset="1" stopColor="#A86363" />
              </linearGradient>
            </defs>
          </svg>
        </Link>

        <ul className="mx-auto">
        <li
          onClick={() => {
            updateMenu(1);
          }}
          className={menu == 1 ? "my-4 bg-gray-600 text-center hover:cursor-pointer mx-auto py-4  rounded-sm" : "my-4 text-center hover:cursor-pointer hover:bg-gray-600 mx-auto py-4  rounded-sm"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            className="mx-auto mb-1"
            fill="#adadaf"
          >
            <g id="_01_align_center" data-name="01 align center">
              <path d="M24,24H3a3,3,0,0,1-3-3V0H2V21a1,1,0,0,0,1,1H24Z" />
              <rect x="14" y="11" width="2" height="9" />
              <rect x="6" y="11" width="2" height="9" />
              <rect x="18" y="6" width="2" height="14" />
              <rect x="10" y="6" width="2" height="14" />
            </g>
          </svg>

          <p className="text-sm">Reports</p>
        </li>
      
          <li
          onClick={() => {
            updateMenu(2);
          }}
          className={menu == 2 ? "bg-gray-600 my-4 text-center hover:cursor-pointer mx-auto py-4  rounded-sm" : "my-4 text-center hover:cursor-pointer hover:bg-gray-600 mx-auto py-4  rounded-sm"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="#adadaf"
            className="mx-auto mb-1"
          >
            <path d="M20.494,7.968l-9.54-7A5,5,0,0,0,3,5V19a5,5,0,0,0,7.957,4.031l9.54-7a5,5,0,0,0,0-8.064Zm-1.184,6.45-9.54,7A3,3,0,0,1,5,19V5A2.948,2.948,0,0,1,6.641,2.328,3.018,3.018,0,0,1,8.006,2a2.97,2.97,0,0,1,1.764.589l9.54,7a3,3,0,0,1,0,4.836Z" />
          </svg>
          <p className="text-sm">Active Meeting</p>
        </li>
        <li
          onClick={() => {
            updateMenu(3);
          }}
          className={menu == 3 ? "my-4 bg-gray-600 text-center hover:cursor-pointer mx-auto py-4  rounded-sm" : "my-4 text-center hover:cursor-pointer hover:bg-gray-600 mx-auto py-4  rounded-sm"}>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="#adadaf"
            className="mx-auto mb-1"
          >
            <path d="M10.42,20.656a3.77,3.77,0,0,1-2.233-.735l-6.641-4.87a3.784,3.784,0,0,1,0-6.1l6.641-4.87A3.783,3.783,0,0,1,14.2,6.853l3.782-2.774A3.784,3.784,0,0,1,24,7.13v9.74a3.784,3.784,0,0,1-6.021,3.051L14.2,17.147a3.79,3.79,0,0,1-3.777,3.509Zm2.787-6.475a1,1,0,0,1,.592.194l5.363,3.933A1.784,1.784,0,0,0,22,16.87V7.13a1.785,1.785,0,0,0-2.839-1.438L13.8,9.625a1,1,0,0,1-1.592-.806V7.13A1.784,1.784,0,0,0,9.369,5.692l-6.64,4.87a1.783,1.783,0,0,0,0,2.876l6.64,4.87a1.784,1.784,0,0,0,2.838-1.438V15.181a1,1,0,0,1,1-1Z" />
          </svg>
          <p className="text-sm">Past Meetings</p>
        </li>
       
        
        
        <li
          onClick={logout}
          className={menu == 7 ? "my-4  text-center hover:cursor-pointer mx-auto py-4  rounded-sm" : "my-4 text-center hover:cursor-pointer  mx-auto py-4  rounded-sm"}>
        
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            className="mx-auto mb-1"
            fill="#adadaf"
          >
            <path d="M22.829,9.172,18.95,5.293a1,1,0,0,0-1.414,1.414l3.879,3.879a2.057,2.057,0,0,1,.3.39c-.015,0-.027-.008-.042-.008h0L5.989,11a1,1,0,0,0,0,2h0l15.678-.032c.028,0,.051-.014.078-.016a2,2,0,0,1-.334.462l-3.879,3.879a1,1,0,1,0,1.414,1.414l3.879-3.879a4,4,0,0,0,0-5.656Z" />
            <path d="M7,22H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7A1,1,0,0,0,7,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7a1,1,0,0,0,0-2Z" />
          </svg>

          <p className="text-sm">Sign Out</p>

          
        </li>
        </ul>
       
        
        

       
        
        
    
    </div>
  );
}
