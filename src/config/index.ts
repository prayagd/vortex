import { TenantName } from '../models/Tenant';
import { ThemeName } from '../models/Theme';

type TenantConfig = Record<
  TenantName,
  {
    name: string;
    rpc: string;
    theme: ThemeName;
    explorer: string;
  }
>;

type Environment = 'development' | 'staging' | 'production';
const nodeEnv = process.env.NODE_ENV as Environment;
const maybeSignerServiceUrl = import.meta.env.VITE_SIGNING_SERVICE_URL;
const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
const env = (import.meta.env.VITE_ENVIRONMENT || nodeEnv) as Environment;

export const config = {
  nodeEnv,
  env,
  isProd: env === 'production',
  isDev: env === 'development',
  maybeSignerServiceUrl,
  alchemyApiKey,
  defaultPage: '/pendulum/dashboard',
  tenants: {
    [TenantName.Amplitude]: {
      name: 'Amplitude',
      rpc: 'wss://rpc-amplitude.pendulumchain.tech',
      theme: ThemeName.Amplitude,
      explorer: 'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc-foucoco.pendulumchain.tech#/explorer/query',
    },
    [TenantName.Pendulum]: {
      name: 'Pendulum',
      rpc: 'wss://rpc-pendulum.prd.pendulumchain.tech',
      theme: ThemeName.Pendulum,
      explorer: 'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc-foucoco.pendulumchain.tech#/explorer/query',
    },
    [TenantName.Foucoco]: {
      name: 'Foucoco',
      rpc: 'wss://rpc-foucoco.pendulumchain.tech',
      theme: ThemeName.Amplitude,
      explorer: 'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc-foucoco.pendulumchain.tech#/explorer/query',
    },
    [TenantName.Local]: {
      name: 'Local',
      rpc: 'ws://localhost:9944',
      theme: ThemeName.Amplitude,
      explorer: 'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc-foucoco.pendulumchain.tech#/explorer/query',
    },
  } satisfies TenantConfig,
  swap: {
    deadlineMinutes: 60 * 24 * 7, // 1 week
  },
  walletConnect: {
    url: 'wss://relay.walletconnect.com',
    projectId: '299fda67fbf3b60a31ba8695524534cd',
  },
  test: {
    mockSep24: false,
    overwriteMinimumTransferAmount: false,
  },
  telegramUrl: 'https://forms.gle/kMTmfTjd4UuoyyNu7',
};
