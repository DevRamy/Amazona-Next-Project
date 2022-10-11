import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { StoreProvider } from '../utils/Store'
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

//@ts-ignore
function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {
        //@ts-ignore
        Component.auth? (<Auth><Component {...pageProps} /></Auth>) : <Component {...pageProps} />}
      </StoreProvider>
    </SessionProvider>
  )
}

function Auth({children}){
  const router = useRouter();

  const {status} = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });

  if(status === 'loading'){
    return <div>Loading...</div>;
  }

  return children;
}

export default MyApp
