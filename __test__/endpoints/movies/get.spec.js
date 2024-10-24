const app = require("../../../server");
const supertest = require("supertest");
const request = supertest(app);
describe("Testing movies", () => {
	test("should get movies from db", async () => {
		const resp = await request.get("/movies");
		console.log(resp);
		expect(resp.header["content-type"]).toBe("application/json; charset=utf-8");
		expect(resp.statusCode).toBe(200);
	});
});
