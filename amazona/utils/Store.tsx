import {createContext, useReducer, ReactNode} from 'react';
import product from './types/product';

interface StoreContextInterface {
    state: any,
    dispatch: any
}

const StoreContext : StoreContextInterface = {
    state: {},
    dispatch: {}
}

export const Store = createContext(StoreContext);

const Cart: {cartItems: product[]} = {
    cartItems: []
};

const initialState = {
    cart: Cart
};

export const actions = {
    CART_ADD_ITEM: 'CART_ADD_ITEM'
};


function reducer(state = initialState, action : { type: any; payload: any; }) {
    switch (action.type) {
        case actions.CART_ADD_ITEM:
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(item => item.slug === newItem.slug);
            const cartItems = existItem? state.cart.cartItems.map(item => item.name === existItem.name ? newItem : item) : [...state.cart.cartItems, newItem];
            return {...state, cart: {...state.cart, cartItems}}
        default:
          return state;
    }
}

interface Props {
    children: ReactNode;
}


export function StoreProvider({children}: Props) {
    const [state,dispatch] = useReducer(reducer,initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{children}</Store.Provider>;
}
