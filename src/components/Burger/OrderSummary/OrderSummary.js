import React,{ Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentWillUpdate() {
        console.log('odersummery_upated');
    }
   render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igkey => {
        return (
            <li key={igkey}>
                <span style={{textTransform : 'capitalize'}}>
                    {igkey} : {this.props.ingredients[igkey]}
                </span>
            </li>
        )
    })
    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious Burger with follwing ingredients : </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to order: </p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Auxiliary>
    )
   }
}

export default OrderSummary;