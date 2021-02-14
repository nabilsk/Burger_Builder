import React from "react";

import classes from "./Sidedrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary";

const sideDrawer = (props) => {
  let attechedClasses = [classes.Sidedrawer, classes.Close];
  if (props.open) {
      attechedClasses = [classes.Sidedrawer, classes.Open];
  }
  return (
    <Auxiliary>
        <Backdrop show={props.open} Clicked={props.closed}/>
      <div className={attechedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;
