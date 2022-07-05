import LeftMenu from "../components/dashboard/left_menu";
import ActiveMeetings from "../components/dashboard/active_meetings";
import PastMeetings from "../components/dashboard/past_meetings";
import Reports from "../components/dashboard/reports";
import Classes from "../components/dashboard/classes";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from 'axios'
export async function getStaticProps()  {
  
  const res = await axios.post('http://edufy-backend.jjdu4f46bt-xlm41rjo56dy.p.runcloud.link/api/user/meetings/all', {"user_id" : 2})
  
  return {
    props: {
      meetings: res.data,
    },
    revalidate: 60
  }
  
}
export default function Dashboard({meetings}) {
  const router = useRouter()
  
  const [menu, setMenu] = React.useState(1);
  const [active, setActive] = React.useState(1); //1 if there is an active meeting
  useEffect(()=>{
    if(!JSON.parse(localStorage.getItem("user"))){
      router.push("/")
    }
  })
  function updateMenu(menu) {
    setMenu(menu);
  }
  return (
    <div className="relative h-full pb-2 ">
      <LeftMenu menu={menu} active={active} updateMenu={updateMenu} />
      <div className="absolute right-0 w-10/12 pt-20 ml-4 bg-white rounded-md">
        <h1 className="pl-20 text-4xl font-medium text-gray-900">Dashboard</h1>
        {menu == 1 ? (
          <Reports />
        ) : menu == 2 ? (
          <ActiveMeetings active={active} meetings={meetings} />
        ) : menu == 3 ? (
          <PastMeetings />
        ) : menu == 4 ? (
          <Classes />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}