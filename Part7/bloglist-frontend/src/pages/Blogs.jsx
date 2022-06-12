import React, { useState } from 'react';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateNewBlogForm from '../components/CreateNewBlogForm';

const BlogsPage = () => {
  const [createNew, setCreateNew] = useState(false);
  const navigate = useNavigate();

  const blogs = useSelector((state) => state.blogs
    .sort((a, b) => b.likes - a.likes));

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{
          paddingTop: '20px', paddingBottom: '20px', bgcolor: '#cfe8fc', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto',
        }}
        >
          <div>

            { createNew ? (
              <CreateNewBlogForm
                setCreateNew={setCreateNew}
              />
            )
              : <Button variant="outlined" onClick={() => setCreateNew(true)}>create new blog</Button> }
            <List
              sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '16px' }}
              component="nav"
              aria-labelledby="nested-list-subheader"

            >

              { blogs.map((blog) => (
                <ListItemButton onClick={() => navigate(`/blogs/${blog.id}`)}>
                  <ListItemText primary={`${blog.title} ${blog.author}`} />
                </ListItemButton>
              )) }
            </List>
          </div>
        </Box>
      </Container>
    </>
  );
};
export default BlogsPage;
