import { useEffect } from "react";

export default function Analysis({ data }) {
  useEffect(()=>{console.log(data)})
  return (
    <div className="w-1/3 mx-12 text-start">
      <div className="max-w-2xl mx-auto mt-4">
        <div className="flex flex-col">
          <div className="shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed ">
                  <thead className="bg-gray-100 ">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                      >
                        Students
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
                      >
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    <tr className="hover:bg-gray-100 ">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        Anger
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                        {data[0]}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        {(
                          (data[0] / (data[0] + data[1] + data[2] + data[3] +data[4] + data[5] + data[6] )) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100 ">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        Disgust
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                        {data[1]}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        {(
                          (data[1] / (data[0] + data[1] + data[2] + data[3] +data[4] + data[5] + data[6])) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100 ">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        Fear
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                        {data[2]}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        {(
                          (data[2] / (data[0] + data[1] + data[2] + data[3] +data[4] + data[5] + data[6] )) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100 ">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        Happy
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                        {data[3]}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        {(
                          (data[3] / (data[0] + data[1] + data[2] + data[3] +data[4] + data[5] + data[6] )) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100 ">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        Sad
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                        {data[3]}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        {(
                          (data[4] / (data[0] + data[1] + data[2] + data[3] +data[4] + data[5] + data[6] )) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100 ">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        Surprise
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                        {data[3]}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        {(
                          (data[5] / (data[0] + data[1] + data[2] + data[3] +data[4] + data[5] + data[6] )) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100 ">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        Contempt
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                        {data[3]}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        {(
                          (data[6] / (data[0] + data[1] + data[2] + data[3] +data[4] + data[5] + data[6] )) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
