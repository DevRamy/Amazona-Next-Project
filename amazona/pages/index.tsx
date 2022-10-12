import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import ProductItem from '../components/ProductItem'
import ProductType from '../utils/types/product'
import Product from '../models/Product'
import db from '../utils/db'
import { useContext } from 'react'
import { actions, Store } from '../utils/Store'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'

interface Props {
  products: ProductType[];
}

const Home: NextPage<Props> = ({ products }) => {

    const {state, dispatch} = useContext(Store);

    const router = useRouter();

    const addToCartHandler = async (product) => {
        const existItem = state.cart.cartItems.find((x: ProductType) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        const { data } = await axios.get(`/api/products/${product._id}`);

        if(data.countInStock < quantity) { 
            toast.error('Product is out of stock');
            return; 
        }

        dispatch({type: actions.CART_ADD_ITEM, payload: {...product, quantity}});

        toast.success('Product added successfully');
    }

  return (
    <div>
      <Layout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {
            products.map(product => (
              <ProductItem product={product} key={product.slug} addToCartHandler={addToCartHandler}></ProductItem>
            ))
          }
        </div>
      </Layout>
    </div>
  )
}

export default Home;


export async function getServerSideProps(){
  await db.connect();
  //@ts-ignore
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocumentToObject),
    }
  }
}
