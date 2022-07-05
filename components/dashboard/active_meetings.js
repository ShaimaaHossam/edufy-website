import PieChart from "./pie_chart";
import React, { useState, useEffect } from "react";
import Analysis from "./tables/analysis";
import Students from "./tables/students";
import axios from 'axios'

export default function ActiveMeetings({meetings}) {
  const [active, setActive] = useState(0)
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([])
  useEffect(()=>{
    if(meetings.data.filter(meeting => meeting.ended)){
      setActive(1)
    }
  })
  return (
    <div className="mt-4">
    
     {active == 1 ?
       <div>
         <span className="px-6 py-1 mx-20 text-lg font-bold text-green-800 bg-green-200 rounded-full">Active Meeting </span>
      <div className="flex mx-20 mt-12">
        <div className="w-1/2">
          <h1 className="font-bold text-center text-gray-500">
            Students Evaluation
          </h1>
          <PieChart classData={data} />
        </div>
       <Analysis data={data} />
      </div>
      <div className="mt-12 ">
           <div className="py-12 mx-20 ">
                <h1 className="text-xl font-bold text-gray-500">Class Attendance</h1>
                <div className="mt-8">
                <Students students={students} />
                </div>
                
           </div>
      </div>
       </div> :
       <div className="">
         <span className="px-6 py-1 mx-20 text-lg font-bold text-red-800 bg-red-200 rounded-full">No current active meetings</span>
       </div>
    }
    </div>
  );
}
