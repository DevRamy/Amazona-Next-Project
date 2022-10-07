import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import { useContext } from "react";
import Layout from "../../components/layout";
import data from "../../utils/data";
import { Store, actions } from "../../utils/Store";
import Product from "../../utils/types/product";

const ProductScreen = () => {

    const {state, dispatch} = useContext(Store);

    const router = useRouter();
    const {query} = router;
    const {slug} = query;

    const product = data
        .products
        .find(p => p.slug === slug);

    if (!product) {
        return <div>Product not found</div>;
    }

    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find((x: Product) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if(product.countInStock < quantity) { alert('Out of stock'); return; }
        dispatch({type: actions.CART_ADD_ITEM, payload: {...product, quantity}})
        router.push('/cart');
    }


    return (
        <Layout>
            <div className="py-2">
                <Link href="/">
                    <a className="primary-button">Back to Home</a>
                </Link>
            </div>
            <div className="grid md:grid-cols-4 md:gap-3">
                <div className="md:col-span-2">
                    <Image
                     src={product.image}
                     alt={product.name}
                     width={550}
                     height={550}
                     layout="responsive"
                    ></Image>
                </div>
                <div className="shadow p-4">
                    <ul>
                        <li>
                            <h1 className="text-lg">{product.name}</h1>
                        </li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>{product.rating} of {product.numReviews} reviews</li>
                        <li>Description: {product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5">
                        <div className="mb-2 flex justify-between">
                            <div>Price</div>
                            <div>${product.price}</div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? "In Stock" : "Unabailable"}</div>
                        </div>
                        <button className="primary-button w-full" onClick={() => addToCartHandler()}>Add to cart</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductScreen;