import assert from "assert";
import supertest from "supertest";
import { Uid } from "../../../src/utils/UiD.js";
import { cmg } from "../../../src/dao/mongoose/cart.dao.mg.js";

const httpClient = supertest(
  "https://back-proyecto-final-production-bee0.up.railway.app"
);

describe("api rest", () => {
  describe("/api/carts", () => {
    // beforeEach(async () => {
    //   await cmg.deleteMany({});
    // });

    // afterEach(async () => {
    //   await cmg.deleteMany({});
    // });

    describe("POST", () => {
      describe("when sending a request to create a cart", () => {
        it("creates a cart and returns 200", async () => {
          const response = await httpClient.post("/api/carts");
          assert.strictEqual(response.statusCode, 200);
        });
      });
    });

    describe("GET", () => {
      describe("when sending a request to get a cart", () => {
        it("returns the cart and status code 200", async () => {
          await cmg.add({ id: `test-0000-${Uid()}` });

          const response = await httpClient.get(`/api/carts/test-0000`);
          assert.strictEqual(response.statusCode, 200);
        });
      });
    });
  });

  describe("POST /api/carts/:cid/product/:pid", () => {
    describe("when sending a request to add a product to a cart", () => {
      it.skip("adds the product to the cart and returns status code 201", async () => {
        // TODO: revisar
        const cartId = `TEST-CART-${Uid()}`;
        await cmg.add({ id: cartId });

        const productId = `TEST-PRODUCT-${Uid()}`;
        const quantity = 2;

        const response = await httpClient.post(
          `/api/carts/${cartId}/product/${productId}?quantity=${quantity}`
        );
        assert.strictEqual(response.statusCode, 201);
      });
    });
  });

  describe("PUT /api/carts/:cid", () => {
    describe("when sending a request to update a cart", () => {
      it("updates the cart and returns status code 200", async () => {
        const cartId = "test-0000";
        await cmg.add({ id: cartId });

        const updatedCartData = {
          products: [{ product: "test-producto-0000", quantity: 2 }],
        };

        const response = await httpClient
          .put(`/api/carts/${cartId}`)
          .send(updatedCartData);
        assert.strictEqual(response.statusCode, 200);
      });
    });
  });

  // describe('DELETE /api/carts/:cid', () => {
  //   describe('when sending a request to delete a cart', () => {
  //     it('deletes the cart and returns status code 200', async () => {
  //       const cartId = Uid();
  //       await cmg.add({ id: cartId });

  //       const response = await httpClient.delete(`/api/carts/${cartId}`);
  //       assert.strictEqual(response.statusCode, 200);
  //     });
  //   });
  // });
});
