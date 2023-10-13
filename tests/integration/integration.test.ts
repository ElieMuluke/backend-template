import request from "supertest";
import app from "../../index";

describe ("Test server running", () => {
	it("should return 200", async () => {
		const res = await request(app).get("/");
		expect(res.statusCode).toBe(200);
	});
});