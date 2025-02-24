import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';

const Todo = () => {
  const [formData, setFormData] = useState({
    title: '',
    task: '',
    date: ''
  });
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevent adding empty todos
    if (formData.title && formData.task && formData.date) {
      setTodos([...todos, formData]);
      setFormData({
        title: '',
        task: '',
        date: ''
      });
    } else {
      alert('Please fill in all fields before submitting.');
    }
  };

  const handleDelete = (title) => {
    const newTodos = todos.filter((item) => item.title !== title);
    setTodos(newTodos);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Todo App
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Todo Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Todo Task"
              name="task"
              value={formData.task}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Todo Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" type="submit">
              Save
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              type="reset"
              onClick={() => setFormData({ title: '', task: '', date: '' })}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Display Todos */}
      <Box mt={4}>
        {todos.length > 0 ? (
          todos.map((item, index) => (
            <Box
              key={index}
              sx={{
                border: '1px solid #ddd',
                padding: 2,
                marginBottom: 2,
                borderRadius: 1,
              }}
            >
              <Typography variant="h6">Todo {index + 1}</Typography>
              <Typography variant="body1">Title: {item.title}</Typography>
              <Typography variant="body1">Task: {item.task}</Typography>
              <Typography variant="body1">Date: {item.date}</Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(item.title)}
                sx={{ mt: 2 }}
              >
                Delete
              </Button>
            </Box>
          ))
        ) : (
          <Typography>No todos available</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Todo;
