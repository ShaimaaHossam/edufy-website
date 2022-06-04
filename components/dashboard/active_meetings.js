import PieChart from "./pie_chart";
import React, { useState, useEffect } from "react";
import Analysis from "./tables/analysis";
import Students from "./tables/students";
import { db } from "../../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function ActiveMeetings({active}) {
  const [data, setData] = useState([12, 6, 2, 10]);
  const [students, setUsers] = useState([]);
  const studentsCollectionRef = collection(db, "students");

  useEffect(() => {
    const getStudents = async () => {
      const data = await getDocs(studentsCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getStudents();
  }, []);
  function updateData(data) {
    setData(data);
  }
  return (
    <div className="mt-4">
     {active == 1 ?
       <div>
         <span className="mx-20 bg-green-200 text-green-800 font-bold px-6  py-1 rounded-full text-lg">Active Meeting</span>
      <div className="mt-12 flex mx-20">
        <div className="w-1/2">
          <h1 className="text-center text-gray-500 font-bold">
            Students Evaluation
          </h1>
          <PieChart classData={data} />
        </div>
       <Analysis data={data} />
      </div>
      <div className=" mt-12 ">
           <div className="mx-20 py-12 ">
                <h1 className="font-bold text-xl text-gray-500">Class Attendance</h1>
                <div className="mt-8">
                <Students students={students} />
                </div>
                
           </div>
      </div>
       </div> :
       <div className="">
         <span className="mx-20 bg-red-200 text-red-800 font-bold px-6  py-1 rounded-full text-lg">No current active meetings</span>
       </div>
    }
    </div>
  );
}
