import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import CircularProgress from '@mui/material/CircularProgress';
import { setNotification } from '../redux/reducers/notificationReducers';
import { getAll } from '../services/users';

const UsersPage = () => {
  const [users, setUsers] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getAll().then((initialUsers) => {
      setUsers(initialUsers);
    }).catch(() => dispatch(setNotification({ type: 'error', message: 'something went wrong check id' }, 5)));

    return () => {

    };
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{
          paddingTop: '20px', paddingBottom: '20px', bgcolor: '#cfe8fc', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto',
        }}
        >
          <div>

            <h2>Users</h2>

            {!users && (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
            )}
            {users && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 250 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Blogs created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { users && users.map((user) => (
                    <TableRow
                      key={user.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link to={`${user.id}`}>{ user.name }</Link>
                      </TableCell>
                      <TableCell align="right">{ user.blogs.length }</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            )}
          </div>
        </Box>
      </Container>
    </>

  );
};

export default UsersPage;
