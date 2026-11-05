import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin } from 'vite'
import handler from './api/config.ts'

function configApiPlugin(): Plugin {
  return {
    name: 'config-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/config')) {
          let body = '';
          req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
          req.on('end', async () => {
            (req as any).body = body;
            await handler(req, res);
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), configApiPlugin()],
})
