export default function Students({ students }) {
  return (
    <table className="min-w-full divide-y divide-gray-200 table-fixed mt-0 shadow-md overflow-y-scroll">
      <thead className="bg-red-100 ">
        <tr>
          <th
            scope="col"
            className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
          >
            Student
          </th>
          <th
            scope="col"
            className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
          >
            Registration Number
          </th>
          <th
            scope="col"
            className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
          >
            Class
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 ">
        {students.map((student, key) => (
          <tr key={key} className="hover:bg-gray-100 ">
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
              {student.name}
            </td>
            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">
              {student.reg}
            </td>
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">
              {student.class}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
