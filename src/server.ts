import express from 'express'
import bodyParser from 'body-parser'
import userRouter from './routes/userRoute'
import productRouter from './routes/productRoute'
import orderRouter from './routes/orderRoute'

const app: express.Application = express()
const address: string = "localhost:3000"
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
export default app