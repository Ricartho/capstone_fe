import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function Root(){
    return(
        <Box sx={{
            minHeight:'100vh',
            minWidth:'100vw',
            overflowX:'hidden',
            overflowY:'hidden',
            backgroundColor:'#0c0d0d',
          
        }}>
            <Box sx={{
                height:'100vh',
                margin:'1%',
                width:'100%',
                border:'1px solid red',
              }}>
                <Outlet />

            </Box>
        </Box>
    );
}
export default Root;