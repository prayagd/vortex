const HORIZON_URL = 'https://horizon.stellar.org';
const BASE_FEE = '1000000';
const PENDULUM_WSS = 'wss://rpc-pendulum.prd.pendulumchain.tech';
const NETWORK = 'Pendulum';
const PENDULUM_FUNDING_AMOUNT_UNITS = '10'; // 10 PEN. Minimum balance of funding account
const STELLAR_FUNDING_AMOUNT_UNITS = '10'; // 10 XLM.  Minimum balance of funding account
const MOONBEAM_FUNDING_AMOUNT_UNITS = '10'; // 10 GLMR. Minimum balance of funding account
const SUBSIDY_MINIMUM_RATIO_FUND_UNITS = '10'; // 10 Subsidies considering maximum subsidy amount use on each (worst case scenario)
const MOONBEAM_RECEIVER_CONTRACT_ADDRESS = '0x0004446021fe650c15fb0b2e046b39130e3bfe36';
const STELLAR_EPHEMERAL_STARTING_BALANCE_UNITS = '2.5'; // Amount to send to the new stellar ephemeral account created
const PENDULUM_EPHEMERAL_STARTING_BALANCE_UNITS = '0.1'; // Amount to send to the new pendulum ephemeral account created

require('dotenv').config();

const PENDULUM_FUNDING_SEED = process.env.PENDULUM_FUNDING_SEED;
const FUNDING_SECRET = process.env.FUNDING_SECRET;
const MOONBEAM_EXECUTOR_PRIVATE_KEY = process.env.MOONBEAM_EXECUTOR_PRIVATE_KEY;

module.exports = {
  BASE_FEE,
  HORIZON_URL,
  PENDULUM_WSS,
  NETWORK,
  PENDULUM_FUNDING_AMOUNT_UNITS,
  PENDULUM_FUNDING_SEED,
  STELLAR_FUNDING_AMOUNT_UNITS,
  MOONBEAM_FUNDING_AMOUNT_UNITS,
  FUNDING_SECRET,
  MOONBEAM_EXECUTOR_PRIVATE_KEY,
  MOONBEAM_RECEIVER_CONTRACT_ADDRESS,
  SUBSIDY_MINIMUM_RATIO_FUND_UNITS,
  STELLAR_EPHEMERAL_STARTING_BALANCE_UNITS,
  PENDULUM_EPHEMERAL_STARTING_BALANCE_UNITS,
};
