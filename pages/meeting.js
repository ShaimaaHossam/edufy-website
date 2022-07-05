import { useContext, useEffect, useState } from 'react';

import { Paper, SwipeableDrawer } from '@mui/material';
import { useRouter } from "next/router";
import StudentContext from '../contexts/StudentContext';

import axios from 'axios';

const Meeting = () => {

    const { meetingId, studentName } = useContext(StudentContext);
    // const [instructor, setInstructor] = useState(null)
    const [meetingUrl, setMeetingUrl] = useState('')
    const [token, setToken] = useState('')
    const [isloading, setIsloading] = useState(true)
    const debug = false

    const generateMeetingToken = async () => {
        const token = await axios.get('https://edufy-backend-nodejs.herokuapp.com/get-token')
        setToken(token.data.token);
        setIsloading(false)
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        generateMeetingToken();
        if (!user) {
            setMeetingUrl(`https://edufy-meeting-platform.vercel.app/?token=${token}&name=${studentName}&joinScreenEnabled=true&meetingId=${meetingId}&webcamEnabled=true&micEnabled=false&debug=${debug}&isInstructor=false`);
            return;
        };

        setMeetingUrl(`https://edufy-meeting-platform.vercel.app/?token=${token}&name=${user.name}&joinScreenEnabled=false&meetingId=${meetingId}&webcamEnabled=true&micEnabled=false&debug=${debug}&participantCanEndMeeting=true&whiteboardEnabled=true&canRemoveOtherParticipant=true&canDrawOnWhiteboard=true&canToggleWhiteboard=true&canPin=true&joinWithoutUserInteraction=true&isInstructor=true`);
    }, [token, studentName, meetingId, debug])

    if (isloading) return null;
    return (
        <div className="w-screen h-screen flex justify-center items-center">

            <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                title="map"
                scrolling="no"
                allow="camera;microphone;display-capture"
                src={meetingUrl}></iframe>

        </div>
    );
};

export default Meeting;