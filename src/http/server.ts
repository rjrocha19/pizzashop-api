import { Elysia } from 'elysia'
import cookie from '@elysiajs/cookie'
import { registerRestaurante } from './routes/register-restaurante'
import { sendAuthLink } from './routes/send-auth-link'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { signOut } from './routes/sign-out'
import { getProfile } from './routes/get-profile'
import { getManagedRestaurante } from './routes/get-managed-restaurante'
import { getOrderDetails } from './routes/get-order-details'
import { cancelOrder } from './routes/cancel-order'
import { deliverOrder } from './routes/deliver-order'
import { dispatchOrder } from './routes/dispatch-order'
import { getOrders } from './routes/get-orders'
import { getMonthReceipt } from './routes/get-month.receipt'
import { getDayOrdersAmount } from './routes/get-day-orders-amount'

const app = new Elysia()
  .use(cookie())
  .use(registerRestaurante)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurante)
  .use(getOrderDetails)
  .use(cancelOrder)
  .use(deliverOrder)
  .use(dispatchOrder)
  .use(getOrders)
  .use(getMonthReceipt)
  .use(getDayOrdersAmount)
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status
        return error.toResponse()
      }
      case 'NOT_FOUND': {
        return new Response(null, { status: 404 })
      }
      default: {
        console.error(error)
        return new Response(null, { status: 500 })
      }
    }
  })

app.listen(3333, () => {
  console.log('🔥 HTTP server running!')
})
