import assert from "assert";
import supertest from "supertest";

const httpClient = supertest(
  "https://back-proyecto-final-production-bee0.up.railway.app"
);

describe("api rest", () => {
  describe("/api/sessions", () => {
    describe("POST", () => {
      describe("when sending a request to create a session", () => {
        it("creates a session and returns 201", async () => {
          const response = await httpClient.post("/api/sessions");
          assert.strictEqual(response.statusCode, 201);
        });
      });
    });
  });

  describe("GET /api/sessions/current", () => {
    describe("when sending a request to get the current session", () => {
      it("returns the current session and status code 200", async () => {
        const response = await httpClient.get("/api/sessions/current");
        assert.strictEqual(response.statusCode, 200);
      });
    });
  });
});
