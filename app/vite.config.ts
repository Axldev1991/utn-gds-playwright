import { spawn } from 'node:child_process'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function playwrightRunnerPlugin(): Plugin {
  return {
    name: 'playwright-test-runner',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api/run-tests')) {
          return next()
        }

        // Configuración de Server-Sent Events (SSE)
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
          'Access-Control-Allow-Origin': '*',
        })

        const url = new URL(req.url, 'http://localhost:5173')
        const mode = url.searchParams.get('mode') || 'all' // all | auth | task | healing
        const headed = url.searchParams.get('headed') === 'true'

        const sendEvent = (event: string, data: Record<string, unknown> | string) => {
          res.write(`event: ${event}\ndata: ${typeof data === 'string' ? data : JSON.stringify(data)}\n\n`)
        }

        sendEvent('start', {
          mode,
          headed,
          timestamp: new Date().toISOString(),
          message: `Iniciando suite de Playwright (Modo: ${mode}, Headed: ${headed})...`
        })

        const rootDir = path.resolve(process.cwd(), '..')
        let command = 'npx'
        let args: string[] = ['playwright', 'test']

        if (mode === 'auth') {
          args.push('e2e/tests/02-auth-flow.spec.ts')
        } else if (mode === 'task') {
          args.push('e2e/tests/04-task-creation-flow.spec.ts')
        } else if (mode === 'fragile') {
          args.push('e2e/ai-adaptive/fragile-selectors.spec.ts')
        } else if (mode === 'healing') {
          command = 'npx'
          args = ['tsx', 'e2e/ai-adaptive/llm-healing-demo.ts']
        }

        if (mode !== 'healing') {
          if (headed) args.push('--headed')
          args.push('--reporter=line')
        }

        const child = spawn(command, args, {
          cwd: rootDir,
          env: { ...process.env, FORCE_COLOR: '1' },
          shell: true,
        })

        child.stdout.on('data', (data) => {
          const lines = data.toString()
          sendEvent('output', lines)
        })

        child.stderr.on('data', (data) => {
          const lines = data.toString()
          sendEvent('output', lines)
        })

        child.on('close', (code) => {
          sendEvent('done', {
            code,
            success: code === 0,
            message: code === 0 ? '✔ Suite completada exitosamente.' : `✖ Finalizado con código de salida: ${code}`
          })
          res.end()
        })

        req.on('close', () => {
          if (!child.killed) child.kill()
        })
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), playwrightRunnerPlugin()],
})
