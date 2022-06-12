import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getUser } from '../services/users';
import { setNotification } from '../redux/reducers/notificationReducers';

const UserBlogPage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getUser(id).then((initialUser) => {
      setUser(initialUser);
    }).catch(() => dispatch(setNotification({ type: 'error', message: 'something went wrong check id' }, 5)));

    return () => {

    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{
          paddingTop: '20px', paddingBottom: '20px', bgcolor: '#cfe8fc', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto',
        }}
        >
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 250 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      { user.name }
                      {' '}
                      Added blogs
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.blogs.map((blog) => (
                    <TableRow
                      key={blog.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                      <TableCell align="center">{ blog.title }</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Container>
    </>

  );
};

export default UserBlogPage;
