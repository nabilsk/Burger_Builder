import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
    state = {
        showSideDrawer : false
    }

    sidedrawerClosedHandler = () => {
        this.setState({showSideDrawer : false})
    }

    sidedrawerOpenHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer : !prevState.showSideDrawer}
        })
    }

    render(){
        return (
            <Auxiliary>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    drawerClicked={this.sidedrawerOpenHandler}/>
                <Sidedrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} closed={this.sidedrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
} 
const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    }
} 

export default connect(mapStateToProps)(Layout);