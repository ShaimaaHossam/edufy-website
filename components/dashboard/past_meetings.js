import BasicModal from "./modal";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
export default function PastMeetings() {
  const [open, setOpen] = React.useState(false);
  const [meeting, setMeeting] = React.useState([]);
  const [meetings, setMeetings] = React.useState([]);
  const router = useRouter();
  const handleOpen = (meeting) => {
    setMeeting(meeting);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  

  return (
    <div className="mt-4 mx-20">
      <span className=" bg-blue-200 text-blue-800 font-bold px-6  py-1 rounded-full text-lg">
        Past Meetings
      </span>

      <ul className="mt-12 ">
        {meetings.map((meeting, key) => (
          <li
            key={key}
            onClick={() => handleOpen(meeting)}
            className="flex shadow-md py-8 mt-4 px-8 cursor-pointer"
          >
            <div className="mr-12">
              <svg
                fill="#9d9da0"
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="50"
                height="50"
              >
                <path d="M22.2,2.163a4.992,4.992,0,0,0-4.1-1.081l-3.822.694A4,4,0,0,0,12,3.065,4,4,0,0,0,9.716,1.776L5.9,1.082A5,5,0,0,0,0,6V16.793a5,5,0,0,0,4.105,4.919l6.286,1.143a9,9,0,0,0,3.218,0L19.9,21.712A5,5,0,0,0,24,16.793V6A4.983,4.983,0,0,0,22.2,2.163ZM11,20.928c-.084-.012-.168-.026-.252-.041L4.463,19.745A3,3,0,0,1,2,16.793V6A3,3,0,0,1,5,3a3.081,3.081,0,0,1,.54.049l3.82.7A2,2,0,0,1,11,5.712Zm11-4.135a3,3,0,0,1-2.463,2.952l-6.285,1.142c-.084.015-.168.029-.252.041V5.712a2,2,0,0,1,1.642-1.968l3.821-.7A3,3,0,0,1,22,6Z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-gray-600 text-lg">
                {meeting.meetingTitle}
              </h1>
              <p>Room ID: {meeting.meetingRoomId}</p>
            </div>
          </li>
        ))}
      </ul>
      <BasicModal handleClose={handleClose} open={open} meeting={meeting} />
    </div>
  );
}
