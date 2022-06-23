import { useContext } from 'react';
import { Paper } from '@mui/material';
import { useRouter } from "next/router";
import StudentContext from '../contexts/StudentContext';

const Meeting = () => {
    const { token, meetingId, studentName } = useContext(StudentContext);
    const debug = false
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
                src={`https://edufy-prebuilt.vercel.app/?token=${token}&name=${studentName}&joinScreenEnabled=true&meetingId=${meetingId}&webcamEnabled=true&micEnabled=false&debug=${debug}`}></iframe>

        </div>
    );
};

export default Meeting;