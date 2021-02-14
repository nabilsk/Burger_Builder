import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem Link="/" exact >Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem Link="/orders" >Orders</NavigationItem> : null}
        {!props.isAuthenticated 
            ? <NavigationItem Link="/auth" >Authenication</NavigationItem>
            : <NavigationItem Link="/logout" >Logout</NavigationItem>}
    </ul>
);

export default navigationItems;