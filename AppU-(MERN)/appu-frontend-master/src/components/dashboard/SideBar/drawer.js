import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import style from "../../views/business/components/style.module.css"
import {Link, useHistory} from 'react-router-dom';
import AppBar from '../Header/AppBar'
import routers from '../../../ui/menu'

const drawerWidth = 330;

function ResponsiveDrawer(props) {
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('user'));
  const businessData = JSON.parse(localStorage.getItem('data'));
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if(!user && !businessData) {
      history.push('/login');
    }
  }, [user, businessData, history])

  const drawer = (
    <div>
      <div style={{textAlign: "center"}}>
      <Link to="/">
      <h3 className={style.chatTitleHeader}>App<h3 className={style.mealTitleHeader}>U</h3></h3>
      </Link>
      </div>
      <Divider />
      <List>
        {routers && routers.map((item, index) => {
          // console.log(item);
          return (
            <Link to={item.path} className="btn btn-lg" key={index} >
            <ListItem  >
            <ListItemIcon>
            <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
            </Link>
          )
        })}
          {/* <Link to="/menuItem" className="btn btn-success btn-block btn-lg" >
          <ListItem >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Menu Item" />
          </ListItem>
          </Link>
          <Link to="/dashboard" className="btn btn-success btn-block btn-lg" >
          <ListItem >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
          </Link> */}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
     <>
      <CssBaseline />
      <AppBar  drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle}/>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width:  240 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth  },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      </>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
