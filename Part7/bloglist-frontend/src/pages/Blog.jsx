import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addComment } from '../redux/reducers/blogreducers';

import Blog from '../components/Blog';

const BlogPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs
    .find((blog) => blog.id === id));
  const [comment, setComment] = useState('');
  if (!blogs) {
    return null;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment(id, { comment }));
    setComment('');
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{
          paddingTop: '20px', paddingBottom: '20px', bgcolor: '#cfe8fc', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto',
        }}
        >
          <div>

            <Blog blog={blogs} />
            <h3 style={{ margin: '10px 0px' }}>Comments</h3>
            <form onSubmit={handleSubmit}>
              <Box sx={{
                paddingTop: '20px', paddingBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center',
              }}
              >

                <TextField
                  id="comment"
                  label="Comment"
                  value={comment}
                  size="small"
                  onChange={({ target }) => setComment(target.value)}
                />

                <Button variant="text" onClick={handleSubmit} type="submit">add comment</Button>
              </Box>
            </form>
            <ul>
              { blogs.comments.map((blogComment) => (
                <li key={blogComment.id}>
                  { blogComment.comment }
                </li>
              )) }
            </ul>
          </div>
        </Box>
      </Container>
    </>

  );
};

export default BlogPage;
