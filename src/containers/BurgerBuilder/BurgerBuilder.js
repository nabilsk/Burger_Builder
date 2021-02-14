import React,{ Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/action/index';

 

class BurgerBuilder extends Component{

    state ={
        purchasaing : false,
    }

    componentDidMount(){
        console.log(this.props);
        this.props.onInitIngredients()
    }

    updatePurchasedState (ingredients) {
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey];
        })
        .reduce((sum, el) => {
            return sum + el;
        },0);
         return sum > 0 ;
    }
   
    purchaseHandler = () => {
        if(this.props.isAuthenticated)
        {
            this.setState({purchasaing: true});
        }else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasaing : false});
    }

    purchaseContinueHandler = () => {
        //alert('You please continue...')
        this.props.onInitPurchase();
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.props.price )
        // const queryString = queryParams.join('&')
        // this.props.history.push({
        //     pathname : '/checkout',
        //     search : '?' + queryString
        // });
        this.props.history.push('/checkout')
    };

    render(){
        const disabledInfo ={
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p style={{textAlign : 'center'}}>Ingredients cant load Someting went wrong!...</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientDeducted={this.props.onIngredientRemove}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchasedState(this.props.ings)}
                    isAuth={this.props.isAuthenticated}
                    ordered={this.purchaseHandler}
                    price={this.props.price}/>
                </Auxiliary>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
        }
        
        return(
            <Auxiliary>
                <Modal show={this.state.purchasaing } modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemove : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));