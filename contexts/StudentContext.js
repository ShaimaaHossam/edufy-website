import { createContext, useState, useEffect } from "react";

const StudentContext = createContext();

export function StudentProvider({ children }) {
    const [studentName, setStudentName] = useState("")
    const [meetingId, setMeetingId] = useState("")
    const [token, setToken] = useState("")
    const [regNumber, setRegNumber] = useState(null)
    //for instructor
    const [courseTitle, setCourseTitle] = useState('')
    return (<StudentContext.Provider value={{
        studentName,
        setStudentName,
        regNumber,
        setRegNumber,
        token,
        setToken,
        meetingId,
        setMeetingId,
        courseTitle,
        setCourseTitle
    }} >
        {children}
    </StudentContext.Provider>)
}

export default StudentContext;