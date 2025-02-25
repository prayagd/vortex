const { TOKEN_CONFIG } = require('../../constants/tokenConfig');
const { DUMP_SHEET_HEADER_VALUES } = require('../controllers/storage.controller');
const { EMAIL_SHEET_HEADER_VALUES } = require('../controllers/email.controller');
const { RATING_SHEET_HEADER_VALUES } = require('../controllers/rating.controller');

const validateCreationInput = (req, res, next) => {
  const { accountId, maxTime, assetCode } = req.body;
  if (!accountId || !maxTime) {
    return res.status(400).json({ error: 'Missing accountId or maxTime parameter' });
  }

  if (!assetCode) {
    return res.status(400).json({ error: 'Missing assetCode parameter' });
  }

  if (typeof maxTime !== 'number') {
    return res.status(400).json({ error: 'maxTime must be a number' });
  }
  next();
};

const validateChangeOpInput = (req, res, next) => {
  const { accountId, sequence, paymentData, maxTime, assetCode } = req.body;
  if (!accountId || !sequence || !paymentData || !maxTime) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  if (!assetCode) {
    return res.status(400).json({ error: 'Missing assetCode parameter' });
  }

  if (typeof sequence !== 'string' || typeof maxTime !== 'number') {
    return res.status(400).json({ error: 'Invalid input types' });
  }
  next();
};

const validateRequestBodyValues = (requiredRequestBodyKeys) => (req, res, next) => {
  const data = req.body;

  if (!requiredRequestBodyKeys.every((key) => data[key])) {
    const missingItems = requiredRequestBodyKeys.filter((key) => !data[key]);
    const errorMessage = 'Request body data does not match schema. Missing items: ' + missingItems.join(', ');
    console.error(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  next();
};

const validateStorageInput = validateRequestBodyValues(DUMP_SHEET_HEADER_VALUES);
const validateEmailInput = validateRequestBodyValues(EMAIL_SHEET_HEADER_VALUES);
const validateRatingInput = validateRequestBodyValues(RATING_SHEET_HEADER_VALUES);
const validateExecuteXCM = validateRequestBodyValues(['id', 'payload']);

const validatePreSwapSubsidizationInput = (req, res, next) => {
  const { amountRaw, address } = req.body;

  if (amountRaw === undefined) {
    return res.status(400).json({ error: 'Missing "amountRaw" parameter' });
  }

  if (typeof amountRaw !== 'string') {
    return res.status(400).json({ error: '"amountRaw" parameter must be a string' });
  }

  if (address === undefined) {
    return res.status(400).json({ error: 'Missing "address" parameter' });
  }

  next();
};

const validatePostSwapSubsidizationInput = (req, res, next) => {
  const { amountRaw, address, token } = req.body;

  if (amountRaw === undefined) {
    return res.status(400).json({ error: 'Missing "amountRaw" parameter' });
  }

  if (typeof amountRaw !== 'string') {
    return res.status(400).json({ error: '"amountRaw" parameter must be a string' });
  }

  if (address === undefined) {
    return res.status(400).json({ error: 'Missing "address" parameter' });
  }

  if (token === undefined) {
    return res.status(400).json({ error: 'Missing "token" parameter' });
  }

  const tokenConfig = TOKEN_CONFIG[token];
  if (tokenConfig === undefined || tokenConfig.assetCode === undefined || tokenConfig.assetIssuer === undefined) {
    return res.status(400).json({ error: 'Invalid "token" parameter' });
  }

  next();
};

module.exports = {
  validateChangeOpInput,
  validateCreationInput,
  validatePreSwapSubsidizationInput,
  validatePostSwapSubsidizationInput,
  validateStorageInput,
  validateEmailInput,
  validateRatingInput,
  validateExecuteXCM,
};
