import React from "react";

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../Sidedrawer/DrawerTogglehandler/DrawerToggleHandler';

const toolBar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle Clicked={props.drawerClicked}/>
    <div className={classes.Logo}>
      <Logo />
    </div>
    
    <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
  </header>
);

export default toolBar;
