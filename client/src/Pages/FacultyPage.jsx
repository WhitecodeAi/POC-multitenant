// src/pages/FacultyList.jsx
import { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const tenant = import.meta.env.VITE_TENANT_ID || 'vite';

const FacultyList = () => {
  const [faculty, setFaculty] = useState([]);

  
   useEffect(() => {
    // Extract tenant from URL path: e.g., /anc or /kakade
    const pathTenant = window.location.pathname.split('/')[1] || 'default';

    axios.get('http://localhost:3001/api/faculty', {
      headers: { 'x-tenant-id': pathTenant }
    })
    .then(res => setFaculty(res.data))
    .catch(err => console.error('Error fetching faculty:', err));
  }, []);

  
// useEffect(() => {
//     axios.get('http://localhost:3001/api/faculty', {
//       headers: { 'x-tenant-id': tenant }
//     }).then(res => setFaculty(res.data))
//       .catch(err => console.error('Error fetching faculty:', err));
//   }, []);

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
