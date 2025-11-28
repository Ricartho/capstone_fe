import React from "react";
import { Outlet } from "react-router-dom";
import{Box } from "@mui/material";




function Root(){
    return(
        <Box
         sx={{
            backgroundColor: "black",
            color: "white",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflowX: "hidden",
          }}
         >
            <Outlet />
        </Box>
    );
}
export default Root;