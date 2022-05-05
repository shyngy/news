import Head from 'next/head';

import { Header } from '../components/Header';
import { wrapper } from '../store';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from '../theme';

import '../styles/globals.scss';
import 'macro-css';

import { AppProps } from 'next/dist/shared/lib/router/router';

import { setUserData } from '../store/slices/userSlice';

import { Api } from '../utils/api';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>News</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      try {
        const userData = await Api(ctx).user.getMe();
        store.dispatch(setUserData(userData));
      } catch (error) {
        console.error(error);
      }
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps({ ...ctx, store })
          : {},
      };
    }
);

export default wrapper.withRedux(App);
