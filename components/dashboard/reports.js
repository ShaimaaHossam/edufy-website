import PieChart from "./pie_chart";
import React from 'react'
import Analysis from "./tables/analysis"
export default function Reports() {
  const [data, setData] = React.useState([100, 82, 10, 17])
  return (
    <div className="mt-4 mx-20">
      <span className=" bg-violet-200 text-violet-800 font-bold px-6  py-1 rounded-full text-lg">
        Reports
      </span>
      <div className="mt-12 flex mx-20">
        <div className="w-1/2">
          <h1 className="text-center text-gray-500 font-bold">
            Students Evaluation
          </h1>
          <PieChart classData={data} />
        </div>
        <Analysis data={data} />
      </div>
    </div>
  );
}
