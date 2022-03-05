import { Router, Request, Response} from "express";
import { OrderDBContext } from "../models/Order";
import authenticate from "../middlewares/authenticate";
import jwt, { JwtPayload } from "jsonwebtoken"
import {query,body} from "express-validator"
import { validationResult } from "express-validator/src/validation-result";
const context = new OrderDBContext();

const orderRouter = Router();
export default orderRouter

orderRouter.get("/index",authenticate, async (req: Request,res: Response)=>{
  
  try {
    const payload = jwt.decode(req.body.token) as JwtPayload
    const orders = await context.index(payload.id )
    res.status(200).json(orders)
  } catch(err) {
    res.status(400).json({err})
  }
})

orderRouter.post("/complete",authenticate,query('order_id').isNumeric(), async (req: Request,res: Response)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
  try {
    const payload = jwt.decode(req.body.token) as JwtPayload
    const order_id = parseInt(req.query.order_id as string)
    const order = await context.completeOrder(order_id,payload.id )
    res.status(200).json(order)
  } catch(err) {
    res.status(400).json({err})
  }
})

orderRouter.post("/create",authenticate, async (req: Request,res: Response)=>{
  
    try {
      const payload = jwt.decode(req.body.token) as JwtPayload
      const order = await context.create(payload.id )
      res.status(200).json(order)
    } catch(err) {
      res.status(400).json({err})
    }
})

orderRouter.post("/addProduct",authenticate,query('id').isNumeric(), body('productId').isNumeric(), body('quantity').isNumeric(), async (req: Request,res: Response)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const orderId= req.query.id
    const productId= req.body.productId
    const quantity = parseInt(req.body.quantity)
    const user_id = (jwt.decode(req.body.token) as JwtPayload).id
  
    try {
      const addedProduct = await context.addProduct(quantity, orderId as string, productId, user_id)
      res.status(200).json(addedProduct)
    } catch(err) {
      res.status(400).json({err})
    }
})