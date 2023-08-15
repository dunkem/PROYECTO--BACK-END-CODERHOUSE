import assert from "node:assert";
import mongoose from "mongoose";
import { DaoMongoose } from "../../../../src/dao/mongoose/defaultDaoMongoose.js";

const testSchema = new mongoose.Schema({
  property1: { type: String, required: true },
  property2: { type: String || Number },
  _id: { type: Number },
});
const modelDb = mongoose.model("datosDePruebas", testSchema);

describe("DaoMongoose", () => {
  describe("add", () => {
    it("agrega un elemento correctamente", async () => {
      const dao = new DaoMongoose(modelDb);
      const element = {
        property1: "valor1",
        property2: 123,
      };

      modelDb.create = async (element) => element;
      const result = await dao.add(element);
      assert.deepStrictEqual(result, element);
    });
  });

  describe("findOne", () => {
    it.skip("encuentra un elemento correctamente", async () => {
      // TODO
      const dao = new DaoMongoose(modelDb);
      const condition = { id: "123" };
      const expectedResult = {
        id: "123",
        property1: "valor1",
        property2: 123,
      };

      // @ts-ignore
      // @ts-ignore
      modelDb.findOne = async (condition) => expectedResult;
      const result = await dao.findOne(condition);
      assert.deepStrictEqual(result, expectedResult);
    });

    it("lanza un error si no se encuentra el elemento", async () => {
      const dao = new DaoMongoose(modelDb);
      const condition = { id: "123" };

      // @ts-ignore
      modelDb.findOne = async () => null;
      await assert.rejects(dao.findOne(condition), Error);
    });
  });

  describe("findMany", () => {
    it.skip("encuentra múltiples elementos correctamente", async () => {
      // TODO revisar .select en Dao mongoose
      const dao = new DaoMongoose(modelDb);
      const condition = { property1: "valor1" };
      const expectedResult = [
        { id: "1", property1: "valor1", property2: 123 },
        { id: "2", property1: "valor1", property2: 456 },
      ];

      // @ts-ignore
      modelDb.find = async (condition) => expectedResult;
      const result = await dao.findMany(condition);
      assert.deepStrictEqual(result, expectedResult);
    });
  });
});
