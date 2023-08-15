import mongoose from "mongoose";
import { DaoMongoose } from "../../src/dao/mongoose/defaultDaoMongoose.js";
import assert from "node:assert";

//esquemas de prueba
const testSchema = new mongoose.Schema({
  property1: { type: String, required: true },
  property2: Number,
});
const testModel = mongoose.model("tests", testSchema);

//datos de prueba

const testData = {
  property1: "un nombre",
  property2: 1,
};

const testDataIncompleto = {
  property2: 1,
};

//mocha methods

before(async () => {
  // esto sucede antes de comenzar la primera prueba
  await mongoose.connect("mongodb://localhost/testadopciones");
});

after(async () => {
  // esto sucede despues de finalizar la última prueba
  await mongoose.connection.dropDatabase(); // antes de desconectarme borro la base que usé para las pruebas
  await mongoose.connection.close();
});

describe("dao mongoose (genérico)", () => {
  beforeEach(async () => {
    await mongoose.connection.collection("tests").deleteMany({});
  });

  describe("create", () => {
    describe("cuando llamo al create con un objeto con el esquema correspondiente", () => {
      it("devuelve el mismo objeto sin agregarle ningun campo ni métodos", async () => {
        const dao = new DaoMongoose(testModel);
        const pojo = await dao.add(testData);
        assert.ok(!pojo._id, "no debería tener _id");
        assert.ok(pojo.property1, "debería tener property1");
        assert.ok(pojo.property2, "debería tener property2");
      });
    });

    describe("cuando llamo al create con un objeto con un esquema distinto al esperado", () => {
      it("lanza un error", async () => {
        const dao = new DaoMongoose(testModel);
        await assert.rejects(
          dao.add(testDataIncompleto),
          mongoose.Error.ValidationError
        );
      });
    });
  });
});
