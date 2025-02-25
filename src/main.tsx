import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@rainbow-me/rainbowkit/styles.css';

import { render } from 'preact';
import { BrowserRouter } from 'react-router-dom';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './app';
import { GlobalStateContext, GlobalStateProvider } from './GlobalStateProvider';
import { wagmiConfig } from './wagmiConfig';
import { EventsProvider } from './contexts/events';

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <EventsProvider>
              <GlobalStateProvider>
                <GlobalStateContext.Consumer>
                  {() => {
                    return <App />;
                  }}
                </GlobalStateContext.Consumer>
              </GlobalStateProvider>
            </EventsProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById('app') as HTMLElement,
);
