import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummery from '../../components/Order/CheckoutSummery';
import ContactData from '../Chechout/ContactData/ContactData';

class Checkout extends Component {
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        let summery = <Redirect to='/' />
        if (this.props.ings) {
            const purchsedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summery = (
                <div>
                    {purchsedRedirect}
                    <CheckoutSummery 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinue={this.checkoutContinueHandler}/>
                    <Route 
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
                </div>
            );
        }
        return summery;
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        purchased : state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);