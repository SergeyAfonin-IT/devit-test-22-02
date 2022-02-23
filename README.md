
## How to start

Node version 16.14.0

Create ``.env`` in ``packages/server`` by example and set ``HOST_URL`` in ``packages/client/src/config/index.ts``

```bash
  yarn install
```
```bash
  yarn bootstrap
```

For development:
```bash
  yarn server:dev
```
```bash
  yarn client:dev
```

For production:

```bash
  yarn start
```