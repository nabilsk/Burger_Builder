import * as actionTypes from '../action/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    }
}
export const purchaseBurgerFailed = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAILED,
        error : error
    }
}

export const purchseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const purchseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchseBurgerStart())
       // purchseBurgerStart()
        axios.post('/orders.json?auth=' + token, orderData )
        .then(response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch( error => {
            dispatch(purchaseBurgerFailed(error))
        })
    }
}

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type : actionTypes.FETCH_ORDER_SUCCESS,
        orders : orders
    }
}
export const fetchOrderFail = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAILED,
        error : error
    }
}
export const fetchOrderStart = () => {
    return {
        type : actionTypes.FETCH_ORDER_START
    }
}
export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('./orders.json' + queryParams)
        .then(req => {
            const fetchedData = [];
            for (const key in req.data) {
                fetchedData.push({
                    ...req.data[key],
                    id : key
                })
            }
            dispatch(fetchOrderSuccess(fetchedData))
        })
        .catch(error => {
            dispatch(fetchOrderFail(error))
        })
    }
}


