import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import Layout from "../../components/layout";
import { getError } from "../../utils/functions/errors";


const fetchActions = {
    FETCH_RQUEST: 'FETCH_RQUEST',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_FAIL: 'FETCH_FAIL',
};

function reducer(state,action){
    switch(action.type){
        case fetchActions.FETCH_RQUEST: 
            return {...state, loading: true, error: ''};

        case fetchActions.FETCH_SUCCESS:
            return {...state, loading: false, order: action.payload, error: ''};
         
        case fetchActions.FETCH_FAIL:
             return {...state, loading: false, error: action.payload};
    }
}

const OrderScreen = () => {

    const { query } = useRouter();
    const orderId = query.id;

    const [{loading, error, order }, dispatch] = useReducer(reducer,{ loading: true, order: {}, error: '',});

    useEffect(() => {
        const fetchOrder = async () => {
            try{
                dispatch({type: fetchActions.FETCH_RQUEST});
                const { data } = await axios.get(`/api/orders/${orderId}`);
                dispatch({type: fetchActions.FETCH_SUCCESS, payload: data});
            } catch(err){
                dispatch({type: fetchActions.FETCH_FAIL, payload: getError(err)});
            }
        };
        
        if (!order._id || (order._id && order._id !== orderId)){
            fetchOrder();
        }
    },[order,orderId]);


    const {
        shippingAddress,
        paymentMethod,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt,
      } = order;


    return (
        <Layout>
            <h1 className="mb-4 text-xl">Order {orderId}</h1>
            {loading ? <div>Loading...</div> : <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Shipping Address</h2>
                            <div>{shippingAddress.fullName + ' ' + shippingAddress.address + ' ' + shippingAddress.city + ' ' + shippingAddress.postalCode + ' ' + shippingAddress.country}</div>
                            {isDelivered?
                             <div className="alert-success">Delivered at {deliveredAt}</div> :
                             <div className="alert-error">Not delivered</div>
                            }
                        </div>
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Payment Method</h2>
                            <div>{paymentMethod}</div>
                            {isPaid ? 
                             <div className="alert-success">Paid at {paidAt}</div> :
                             <div className="alert-error">Not paid</div>
                            }
                        </div>
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Order Items</h2>
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th className="px-4 text-left">Item</th>
                                        <th className="p-5 text-right">Quantity</th>
                                        <th className="p-5 text-right">Price</th>
                                        <th className="p-5 text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.map((item : any) => (
                                        <tr key={item.slug} className="border-b">
                                            <td>
                                                <Link href={`/product/${item.slug}`}>
                                                    <a className="flex items-center">
                                                        <Image src={item.image} alt={item.name} width={75} height={75}></Image>
                                                        &nbsp; {item.name}
                                                    </a>
                                                </Link>
                                            </td>
                                            <td className="p-5 text-right">{item.quantity}</td>
                                            <td className="p-5 text-right">${item.price}</td>
                                            <td className="p-5 text-right">${item.quantity * item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Order Summary</h2>
                            <ul>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Items</div>
                                        <div>${itemsPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Tax</div>
                                        <div>${taxPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Shipping</div>
                                        <div>${shippingPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Total</div>
                                        <div>${totalPrice}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>}
        </Layout>
    );
}

OrderScreen.auth = true;

export default OrderScreen;