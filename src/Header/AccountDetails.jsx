import React, { useState } from 'react';
import { Typography, Button, Container, Accordion, AccordionSummary, Menu, MenuItem, IconButton, Avatar,ListItemIcon } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
const frame = {p: 2,height:"80px",width:"250px",m:0 };
const typographyStyle = { textAlign: "center", width: 'fit-content', p: 2, color: "primary.contrastText", fontSize: "17px", cursor: "default" };
const resetAccordion = { backgroundColor: 'rgb(0, 0, 0, 0)', boxShadow: 'none' };
const summary = {
  p: 0,
  '& .MuiAccordionSummary-content': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 0,
  },
};

export default function AccountDetails( { mobile,handleDrawer }) {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const openMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const redirectToGoogleAccounts = () => {
    // URL to redirect to (accounts.google.com in this case).
    const url = 'https://accounts.google.com';

    // Open a new browser window with the specified URL.
    window.open(url, '_blank');
  };

  const logout = ()=>{
    console.log("Logging out")
  }

  return (
    <Container sx={{ ...frame}}>
      <Accordion sx={resetAccordion} disableGutters expanded={false}>
        <AccordionSummary sx={summary}>

          <IconButton fontSize='large' onClick={openMenu} sx={{
            p: 0, m: 0, "&:focus": {
              outline: "none", // Remove the default focus outline
            },
          }} >
            <Avatar sx={{
              width: 40, height: 40, backgroundColor: 'white', color: 'primary.contrastText', m: 0, border: "none",
              "&:focus": {
                outline: "none", // Remove the default focus outline
              },
            }}>M</Avatar>
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={closeMenu}
            sx={{ m:0,mt: 2,p: 0 }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={redirectToGoogleAccounts}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          <Typography variant="body1" sx={typographyStyle}>
            Account Name
          </Typography>
          {mobile && <IconButton fontSize='large' sx={{
            p: 2, m: 0, "&:focus": {
              outline: "none", // Remove the default focus outline
            }}} onClick={handleDrawer}><MenuIcon fontSize='large'/></IconButton>}
        </AccordionSummary>
      </Accordion>
    </Container>
  );
}