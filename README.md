# ERD Playground

Paste PostgreSQL DDL and instantly visualize your database schema as an ER diagram. No signup, no install — runs entirely in your browser.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Cloud Run

```bash
gcloud run deploy erd-playground \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 3
```

## Architecture

- **Next.js 15** with standalone output for minimal Docker image
- **@liam-hq/erd-core** for ERD visualization (React Flow)
- **@liam-hq/schema** with PostgreSQL parser (pg-query-emscripten WASM)
- **CodeMirror** for SQL editing with syntax highlighting
- All parsing runs client-side in the browser via WebAssembly — no server-side SQL execution
