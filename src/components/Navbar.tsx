import React from 'react';
import { AppBar, Toolbar, Button, Switch } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', gap: '1rem' }}>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/projects">Projects</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>

        <div style={{ marginLeft: 'auto' }}>
          Dark Mode <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>
      </Toolbar>
    </AppBar>
  );
}
