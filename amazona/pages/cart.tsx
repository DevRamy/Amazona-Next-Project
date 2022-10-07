import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import Layout from "../components/layout";
import { actions, Store } from "../utils/Store";
import product from "../utils/types/product";

const CartScreen = () => {

    const {state, dispatch} = useContext(Store);
    const {cart: {cartItems}} = state;
    const router = useRouter();

    const removeFromCartHandler = (item: Object) => {
        dispatch({type: actions.CART_REMOVE_ITEM, payload: item});
    }

    return (
        <Layout>
            <h1 className="mb-4 text-xl">Shopping Cart</h1>
            {
                cartItems.length === 0 ?
                (<div>
                    Cart is empty. <Link href="/"><a className="primary-button">Go shopping</a></Link>
                </div>) :
                (<div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <table className="min-w-full">
                            <thead className="border-b">
                                <tr>
                                   <th className="px-4 text-left">Item</th> 
                                   <th className="p-5 text-right">Quantity</th> 
                                   <th className="p-5 text-right">Price</th> 
                                   <th className="p-5">Action</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map((item: any) => (
                                        <tr key={item.slug} className="border-b">
                                            <td>
                                               <Link href={`/product/${item.slug}`}>
                                                   <a className="flex items-center">
                                                       <Image
                                                         src={item.image}
                                                         alt={item.name}
                                                         width={75}
                                                         height={75}
                                                       ></Image>
                                                       &nbsp;
                                                       {item.name}
                                                   </a>
                                               </Link>
                                            </td>
                                            <td className="p-5 text-right">{item.quantity}</td>
                                            <td className="p-5 text-right">${item.price}</td>
                                            <td className="p-5 text-center">
                                                <button className="text-red-600 font-bold" onClick={ () => removeFromCartHandler(item)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="card p-5">
                        <ul>
                            <li>
                                <div className="pb-3">
                                    Subtotal ({cartItems.reduce((a: any,z: any) => a + z.quantity, 0)}) : ${cartItems.reduce((a: any,z: any) => a + z.quantity * z.price, 0)}
                                </div>
                            </li>
                            <li>
                                <button className="primary-button w-full" onClick={() => router.push('/shipping')}>Check out</button>
                            </li>
                        </ul>
                    </div>
                </div>)
            }
        </Layout>
    );
}

export default CartScreen;