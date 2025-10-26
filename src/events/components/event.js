import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";

const Event = () => {
    return(
        <Box sx={{
            width:'100vw',
        }}>
            <Card elevation={3}  square={false} sx={{
                width:'60%',
                margin:'0 auto',
                backgroundColor:'#ffffff',
                borderRadius:'30px',
                textAlign:'center'
            }}>
                <CardContent>
                    <CardActionArea>
                        <Typography variant="h6" color="#0c0d0d" fontWeight="bold">
                            Test1
                        </Typography>
                        <Typography variant="h6" color="#0c0d0d">
                            Test1
                        </Typography>
                        <Typography variant="h6" color="#0c0d0d">
                            Test1
                        </Typography>
                    </CardActionArea>
                   
                    
                </CardContent>
             
            </Card>
        </Box>
    );
};
export default Event;