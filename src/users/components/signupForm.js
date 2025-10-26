import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

import { Box,Button,Card,CardContent,InputBase,Typography } from "@mui/material";

    const labelStyle = {
        color: "#ffffff",
        backgroundColor: "#fae632",
        fontWeight:"bold",
        fontStyle:"normal",
        marginBottom: '5%'
    };

    const linkStyle = {
        color:"#fae632",
        textDecoration: "none",
    };


    const SignupForm = ({onSignUp}) => {

    const navigate = useNavigate();

    const [studentNB,setStudentNB] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignUp(studentNB,email,password);
        setStudentNB('')
        setEmail('');
        setPassword('');
        navigate('/');
    }
    return(
        <Box sx={{
            width:'80%',
            height:'80%',
            margin:'0 auto',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            marginTop:'5%',
            // border: '1px solid white',
        }}>
            <Card 
                square={false} 
                variant="outlined" 
                elevation={2} 
                sx={{
                    backgroundColor:"#0c0d0d",
                    width:'100%'
                }}>
              
                <CardContent>
                    <Typography variant="h3" style={labelStyle}> Register</Typography>

                    <form autoComplete="off" onSubmit={handleSubmit}>

                        <Typography variant="h6" color= "#ffffff" sx={{marginBottom:'3%'}}>Student Number</Typography>
                        <InputBase
                            sx={{ width:'60%',color:"#ffffff", borderBottom:'1px solid #ffffff',marginBottom:'3%'}}
                            inputProps={{ maxLength: 20 }}
                            type="string"   
                            placeholder="Type your student number"
                            value={studentNB}
                            required
                            onChange={(e) => setStudentNB(e.target.value)}
                        />
                        <Typography>Email</Typography>
                        <InputBase
                            sx={{ width:'60%',color:"#ffffff", borderBottom:'1px solid #ffffff',marginBottom:'3%'}}
                            inputProps={{ maxLength: 20 }}
                            type="string"   
                            placeholder="Type your email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Typography>Password</Typography>
                         <InputBase
                            sx={{ width:'60%',color:"#ffffff", borderBottom:'1px solid #ffffff',marginBottom:'3%'}}
                            inputProps={{ maxLength: 20 }}
                            type="password"   
                            placeholder="Type your password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            
                        />
                        <Typography> <Button variant="outlined" type="submit" sx={{color:'#ffffff',marginBottom:'3%'}}>Register</Button></Typography>
                        
                    </form>
                    <Typography  variant="bpdy1" color= "#ffffff">Already have an account? <a href="/" style={linkStyle} color="#fae632"> LOG IN </a></Typography>

                </CardContent>
            </Card>
        </Box>
      
    );
};

export default SignupForm;