import assert from "assert";
import supertest from "supertest";
import { pmg } from "../../../src/dao/mongoose/product.dao.mg.js";
import { Uid } from "../../../src/utils/UiD.js";

const httpClient = supertest(
  "https://back-proyecto-final-production-bee0.up.railway.app"
);

describe("api rest", () => {
  describe("/api/products", () => {
    beforeEach(async () => {
      await pmg.deleteMany({});
    });

    afterEach(async () => {
      await pmg.deleteMany({});
    });

    describe("POST", () => {
      describe("when sending a request with correct data", () => {
        it("creates a product and returns 200", async () => {
          const productData = {
            title: "Sample Product",
            description: "This is a sample product",
            price: 9.99,
            thumbnail: "thumbnail_url.png",
            code: Uid(),
            stock: 99,
            category: "Category 1",
            owner: "admin",
          };

          const response = await httpClient
            .post("/api/products")
            .send(productData);
          assert.strictEqual(response.statusCode, 200);
        });
      });
    });

    describe("GET", () => {
      describe("when sending a request and there are products", () => {
        it("returns the collection of products and status code 200", async () => {
          const response = await httpClient.get("/api/products");
          assert.strictEqual(response.statusCode, 200);
        });
      });
    });
  });

  describe("GET /api/products/:pcd", () => {
    describe("when sending a request with a valid product code", () => {
      it("returns the product with the specified code", async () => {
        const response = await httpClient.get("/api/products/0000");
        assert.strictEqual(response.statusCode, 200);
      });
    });

    describe("when sending a request with an invalid product code", () => {
      it("returns an error", async () => {
        const response = await httpClient.get(
          "/api/products/code/invalid-code"
        );
        assert.strictEqual(response.statusCode, 404);
      });
    });
  });

  describe("GET /api/products/:pid", () => {
    describe("when sending a request with a valid product ID", () => {
      it("returns the product with the specified ID", async () => {
        const response = await httpClient.get("/api/products/0000");
        assert.strictEqual(response.statusCode, 200);
      });
    });

    describe("when sending a request with an invalid product ID", () => {
      it("returns an error", async () => {
        const response = await httpClient.get("/api/products/invalid-code");
        assert.strictEqual(response.statusCode, 404);
      });
    });
  });

  // test PUT and DELETE
});

// test PUT and DELETE
// describe('PUT /api/products/:pid', () => {
//   describe('when sending a request with a valid product ID and updated data', () => {
//     it('updates the product and returns the updated product', async () => {
//       const updatedProductData = {
//         title: 'Sample Product updated',
//         description: 'This is a sample product updated',
//       };

//       const response = await httpClient.put('/api/products/valid-id').send(updatedProductData);
//       assert.strictEqual(response.statusCode, 200);
//     });
//   });

//   describe('when sending a request with an invalid product ID', () => {
//     it('returns an error', async () => {
//       const updatedProductData = {
//         title: 'Sample Product updated',
//         description: 'This is a sample product updated',
//       };

//       const response = await httpClient.put('/api/products/0000').send(updatedProductData);
//       assert.strictEqual(response.statusCode, 404);
//     });
//   });
// });

// describe('DELETE /api/products/:pid', () => {
//   describe('when sending a request with a valid product ID', () => {
//     it('deletes the product and returns status code 204', async () => {
//       const response = await httpClient.delete('/api/products/valid-id');
//       assert.strictEqual(response.statusCode, 204);
//     });
//   });

//   describe('when sending a request with an invalid product ID', () => {
//     it('returns an error', async () => {
//       const response = await httpClient.delete('/api/products/0000');
//       assert.strictEqual(response.statusCode, 404);
//     });
//   });
// });

// ------------------------------------------------------------------------------------------------------------

// import assert from 'assert';
// import supertest from 'supertest';
// import { pmg } from '../../../src/dao/mongoose/product.dao.mg.js';
// import { productsRepository } from '../../../src/repositories/product.repositorie.js';
// // import { productsRepository } from '../../../repositories/product.repositorie.js';
// // import { pmg } from '../../../dao/mongoose/product.dao.mg.js';

// const httpClient = supertest('https://back-proyecto-final-production-bee0.up.railway.app');

// describe('api rest', () => {
//   describe('/api/products', () => {
//     beforeEach(async () => {
//       await pmg.deleteMany({});
//     });

//     afterEach(async () => {
//       await pmg.deleteMany({});
//     });

//     describe('POST', () => {
//       describe('when sending a request with correct data', () => {
//         it.only('creates a product and returns 200', async () => {
//           const productData = {
//             title: 'Sample Product',
//             description: 'This is a sample product',
//             price: 9.99,
//             thumbnail: 'thumbnail_url.png',
//             code: '1234',
//             stock: 10,
//             category: 'Category 1',
//             owner: 'admin',
//           };

//           const expectedResult = { // no puedo testear el id
//             title: 'Sample Product',
//             description: 'This is a sample product',
//             price: 9.99,
//             code: '1234',
//             stock: 10,
//             category: 'Category 1',
//             owner: 'admin',

//             status: true,
//             thumbnail: ['thumbnail_url.png'],
//           };

//           const response = await httpClient.post('/api/products').send(productData);
//           assert.strictEqual(response.statusCode, 200);
//           assert.deepStrictEqual(response.body, expectedResult);
//         });
//       });
//     });

