export default function Students({ students }) {
  return (
    <table className="min-w-full mt-0 overflow-y-scroll divide-y divide-gray-200 shadow-md table-fixed">
      <thead className="bg-red-100 ">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
          >
            Student
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
          >
            Registration Number
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
          >
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 ">
        {students.map((student, key) => (
          <tr key={key} className="hover:bg-gray-100 ">
            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
              {student.name}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
              {student.reg_number}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
              {student.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
