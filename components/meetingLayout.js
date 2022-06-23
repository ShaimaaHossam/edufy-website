import Navbar from "./navbar";
import { IconButton } from '@mui/material';
import { useRouter } from "next/router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function MeetingLayout({ children }) {
    const Router = useRouter();
    return (
        <>
            <div className="fixed top-4 left-4">
                <IconButton onClick={() => Router.back()} size="large">
                    <ArrowBackIcon className="text-white" fontSize="inherit" />
                </IconButton>
            </div>

            {children}
        </>
    );
}