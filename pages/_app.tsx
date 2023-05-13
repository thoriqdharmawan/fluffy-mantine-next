import { useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import dayjs from 'dayjs';

import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import AuthStateChangeProvider from '../context/auth';
import { UserProvider } from '../context/user';
import { GlobalProvider } from '../context/global';

import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';

require('dayjs/locale/id');

const localizedFormat = require('dayjs/plugin/localizedFormat');

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  dayjs.extend(localizedFormat).locale('id');

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Fluffy</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <SkeletonTheme baseColor={colorScheme === 'dark' ? "#25262b" : '#ebebeb'} highlightColor={colorScheme === 'dark' ? "#1A1B1E" : '#f5f5f5'}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <NotificationsProvider>
              <ModalsProvider>
                <UserProvider>
                  <AuthStateChangeProvider>
                    <GlobalProvider>
                      <Component {...pageProps} />
                    </GlobalProvider>
                  </AuthStateChangeProvider>
                </UserProvider>
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </SkeletonTheme>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};
