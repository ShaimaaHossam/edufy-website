import { useContext, useEffect, useState } from "react";

import { Button, Grid, IconButton, Paper, SwipeableDrawer, Typography } from '@mui/material';
import { useRouter } from "next/router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import StudentContext from "../contexts/StudentContext";
export default function MeetingLayout({ children }) {
    const Router = useRouter();
    // const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const { meetingId, courseTitle } = useContext(StudentContext);
    const [user, setUser] = useState(null)
    const [state, setState] = useState({ left: false });
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return
        setUser(user);
    }, [])

    return (
        <>
            <div className="fixed top-4 left-4">
                <IconButton onClick={() => Router.back()} size="large">
                    <ArrowBackIcon className="text-white" fontSize="inherit" />
                </IconButton>
                {
                    user && courseTitle != '' && (

                        <IconButton onClick={toggleDrawer('left', true)} size="large">
                            <LineAxisIcon className="text-white" fontSize="inherit" />
                        </IconButton>
                    )
                }
            </div>
            {
                user && courseTitle != '' && (

                    <SwipeableDrawer
                        anchor={'left'}
                        open={state['left']}
                        onClose={toggleDrawer('left', false)}
                        onOpen={toggleDrawer('left', true)}

                    >

                        <Grid container spacing={2}>

                            <Grid item xs={6}>
                                <Typography variant="h6" className="text-center">
                                    course title={courseTitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" className="text-center">
                                    meetingId = {meetingId}
                                </Typography>
                            </Grid>
                        </Grid>



                        {/* dashboard code here */}
                    </SwipeableDrawer>
                )
            }
            {children}
        </>
    );
}
