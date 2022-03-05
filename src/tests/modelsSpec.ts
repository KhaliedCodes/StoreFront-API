import {OrderDBContext, Order} from "../models/Order"
import { UserDBContext, User } from "../models/User";
import { ProductDBContext, Product } from "../models/Product";

const userContext = new UserDBContext();
const productContext = new ProductDBContext();
const orderContext = new OrderDBContext();

let user: User = {
  id: 21,
  username: "Randysorton",
  password: "orton1234",
  firstname: "randys",
  lastname:"orton"
}
let product: Product = {
  id: 21,
  product_name: "Randysorton",
  price: 123,
  category: "randys"
}



describe('Testing user model',  () => {
    it('index method expected to return an array of users', async () => {
      const result = await userContext.index()
      expect(result).toBeInstanceOf(Array);
    });
    
    
    
    
    it('create method expected to return a user object after success', async () => {
      const result = await userContext.create(user)
      expect(result).toBeInstanceOf(Object);
    });
    it('show method expected to return a user object ', async () => {
      const result = await userContext.show(1)
      expect(result).toBeInstanceOf(Object);
    });
    
    it('login method expected to be a user object with correct credintials', async () => {
      const result = await userContext.authenticate(user.username as string,user.password as string)
      
      expect(result).toBeInstanceOf(Object);
    });
    it('login method expected to be null with wrong credintials', async () => {
      const result = await userContext.authenticate("Anything","Goes")
      
      expect(result).toBe(null);
    });
    
    
  });
  
  describe('Testing product model',  () => {
    it('index endpoint expected to reuturn an array of products ', async () => {
      const result = await productContext.index()
      expect(result).toBeInstanceOf(Array);
    });
    
    it('create expected to return a product object after success', async () => {
      const result = await productContext.create(product)
      expect(result).toBeInstanceOf(Object);
    });
    
   
    
    it('show expected to return a product object after success ', async () => {
      const result = await productContext.show(1)
      expect(result).toBeInstanceOf(Object);
    });

    
  });
  
  describe('Testing orders router endpoints',  () => {
    it('index endpoint expected to reuturn an array of orders ', async () => {
      const result = await orderContext.index(1)
      expect(result).toBeInstanceOf(Array);
    });
    
    it('create expected to return an order object after success', async () => {
      const result = await orderContext.create(1)
      expect(result).toBeInstanceOf(Object);
    });
    
    
    
    it('completeOrder expected to return an order object after success ', async () => {
      const result = await orderContext.completeOrder(1,1)
      expect(result).toBeInstanceOf(Object);
    });

  
  });
  