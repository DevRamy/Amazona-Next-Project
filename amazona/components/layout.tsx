import Head from "next/head";
import Link from "next/link";
import {ReactNode, useContext} from "react";
import { Store } from "../utils/Store";


interface Props {
    children: ReactNode;
}

const Layout = ({children, ...props}: Props) => {

    const {state, dispatch} = useContext(Store);
    const {cart} = state;

    return (
        <>
          <Head>
            <title>Amazona</title>
            <meta name="description" content="Generated by Ramy Mohamed" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="flex min-h-screen flex-col justify-between">
            <header>
                <nav className="flex h-12 items-center px-4 justify-between shadow-md">
                    <Link href="/">
                        <a className="text-lg font-bold">Amazona</a>
                    </Link>
                    <div>
                        <Link href="/cart">
                            <a className="p-2">
                                Cart 
                                {cart.cartItems.length > 0 && <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">{cart.cartItems.reduce((a: any, c: any)  => a + c.quantity, 0)}</span>}
                            </a>
                        </Link>
                        <Link href="/login">
                            <a className="p-2">Login</a>
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="container m-auto mt-4 px-4">
                {children}
            </main>
            <footer className="flex h-10 justify-center items-center shadow-inner"><p>Copyright Amazona 2022</p></footer>
          </div>
        </>
    );
}

export default Layout;