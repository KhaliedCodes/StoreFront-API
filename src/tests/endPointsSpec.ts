import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
describe('Testing user router endpoints',  () => {
  it('users/index endpoint expected to 401 without token', async () => {
    const result = await request.get("/users/index")
    expect(result.status).toBe(401);
  });
  it('users/index endpoint expected to 200 with token', async () => {
    const result = await request.get("/users/index")
    .send({"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk"});
    expect(result.status).toBe(200);
  });
  it('users/show endpoint expected to 401 without token ', async () => {
    const result = await request.get("/users/show")
    expect(result.status).toBe(401);
  });
  
  it('users/create endpoint expected to 400 without a username or a password', async () => {
    const result = await request.post("/users/create")
    expect(result.status).toBe(400);
  });
  it('users/create endpoint expected to 201 with a username and a password', async () => {
    const result = await request.post("/users/create")
    .send({
      username: "randy",
      password: "randy1234"
    })
    expect(result.status).toBe(201);
  });
  it('users/show endpoint expected to 200 with token and id of an existing user otherwise returns 400', async () => {
    const result = await request.get("/users/show")
    .send({"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk"})
    .query({id:"1"})
    expect(result.status).toBe(200);
  });
  it('users/create endpoint expected to 400 with a username less than 5 characters', async () => {
    const result = await request.post("/users/create")
    .send({
      username: "rand",
      password: "rand1234"
    })
    expect(result.status).toBe(400);
  });
  it('users/create endpoint expected to 400 with a password less than 8 characters', async () => {
    const result = await request.post("/users/create")
    .send({
      username: "randy",
      password: "rand123"
    })
    expect(result.status).toBe(400);
  });
  it('users/login endpoint expected to 400 with wrong username and password', async () => {
    const result = await request.post("/users/login")
    .send({
      username: "randy",
      password: "rand123"
    })
    expect(result.status).toBe(400);
  });
  
});

describe('Testing products router endpoints',  () => {
  it('products/index endpoint expected to 200 ', async () => {
    const result = await request.get("/products/index")
    expect(result.status).toBe(200);
  });
  
  it('products/create endpoint expected to 401 without a token', async () => {
    const result = await request.post("/products/create")
    expect(result.status).toBe(401);
  });
  it('products/create endpoint expected to 400 without a name or a price', async () => {
    const result = await request.post("/products/create")
    .send({"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk"})
    expect(result.status).toBe(400);
  });
  it('products/create endpoint expected to 400 with non numeric price', async () => {
    const result = await request.post("/products/create")
    .send({
      product_name: "randy",
      price: "rand1234",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk"
    })
    expect(result.status).toBe(400);
  });
  it('products/create endpoint expected to 200 with valid name and price', async () => {
    const result = await request.post("/products/create")
    .send({
      product_name: "aseer",
      price: "1234",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk"
    })
    expect(result.status).toBe(200);
  });
  it('products/show endpoint expected to 200 with an id of an existing product otherwise is 400 ', async () => {
    const result = await request.get("/products/show")
    .query({id:1})
    expect(result.status).toBe(200);
  });
});

describe('Testing orders router endpoints',  () => {
  it('orders/index endpoint expected to 401 without token ', async () => {
    const result = await request.get("/orders/index")
    expect(result.status).toBe(401);
  });
  it('orders/index endpoint expected to 200 with token ', async () => {
    const result = await request.get("/orders/index")
    .send({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk"})
    expect(result.status).toBe(200);
  });
  it('orders/create endpoint expected to 200 with token ', async () => {
    const result = await request.post("/orders/create")
    .send({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk"})
    expect(result.status).toBe(200);
  });
  it('orders/complete endpoint expected to 200 with token and order_id that exists ', async () => {
    const result = await request.post("/orders/complete")
    .send({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk"})
    .query({order_id: "1"})
    expect(result.status).toBe(200);
  });
 
  
});
