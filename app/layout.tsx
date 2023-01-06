"use client"

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';

type AppProps = {
  children: React.ReactNode
}

// export default function RootLayout({ children }: { children: React.ReactNode }) {
export default function RootLayout(props: AppProps & { colorScheme: ColorScheme }) {
  const {children} = props

  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <html>
      <head>
        <title>Mantine next example</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <NotificationsProvider>{children}</NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </body>
    </html>
  );
}
