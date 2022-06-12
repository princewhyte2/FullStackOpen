/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, {
  useState, useEffect,
} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { LoadingButton } from '@mui/lab';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BlogsPage from './pages/Blogs';
import UserPage from './pages/Users';
import UserBlogPage from './pages/Userblog';
import BlogPage from './pages/Blog';
import { setNotification } from './redux/reducers/notificationReducers';
import { getBlogs } from './redux/reducers/blogreducers';
import { setUser, login, logout } from './redux/reducers/userreducers';
import TestPage from './pages/Test';

const LoginCard = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  padding: '24px',
  lineHeight: '60px',
}));

const App = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  useEffect(() => {
    dispatch(setUser());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username || !password) return;
    setIsLoading(true);
    try {
      await dispatch(login(username, password));
      setUsername('');
      setPassword('');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(setNotification({ type: 'error', message: 'Wrong username or password' }, 5));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const notificationComponent = () => (
    <Alert severity={notification.type}>
      <strong>{ notification.message }</strong>
    </Alert>
  );

  if (user === null) {
    return (
      <TestPage />
      // <Box sx={{
      //   width: '100%',
      //   height: '100vh',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   backgroundColor: 'primary.dark',

    // }}
    // >
    //   <LoginCard elevation={3}>
    //     <h2>Login to application</h2>
    //     { notification && notificationComponent() }
    //     <form onSubmit={handleLogin}>

    //       <div>

    //         <TextField
    //           id="outlined-username-input"
    //           fullWidth
    //           label="Username"
    //           value={username}
    //           margin="normal"
    //           onChange={({ target }) => setUsername(target.value)}
    //           autoComplete="current-username"
    //         />
    //       </div>
    //       <div>

    //         <FormControl margin="normal" sx={{ width: '100%' }} variant="outlined">
    //           <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
    //           <OutlinedInput
    //             id="standard-adornment-password"
    //             type={showPassword ? 'text' : 'password'}
    //             value={password}
    //             onChange={({ target }) => setPassword(target.value)}
    //             endAdornment={(
    //               <InputAdornment position="end">
    //                 <IconButton
    //                   aria-label="toggle password visibility"
    //                   onClick={() => setShowPassword(!showPassword)}
    //                   onMouseDown={handleMouseDownPassword}
    //                   edge="end"
    //                 >
    //                   {showPassword ? <VisibilityOff /> : <Visibility />}
    //                 </IconButton>
    //               </InputAdornment>
    //             )}
    //             label="Password"
    //           />
    //         </FormControl>
    //       </div>
    //       <FormControl margin="normal">

    //         <LoadingButton
    //           loading={isLoading}
    //           variant="contained"
    //           onClick={handleLogin}
    //           disabled={isLoading}
    //           type="submit"
    //         >
    //           login

    //         </LoadingButton>
    //       </FormControl>
    //     </form>
    //   </LoginCard>
    // </Box>
    );
  }

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              BlogApp
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <Button>
                  { user.name }
                  {' '}
                  logged in
                </Button>
                <NavLink
                  to="/"

                >
                  <MenuItem>
                    <Typography textAlign="center">blogs</Typography>
                  </MenuItem>
                </NavLink>
                <NavLink to="/users">
                  <MenuItem>
                    <Typography textAlign="center">users</Typography>
                  </MenuItem>
                </NavLink>

              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              BlogApp
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              <NavLink
                to="/"
              >
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  blogs
                </Button>
              </NavLink>
              <NavLink
                to="/users"
              >
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  users
                </Button>
              </NavLink>

              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                { user.name }
                {' '}
                logged in
              </Button>

            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={handleLogout}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                logout
              </Button>
            </Box>
          </Toolbar>
        </Container>

      </AppBar>
      { notification && notificationComponent() }
      <Routes>
        <Route path="/" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/users/:id" element={<UserBlogPage />} />
      </Routes>

    </div>
  );
};

export default App;
