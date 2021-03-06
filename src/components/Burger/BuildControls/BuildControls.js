import React from 'react';

import classes from './BuildControls.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
    {label : 'Salad', type : 'salad'},
    {label : 'Cheese', type : 'cheese'},
    {label : 'Meat', type : 'meat'},
    {label : 'Bacon', type : 'bacon'},
   
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => {
            return <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            deducted={() => props.ingredientDeducted(ctrl.type)}
            disabled={props.disabled[ctrl.type]} />
        })}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable} 
            onClick={props.ordered}>{props.isAuth ? "ORDER NOW" : " SIGN UP TO ORDER"}</button>
    </div>
)

export default buildControls;