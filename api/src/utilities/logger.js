import chalk from 'chalk';

const log = console.log;
const error = console.error;
const red = chalk.red;
const grey = chalk.grey;
const white = chalk.white;
const green = chalk.green;
const symbols = {
  connectionError: red('<--->'),
  connectionPending: grey('<--->'),
  connectionSuccess: green('<--->'),
  upstreamMsgPending: grey('---->'),
  upstreamMsgSuccess: green('---->'),
  downstreamMsgPending: grey('<----'),
  downstreamMsgSuccess: green('<----'),
  proxy: white('proxy'),
  upstream: white('aisstream.io'),
};

const logDownstreamConnectionOpen = (address, port) => {
  const downstream = white(`${address}:${port}`);
  const { connectionSuccess, proxy, connectionPending, upstream } = symbols;
  log(`${downstream} ${connectionSuccess} ${proxy} ${connectionPending} ${upstream}`);
};

const logUpstreamConnectionOpen = (address, port) => {
  const downstream = white(`${address}:${port}`);
  const { connectionPending, proxy, connectionSuccess, upstream } = symbols;
  log(`${downstream} ${connectionPending} ${proxy} ${connectionSuccess} ${upstream}`);
};

const logE2EConnectionOpen = (address, port) => {
  const downstream = white(`${address}:${port}`);
  const { connectionSuccess, proxy, upstream } = symbols;
  log(`${downstream} ${connectionSuccess} ${proxy} ${connectionSuccess} ${upstream}`);
};

const logDownstreamConnectionClose = (address, port, code) => {
  const downstream = white(`${address}:${port}`);
  const { connectionPending, proxy, connectionSuccess, upstream } = symbols;
  log(`${downstream} ${connectionPending} ${proxy} ${connectionSuccess} ${upstream}`);
  log(code);
};

const logUpstreamConnectionClose = (address, port, code) => {
  const downstream = white(`${address}:${port}`);
  const { connectionSuccess, proxy, connectionPending, upstream } = symbols;
  log(`${downstream} ${connectionSuccess} ${proxy} ${connectionPending} ${upstream}`);
  log(code);
};

const logE2EConnectionClose = (address, port) => {
  const downstream = white(`${address}:${port}`);
  const { connectionPending, proxy, upstream } = symbols;
  log(`${downstream} ${connectionPending} ${proxy} ${connectionPending} ${upstream}`);
};

const logDownstreamConnectionError = (address, port, err) => {
  const downstream = white(`${address}:${port}`);
  const { connectionError, proxy, connectionSuccess, upstream } = symbols;
  log(`${downstream} ${connectionError} ${proxy} ${connectionSuccess} ${upstream}`);
  error(err);
};

const logUpstreamConnectionError = (address, port, err) => {
  const downstream = white(`${address}:${port}`);
  const { connectionSuccess, proxy, connectionError, upstream } = symbols;
  log(`${downstream} ${connectionSuccess} ${proxy} ${connectionError} ${upstream}`);
  error(err);
};

const logE2EConnectionError = (address, port, err) => {
  const downstream = white(`${address}:${port}`);
  const { connectionError, proxy, upstream } = symbols;
  log(`${downstream} ${connectionError} ${proxy} ${connectionError} ${upstream}`);
  error(err);
};

const logDownstreamMessageStart = (address, port) => {
  const downstream = white(`${address}:${port}`);
  const { downstreamMsgPending, proxy, downstreamMsgSuccess, upstream } = symbols;
  log(`${downstream} ${downstreamMsgPending} ${proxy} ${downstreamMsgSuccess} ${upstream}`);
};

const logDownstreamMessageEnd = (address, port) => {
  const downstream = white(`${address}:${port}`);
  const { downstreamMsgSuccess, proxy, upstream } = symbols;
  log(`${downstream} ${downstreamMsgSuccess} ${proxy} ${downstreamMsgSuccess} ${upstream}`);
};

const logUpstreamMessageStart = (address, port) => {
  const downstream = white(`${address}:${port}`);
  const { upstreamMsgSuccess, proxy, upstreamMsgPending, upstream } = symbols;
  log(`${downstream} ${upstreamMsgSuccess} ${proxy} ${upstreamMsgPending} ${upstream}`);
};

const logUpstreamMessageEnd = (address, port) => {
  const downstream = white(`${address}:${port}`);
  const { upstreamMsgSuccess, proxy, upstream } = symbols;
  log(`${downstream} ${upstreamMsgSuccess} ${proxy} ${upstreamMsgSuccess} ${upstream}`);
};

export {
  logDownstreamConnectionOpen,
  logUpstreamConnectionOpen,
  logE2EConnectionOpen,
  logDownstreamConnectionClose,
  logUpstreamConnectionClose,
  logE2EConnectionClose,
  logDownstreamConnectionError,
  logUpstreamConnectionError,
  logE2EConnectionError,
  logDownstreamMessageStart,
  logDownstreamMessageEnd,
  logUpstreamMessageStart,
  logUpstreamMessageEnd,
};
