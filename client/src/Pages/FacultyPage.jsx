// src/pages/FacultyList.jsx
import { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const tenant = import.meta.env.VITE_TENANT_ID || 'vite';

const FacultyList = () => {
  const [faculty, setFaculty] = useState([]);

  // useEffect(() => {
  //   const tenant = window.location.hostname.split('.')[0];
  //   axios.get('http://localhost:3001/api/faculty', {
  //     headers: { 'x-tenant-id': tenant }
  //   }).then(res => setFaculty(res.data));
  // }, []);
useEffect(() => {
    axios.get('http://localhost:3001/api/faculty', {
      headers: { 'x-tenant-id': tenant }
    }).then(res => setFaculty(res.data))
      .catch(err => console.error('Error fetching faculty:', err));
  }, []);

  return (
    <Container>
      <Typography variant="h4">Faculty List</Typography>
      <List>
        {faculty.map(f => (
          <ListItem key={f.id}>
            <ListItemText primary={f.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default FacultyList;
