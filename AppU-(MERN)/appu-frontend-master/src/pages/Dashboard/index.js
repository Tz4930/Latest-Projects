import React from 'react';
import Drawer from '../../components/dashboard/SideBar/drawer'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

function Dashboard() {
    const drawerWidth = 240
  return (
    <div>
      <Box sx={{ display: 'flex' }}>  
      <Drawer />
      <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
    <Toolbar />
    <Toolbar />
    
      </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
