# semaje-web

The semaje web app: capture desk (upload any audio/video, live mic), language
picker for 1,600+ languages, transcript library with search and exports,
meetings, and the admin model workshop. Part of
[semaje](https://github.com/semajehq/semaje). It talks to the semaje API only
over HTTP (`/api/*`, `/ws`).

```bash
npm install
npm run dev          # :5173, proxies /api and /ws to http://localhost:3001 (API_PORT to change)
npm test             # gate tests
npm run build        # dist/
```

## Image

```bash
docker run -p 8080:80 -e SEMAJE_API_UPSTREAM=api:3001 ghcr.io/semajehq/semaje-web:2.0.0
```

| Variable | Default | Meaning |
|---|---|---|
| `SEMAJE_API_UPSTREAM` | `api:3001` | host:port of the semaje API that nginx proxies `/api` and `/ws` to |
| `SEMAJE_RESOLVER` | `127.0.0.11` | DNS server nginx uses to resolve the API per request (Docker's embedded DNS; on Kubernetes use the cluster DNS IP, e.g. `kube-dns.kube-system.svc.cluster.local`) |
| `SEMAJE_MAX_UPLOAD` | `2048m` | largest upload nginx accepts |
| `VITE_AUTH_MODE` (build arg) | `single-user` | `local-db` / `oidc` shows the login screen |

Task types and their options come from the API (`GET /api/tasks`), which owns
the prompt library, so adding a task never needs a web release.
