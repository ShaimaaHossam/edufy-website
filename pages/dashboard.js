import LeftMenu from "../components/dashboard/left_menu";
import ActiveMeetings from "../components/dashboard/active_meetings";
import PastMeetings from "../components/dashboard/past_meetings";
import Reports from "../components/dashboard/reports";
import Classes from "../components/dashboard/classes";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
export default function Dashboard() {
  const router = useRouter()
  
  const [menu, setMenu] = React.useState(1);
  const [active, setActive] = React.useState(1); //1 if there is an active meeting
  function updateMenu(menu) {
    setMenu(menu);
  }
  return (
    <div className=" h-full pb-2 relative ">
      <LeftMenu menu={menu} active={active} updateMenu={updateMenu} />
      <div className="ml-4 w-10/12 absolute right-0 bg-white rounded-md  pt-20">
        <h1 className="text-4xl pl-20 font-medium  text-gray-900">Dashboard</h1>
        {menu == 1 ? (
          <Reports />
        ) : menu == 2 ? (
          <ActiveMeetings active={active} />
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
