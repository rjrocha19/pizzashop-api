import { Elysia, t } from 'elysia'
import jwt from '@elysiajs/jwt'
import cookie from '@elysiajs/cookie'
import { registerRestaurante } from './routes/register-restaurante'
import { sendAuthLink } from './routes/send-auth-link'
import { env } from '../env'
import { authenticateFromLink } from './routes/authenticate-from-link'

const app = new Elysia()
  .use(cookie())
  .use(registerRestaurante)
  .use(sendAuthLink)
  .use(authenticateFromLink)

app.listen(3333, () => {
  console.log('🔥 HTTP server running!')
})
