import { Db } from "mongodb";
import supertest from "supertest";

import getDatabase from "../../databaseConnection";
import server from "../../server";

describe("Test message route suite", () => {
    let database: Db;
    beforeAll(async () => {
        database = await getDatabase();
    });
    afterEach(async () => {
        await database.collection("testMessage").deleteMany({});
        server.close();
    });
    it("should create a new test message", async () => {
        const response = await supertest(server).post("/saveTestMessage").send({ message: "Test1" }).set("Accept", "application/json");
        expect(response.status).toBe(201);
    });
    it("should get a test message", async () => {
        const responseA = await supertest(server).post("/saveTestMessage").send({ message: "Test2" }).set("Accept", "application/json");
        const responseB = await supertest(server).get(`/getTestMessage/${responseA.body.insertedId}`);
        expect(responseB.body.result.message).toBe("Test2");
    });
    it("should update a test message", async () => {
        const responseA = await supertest(server).post("/saveTestMessage").send({ message: "Test2" }).set("Accept", "application/json");
        const responseB = await supertest(server)
            .put("/updateTestMessage")
            .send({ _id: responseA.body.insertedId, message: "Test3" })
            .set("Accept", "application/json");
        expect(responseB.status).toBe(200);
        expect(responseB.body.message).toBe("The test message was updated successfully");
    });
    it("should delete a test message", async () => {
        const responseA = await supertest(server).post("/saveTestMessage").send({ message: "Test2" }).set("Accept", "application/json");
        const responseB = await supertest(server).delete(`/deleteTestMessage/${responseA.body.insertedId}`).set("Accept", "application/json");
        expect(responseB.status).toBe(200);
        expect(responseB.body.message).toBe("The message was deleted successfully!");
    });
});