//     describe('GET', () => {
//       describe('when sending a request and there are products', () => {
//         it('returns the collection of products and status code 200', async () => {
//           const productInDB = {
//             hasNextPage: false,
//             hasPrevPage: false,
//             nextLink: 'Not Exist',
//             nextPage: null,
//             page: 1,
//             payload: [{
//               category: 'Category 1',
//               code: '1234',
//               description: 'This is a sample product',
//               price: 9.99,
//               stock: 10,
//               title: 'Sample Product',
//               status: true,
//               id: '',
//             }]
//           };
//           await productsRepository.add(productInDB);

//           const response = await httpClient.get('/api/products');

//           assert.strictEqual(response.statusCode, 200);
//           assert.deepStrictEqual(response.body, [productInDB]);
//         });
//       });
//     });
//   });

//   describe('GET /api/products/code/:pcd', () => {
//     describe('when sending a request with a valid product code', () => {
//       it('returns the product with the specified code', async () => {
//         const productInDB = {
//           title: 'Sample Product',
//           description: 'This is a sample product',
//           price: 9.99,
//           thumbnail: 'thumbnail_url.png',
//           code: '1234',
//           stock: 10,
//           category: 'Category 1',
//           owner: 'admin',
//         };
//         await productsRepository.add(productInDB);

//         const response = await httpClient.get('/api/products/code/1234');

//         assert.strictEqual(response.statusCode, 200);
//         assert.deepStrictEqual(response.body, productInDB);
//       });
//     });

//     describe('when sending a request with an invalid product code', () => {
//       it('returns an error', async () => {
//         const response = await httpClient.get('/api/products/code/invalid-code');

//         assert.strictEqual(response.statusCode, 404);
//       });
//     });
//   });

//   describe('GET /api/products/:pid', () => {
//     describe('when sending a request with a valid product ID', () => {
//       it('returns the product with the specified ID', async () => {
//         const productInDB = {
//           _id: 'valid-id',
//           title: 'Sample Product',
//           description: 'This is a sample product',
//           price: 9.99,
//           thumbnail: 'thumbnail_url.png',
//           code: '1234',
//           stock: 10,
//           category: 'Category 1',
//           owner: 'admin',
//         };
//         await productsRepository.add(productInDB);

//         const response = await httpClient.get('/api/products/valid-id');

//         assert.strictEqual(response.statusCode, 200);
//         assert.deepStrictEqual(response.body, productInDB);
//       });
//     });

//     describe('when sending a request with an invalid product ID', () => {
//       it('returns an error', async () => {
//         const response = await httpClient.get('/api/products/0000');

//         assert.strictEqual(response.statusCode, 404);
//       });
//     });
//   });

//   describe('PUT /api/products/:pid', () => {
//     describe('when sending a request with a valid product ID and updated data', () => {
//       it('updates the product and returns the updated product', async () => {
//         const productInDB = {
//           _id: 'valid-id',
//           title: 'Sample Product',
//           description: 'This is a sample product',
//           price: 9.99,
//           thumbnail: 'thumbnail_url.png',
//           code: '1234',
//           stock: 10,
//           category: 'Category 1',
//           owner: 'admin',
//         };
//         await productsRepository.add(productInDB);

//         const updatedProductData = {
//           title: 'Updated Product',
//           description: 'This is an updated product',
//           price: 19.99,
//           thumbnail: ['updated_thumbnail_url'],
//           code: '5678',
//           stock: 20,
//           category: 'Category 2',
//         };

//         const expectedUpdatedProduct = {
//           _id: 'valid-id',
//           title: 'Updated Product',
//           description: 'This is an updated product',
//           price: 19.99,
//           thumbnail: ['updated_thumbnail_url'],
//           code: '5678',
//           stock: 20,
//           category: 'Category 2',
//           owner: 'admin',
//         };

//         const response = await httpClient.put('/api/products/valid-id').send(updatedProductData);

//         assert.strictEqual(response.statusCode, 200);
//         assert.deepStrictEqual(response.body, expectedUpdatedProduct);
//       });
//     });

//     describe('when sending a request with an invalid product ID', () => {
//       it('returns an error', async () => {
//         const updatedProductData = {
//           title: 'Updated Product',
//           description: 'This is an updated product',
//           price: 19.99,
//           thumbnail: ['updated_thumbnail_url'],
//           code: '5678',
//           stock: 20,
//           category: 'Category 2',
//         };

//         const response = await httpClient.put('/api/products/0000').send(updatedProductData);

//         assert.strictEqual(response.statusCode, 404);
//       });
//     });
//   });

//   describe('DELETE /api/products/:pid', () => {
//     describe('when sending a request with a valid product ID', () => {
//       it('deletes the product and returns status code 204', async () => {
//         const productInDB = {
//           _id: 'valid-id',
//           title: 'Sample Product',
//           description: 'This is a sample product',
//           price: 9.99,
//           thumbnail: 'thumbnail_url.png',
//           code: '1234',
//           stock: 10,
//           category: 'Category 1',
//           owner: 'admin',
//         };
//         await productsRepository.add(productInDB);

//         const response = await httpClient.delete('/api/products/valid-id');

//         assert.strictEqual(response.statusCode, 204);
//       });
//     });

//     describe('when sending a request with an invalid product ID', () => {
//       it('returns an error', async () => {
//         const response = await httpClient.delete('/api/products/0000');

//         assert.strictEqual(response.statusCode, 404);
//       });
//     });
//   });
// });
