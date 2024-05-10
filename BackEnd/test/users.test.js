const request = require("supertest");
const app = require("../app");

describe("GET /api/users", () => {
  let server;

  beforeAll(() => {
    server = app.listen(4000); // Start the server before running tests
  });

  afterAll((done) => {
    server.close(done); // Close the server after all tests are complete
  });

  it("responds with JSON", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});
