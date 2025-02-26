# AIS Tracker API 🛳️

A simple WebSocket proxy for connecting to [aisstream.io](https://aisstream.io)'s WebSocket API.

[aisstream.io](https://aisstream.io) delivers real-time ship movement data over WebSockets. This is a fantastic free resource - please use responsibly.

**Note**: ais-tracker-api requires an [aisstream.io API key](https://aisstream.io/apikeys). This is free to create but requires logging in with a GitHub account.

## Setup

### 1. Clone repository

```bash
git clone https://github.com/richardIambert/ais-tracker-api
```

### 2. Change into project root directory

```bash
cd ais-tracker-api
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Setup environment variables

Head over to [aisstream.io](https://aisstream.io/apikeys) and create a free API key.

Create a local `.env` file in the root of the project and add the following:

```
PORT=8080
SOCKET_WAIT_TIME=1000
AISSTREAM_SOCKET_UPDATE=AISStreamSocketUpdate
AISSTREAM_API_URL=wss://stream.aisstream.io/v0/stream
AISSTREAM_API_KEY=<your_aisstream_api_key_here>
```

### 4. Run the server

```bash
pnpm dev
```

The proxy is now ready to recieve WebSocket connections on `ws://localhost:8080`.
