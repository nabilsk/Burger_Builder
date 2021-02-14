import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';


const burger = (props) => {

    let transfromedIngredients = Object.keys(props.ingredients)
    .map(igkey => {
        //console.log(igkey);
        return [...Array(props.ingredients[igkey])].map((_, i) => {
             return <BurgerIngredient key={igkey + i} type={igkey} />
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    },[]);

    if(transfromedIngredients.length === 0){
        transfromedIngredients = <p>Please add Ingredients</p>
    }

    console.log(transfromedIngredients);

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transfromedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger; 