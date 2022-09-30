const app = require('../src/app');
const request = require('supertest');

describe('GET /products', () =>{
    test('Receive status code 200', async () =>{
        const response = await request(app).get('/products');
        expect(response.statusCode).toEqual(200);
    });
    test('Receive an array', async () =>{
        const response = await request(app).get('/products');
        expect(response.body).toBeInstanceOf(Array);
    });
    test('Receive a non empty array', async () =>{
        const response = await request(app).get('/products');
        expect(response.body.length).toBeGreaterThan(0); 
    });
    test('Every element is a product', async () =>{
        const response = await request(app).get('/products');
        response.body.forEach(p => {
            expect(p).toEqual(expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number),
                mostwanted: expect.any(Boolean)})
            );
        });
    })
});

describe('PUT /products/{id}', () =>{
    const newProduct = {
        name: 'New Product',
        price: 100,
        mostwanted: false
    };
    test('Send empty body', async () =>{
        const response = await request(app).put('/products/1');
        expect(response.statusCode).toEqual(400);
    });
    test('Send body with required fields', async () =>{
        const response = await request(app).put('/products/1').send(newProduct);
        expect(response.statusCode).toEqual(200);
    })
})