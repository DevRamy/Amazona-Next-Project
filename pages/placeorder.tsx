import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {useContext, useEffect, useState} from "react";
import { toast } from "react-toastify";
import CheckoutWizard from "../components/checkoutwizard";
import Layout from "../components/layout";
import { getError } from "../utils/functions/errors";
import {actions, Store} from "../utils/Store";

const Placeorder = () => {

    const {state, dispatch} = useContext(Store);
    const {cart} = state;
    const {cartItems, shippingAddress, paymentMethod} = cart;

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    const itemsPrice = round2(cartItems.reduce((a, z) => a + z.quantity * z.price, 0));
    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round2(itemsPrice * 0.15);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

    const [loading, setloading] = useState(false);

    const placOrderHandler = async () => {
        try{
            setloading(true);
            
            const order = {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            };

            const {data} = await axios.post('/api/orders',order);

            setloading(false);

            dispatch({type: actions.CART_CLEAR_ITEMS});

            router.push(`/order/${data._id}`);
        } catch(err) {
            setloading(false);
            toast.error(getError(err));
        }
    };

    const router = useRouter();

    useEffect(() => {
        if(!paymentMethod){
            router.push('/payment')
        }
    },[paymentMethod,router]);

    return (
        <Layout>
            <CheckoutWizard activeStep={3}/>
            <h1 className="mb-4 text-xl">Place Order</h1>
            {cartItems.length === 0
                ? <div>Cart is empty.
                        <Link href="/">Go shopping</Link>
                    </div>
                : <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Shipping Address</h2>
                            <div>{shippingAddress.fullName + ' ' + shippingAddress.address + ' ' + shippingAddress.city + ' ' + shippingAddress.postalCode + ' ' + shippingAddress.country}</div>
                            <div>
                                <Link href='/shipping'>Edit</Link>
                            </div>
                        </div>
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Payment Method</h2>
                            <div>{paymentMethod}</div>
                            <div>
                                <Link href='/payment'>Edit</Link>
                            </div>
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
                                    {cartItems.map((item : any) => (
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
                            <div>
                                <Link href='/cart'>Edit</Link>
                            </div>
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
                                <li>
                                    <button 
                                    disabled={loading} 
                                    onClick={placOrderHandler}
                                    className="primary-button w-full">
                                    {loading ? "Loading..." : "Place Order"}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>}
        </Layout>
    );
}

Placeorder.auth = true;

export default Placeorder;