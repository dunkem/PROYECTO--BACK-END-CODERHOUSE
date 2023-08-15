import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../src/config/config.js";

export const mochaHooks = {
  async beforeAll() {
    await mongoose.connect(MONGODB_CNX_STR);
  },

  async afterAll() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  },
};
