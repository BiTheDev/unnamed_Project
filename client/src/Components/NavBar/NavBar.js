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
      <Link to="/">
          <Typography>UnNamed Project</Typography>
      </Link>
      <Toolbar>
                {user ? (
                    <div>
                        <Avatar  alt={user.result.name} src={user.result.imageUrl}>{user.result.firstName.charAt(0)}</Avatar>
                        <Typography variant="h6">{user.result.firstName}</Typography>
                        <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <div>
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                    </div>
                ) }
            </Toolbar>
      </AppBar>
    </Box>
    )
}

export default NavBar