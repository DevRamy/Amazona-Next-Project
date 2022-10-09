import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { StoreProvider } from '../utils/Store'
import { SessionProvider } from 'next-auth/react';

//@ts-ignore
function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </SessionProvider>
  )
}

export default MyApp
