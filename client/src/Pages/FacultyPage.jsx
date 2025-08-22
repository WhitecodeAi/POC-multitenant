import { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const FacultyList = () => {
  const [faculty, setFaculty] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const pathTenant = window.location.pathname.split('/')[1] || 'default';

    axios.get(`${import.meta.env.VITE_API_URL}/api/faculty`, {
      headers: { 'x-tenant-id': pathTenant }
    })
    .then(res => {
      console.log('Faculty response:', res.data);

      // Accept both array and { data: [...] } for robustness
      if (Array.isArray(res.data)) {
        setFaculty(res.data);
      } else if (Array.isArray(res.data.data)) {
        setFaculty(res.data.data);
      } else {
        console.warn('Unexpected response format:', res.data);
        setFaculty([]);
        setError('Unexpected response format');
      }
    })
    .catch(err => {
      console.error('Error fetching faculty:', err);
      setError('Failed to fetch faculty');
    });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Faculty List</Typography>

      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}

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