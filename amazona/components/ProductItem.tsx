import Link from 'next/link';
import { useContext } from 'react';
import { actions, Store } from '../utils/Store';
// types
import Product from '../utils/types/product';

interface Props {
    product: Product, 
    addToCartHandler: any,
}

const ProductItem = ({product, addToCartHandler ,...props}: Props) => {

    return (
        <div className="card">
            <Link href={`/product/${product.slug}`}>
                <a>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="rounded-sm shadow object-cover h-50 w-full"
                    />
                </a>
            </Link>
            <div className="flex flex-col items-center justify-content p-5">
                 <Link href={`/product/${product.slug}`}>
                    <a>
                        <h2 className="text-lg">{product.name}</h2>
                    </a>
                 </Link>
                 <p className="mb-2">{product.brand}</p>
                 <p>${product.price}</p>
                 <button className="primary-button" type="button" onClick={() => addToCartHandler(product)}>Add to cart</button>
            </div>
        </div>
    );
}

export default ProductItem;