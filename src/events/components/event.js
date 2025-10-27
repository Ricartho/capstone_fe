import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";

const Event = ({event}) => {

    return(

        <Box sx={{
            
            width:'80%',
            margin:'0 auto',
            backgroundColor:'#ffffff',
            borderRadius:'30px',
            overflowX:'hidden',
            overflowY:'hidden',
            // border:'3px solid blue'
        }}>
            
            <Card 
                elevation={3}  
                square={false} 
                sx={{
                    textAlign:'center',
                    color:"#0c0d0d", 
            }}>
                <CardContent>
                    <CardActionArea>
                        <Typography variant="h6" fontWeight="bold">
                            {event.title}
                        </Typography>
                        <Typography variant="h6">
                            September 10,2025 - 11AM
                        </Typography>
                        <Typography variant="h6">
                             {event.location}
                        </Typography>
                    </CardActionArea>
                   
                    
                </CardContent>
             
            </Card>
        </Box>
    );
};
export default Event;