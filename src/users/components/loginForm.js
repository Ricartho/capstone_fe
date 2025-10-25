import React,{useState} from "react";
import { useNavigate } from "react-router-dom";


import { Box,Button,Card,CardContent,colors,InputBase,Typography } from "@mui/material";


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

const LoginForm = ({onLogIn}) =>{

    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogIn(email,password);
        setEmail('');
        setPassword('');
        navigate('/');
    }
    return(
        <Box sx={{
            width:'50%',
            margin:'0 auto',
            // marginTop:'10%'
        }}>
            <Card square={false} variant="outlined" elevation={2} sx={{backgroundColor:"#0c0d0d",}}>
                <CardContent>
                    <Typography variant="h3" style={labelStyle}> Login</Typography>

                    <form autoComplete="off" onSubmit={handleSubmit}>

                        <Typography variant="h6" color= "#ffffff" sx={{marginBottom:'3%'}}>Email</Typography>
                        <InputBase
                            sx={{ width:'60%',color:"#ffffff", borderBottom:'1px solid #ffffff',marginBottom:'3%'}}
                            inputProps={{ maxLength: 20 }}
                            type="string"   
                            placeholder="Type your email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Typography variant="h6"  color= "#ffffff" sx={{marginBottom:'3%'}}>Password</Typography>
                         <InputBase
                            sx={{ width:'60%',color:"#ffffff", borderBottom:'1px solid #ffffff',marginBottom:'3%'}}
                            inputProps={{ maxLength: 20 }}
                            type="password"   
                            placeholder="Type your password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            
                        />
                        <Typography> <Button variant="outlined" type="submit" sx={{color:'#ffffff',marginBottom:'3%'}}>LogIn</Button></Typography>
                        
                    </form>
                    <Typography  variant="bpdy1" color= "#ffffff">Don't have an account yet? <a href="/register" style={linkStyle} color="#fae632"> SIGN UP </a></Typography>

                </CardContent>
            </Card>
        </Box>
      
    );
}
export default LoginForm;