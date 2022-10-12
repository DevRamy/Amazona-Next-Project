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

const Cart: {cartItems: product[], shippingAddress: {}, paymentMethod: string} = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: '',
};

const initialState = {
    cart: Cart
};

export const actions = {
    CART_ADD_ITEM: 'CART_ADD_ITEM',
    CART_REMOVE_ITEM: 'CART_REMOVE_ITEM',
    CART_REST: 'CART_REST',
    SAVE_SHIPPING_ADDRESS: 'SAVE_SHIPPING_ADDRESS',
    SAVE_PAYMENT_METHOD: 'SAVE_PAYMENT_METHOD',
};


function reducer(state = initialState, action : { type: any; payload: any; }) {
    switch (action.type) {
        case actions.CART_ADD_ITEM:
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(item => item.slug === newItem.slug);
            const cartItems = existItem? state.cart.cartItems.map(item => item.name === existItem.name ? newItem : item) : [...state.cart.cartItems, newItem];
            return {...state, cart: {...state.cart, cartItems}};
        case actions.CART_REMOVE_ITEM:
             const newCartItems = state.cart.cartItems.filter((item) => item.slug !== action.payload.slug);
             return {...state, cart: {...state.cart, cartItems: newCartItems}};
        case actions.CART_REST:
            return {
                ...state,
                cart: {
                    cartItems: [],
                    shippingAddress: {location: []},
                    paymentMethod: '',
                },
            };
        case actions.SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: {
                        ...state.cart.shippingAddress,
                        ...action.payload,
                    },
                },
            };
        case actions.SAVE_PAYMENT_METHOD:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod: action.payload,
                }
            }
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
