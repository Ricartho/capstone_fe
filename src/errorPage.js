import React from "react";
import {Alert,Box} from "@mui/material";
import {useRouteError,isRouteErrorResponse} from "react-router-dom";

function ErrorPage(){

    const error = useRouteError();

    const errorVal = () => {
       if(isRouteErrorResponse(error)){

        if(error.status === 400){
            return <div>Error 400 - Bad request.</div>;
        }
        if(error.status === 404){
            return <div>Error 404 - Not Found.</div>;
        }
        if(error.status === 500){
            return <div>Error 500 - Internal Server Error.</div>;
        }
        if(error.status === 503){
            return <div>Error 503 - Service unvailable.</div>;
        }
       }
        return <div>FATAL ERROR  - Something went wrong, make sure the server is up and running.</div>;
    };
    
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
            <Alert variant="outlined" severity="error" sx={{ mt: 3, backgroundColor: "#2a0000", color: "#ff8080" }}>
                {errorVal()}
            </Alert>
         </Box>
          
    );  
}

export default ErrorPage;