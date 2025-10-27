import React from "react";
import Event from "./event";


//MUI
import { Box } from "@mui/material";

const EventList = ({events}) => {

    const renderedEvent = events.map(event =>(
        <Event key={event._id} event={event}/>
    ));
    return(
        <Box>
             {renderedEvent}
        </Box>
    );
};
export default EventList;