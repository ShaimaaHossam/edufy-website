import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PieChart from "./pie_chart";
import Analysis from "./tables/analysis";
import Students from "./tables/students";

const style = {
  overflowY: "scroll",
  overflowX: "scroll",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ handleClose, open, meeting }) {
  const initializeDataArray = () => {
    let dataArray = [0, 0, 0, 0, 0, 0, 0];
    if(meeting.students){
    meeting.students.map((student) => {
      if (student.status === 'Anger') {
        dataArray[0] += 1;
      } else if (student.status === 'Disgust') {
        dataArray[1] += 1;
      } else if (student.status === 'Fear') {
        dataArray[2] += 1;
      } else if (student.status === 'Happy') {
        dataArray[3] += 1;
      }  else if (student.status === 'Sad') {
        dataArray[4] += 1;
      } else if (student.status === 'Surprise') {
        dataArray[5] += 1;
      } else if (student.status === 'Contempt') {
        dataArray[6] += 1;
      } 
      
    })};
    return dataArray;
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            className="font-bold"
            variant="h5"
            component="h2"
          >
            {meeting.courseTitle}
          </Typography>
          <Typography
            id="modal-modal-title"
            className="font-bold"
            variant="h7"
            component="h2"
          >
           Date: {}
          </Typography>
          <div className="flex flex-col mt-12">
            <div className="flex w-1/2 mb-12 mr-12">
              <PieChart classData={initializeDataArray()} />
              <Analysis data={initializeDataArray()} />
            </div>
            <div className="w-1/2 mt-0">
              <h1 className="mb-4">Class Attendance:</h1>
            <Students  students={meeting.students}/>
            </div>
            
          </div>
        </Box>
      </Modal>
    </div>
  );
}
