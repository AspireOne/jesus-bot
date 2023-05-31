import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { MantineProvider, createEmotionCache } from '@mantine/core';

const myCache = createEmotionCache({ key: 'mantine', prepend: false });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          emotionCache={myCache}
          theme={{
            colorScheme: 'dark',
          }}
      >
          <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
