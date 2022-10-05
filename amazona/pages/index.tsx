import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import ProductItem from '../components/ProductItem'
import data from '../utils/data'

const Home: NextPage = () => {
  return (
    <div>
      <Layout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {
            data.products.map(product => (
              <ProductItem product={product} key={product.slug}></ProductItem>
            ))
          }
        </div>
      </Layout>
    </div>
  )
}

export default Home
