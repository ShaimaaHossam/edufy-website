export default function Analysis({ data }) {
  return (
    <div className="w-1/2 text-start mx-12">
      <div className="max-w-2xl mx-auto mt-4">
        <div className="flex flex-col">
          <div className=" shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed ">
                  <thead className="bg-gray-100 ">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
                      >
                        Class
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                      >
                        Students
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
                      >
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    <tr className="hover:bg-gray-100 ">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        Attentive
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                        {data[0]}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        {(
                          (data[0] / (data[0] + data[1] + data[2] + data[3])) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100 ">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        Inattentive
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                        {data[1]}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        {(
                          (data[1] / (data[0] + data[1] + data[2] + data[3])) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100 ">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        Sleepy
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                        {data[2]}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        {(
                          (data[2] / (data[0] + data[1] + data[2] + data[3])) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100 ">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        Confused
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
                        {data[3]}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        {(
                          (data[3] / (data[0] + data[1] + data[2] + data[3])) *
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
