const { MongoClient } = require("mongodb");

describe("insert operations", () => {
	let client;
	let db;
	const mockCollectionName = "characters-mocks";

	beforeAll(async () => {
		client = await MongoClient.connect(process.env.MONGO_URI);
		db = client.db();
	});

	afterAll(async () => {
		await db.collection(mockCollectionName).deleteOne({ _id: "some-user-id" });
		await client.close();
	});

	it("should insert a doc into collection", async () => {
		const users = db.collection(mockCollectionName);

		const mockUser = { _id: "some-user-id", fullName: "John" };
		await users.insertOne(mockUser);

		const insertedUser = await users.findOne({ _id: "some-user-id" });
		expect(insertedUser).toEqual(mockUser);
	});
});
