import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { sendVisitEmail, sendContactEmail } from './sendVisitEmail.js';

function visitNotifierPlugin() {
  return {
    name: 'visit-notifier-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if ((req.url === '/api/notify-visit' || req.url === '/api/contact') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', async () => {
            try {
              const data = body ? JSON.parse(body) : {};
              let result;

              if (req.url === '/api/contact') {
                console.log('[visitNotifierPlugin] Processing contact form submission...');
                result = await sendContactEmail(data);
              } else {
                console.log('[visitNotifierPlugin] Processing portfolio visit notification...');
                result = await sendVisitEmail(data);
              }

              res.statusCode = result.status ? 200 : 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (err) {
              console.error('[visitNotifierPlugin] Error handling request:', err);
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visitNotifierPlugin()],
});
