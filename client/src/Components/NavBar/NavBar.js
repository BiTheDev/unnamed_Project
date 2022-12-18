import React,{ useState, useEffect }  from 'react'
import {useNavigate, Link,useLocation} from 'react-router-dom';
import {AppBar, Avatar, Toolbar, Typography,Button,Box,IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
const NavBar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () =>{
        dispatch({type:'LOGOUT'});
        //navigate.push('/');

        setUser(null);
    }


    useEffect(()=>{
        const token = user?.token;

        //JWT
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout();
            }
        }


        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])


    return (
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='inherit'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            UnnamedProject
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    )
}

export default NavBar