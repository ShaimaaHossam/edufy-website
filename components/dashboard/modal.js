import React from "react";
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
            {meeting.class}
          </Typography>
          <Typography
            id="modal-modal-title"
            className="font-bold"
            variant="h7"
            component="h2"
          >
            {meeting.date}
          </Typography>
          <div className="mt-12 flex ">
            <div className="mr-12 ">
              <PieChart classData={meeting.data} />
              <Analysis data={meeting.data} />
            </div>
            <div className="w-1/2 mt-0">
            <Students  students={meeting.attendance}/>
            </div>
            
          </div>
        </Box>
      </Modal>
    </div>
  );
}
