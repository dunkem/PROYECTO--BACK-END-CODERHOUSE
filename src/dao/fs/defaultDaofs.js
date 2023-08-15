import fs from "fs/promises";
import { ErrorNotFound } from "../../models/error/errors.model.js";

export class DaoFs {
  #path;
  #ref;
  constructor(path, ref) {
    this.#path = path;
    this.#ref = ref;
  }

  async #load() {
    const json = await fs.readFile(this.#path, "utf-8");
    this.things = JSON.parse(json);
  }

  async #write() {
    const write = JSON.stringify(this.things, null, 2);
    await fs.writeFile(this.#path, write);
  }

  async add(thing) {
    await this.#load();
    const codeValid = this.things.find((e) => e.code === thing.code);
    if (codeValid) {
      throw new Error(`${this.#ref} already exist`);
    }

    this.things.push(thing);
    await this.#write();
    return thing;
  }

  async findOne(condition) {
    const ck = Object.keys(condition)[0];
    const cv = condition[ck];
    await this.#load();
    const finder = this.things.find((c) => c[ck] === cv);
    if (!finder) {
      throw new ErrorNotFound(`${this.#ref} Not Found`);
    }
    return finder;
  }

  async findOneById(condition) {
    await this.#load();
    const finder = this.things.find((c) => c.id === condition);
    if (!finder) {
      throw new ErrorNotFound(`${this.#ref} Not Found`);
    }
    return finder;
  }

  async findMany(condition) {
    await this.#load();
    let finder;
    if (condition) {
      const ck = Object.keys(condition)[0];
      const cv = condition[ck];
      finder = this.things.filter((c) => c.id === cv);
      if (!finder) {
        throw new ErrorNotFound(`${this.#ref} Not Found`);
      }
    }
    finder = this.things;
    return finder;
  }

  async updateOne(condition, data) {
    await this.#load();
    const updindex = this.things.findIndex((e) => e.id === condition);
    if (updindex === -1) {
      throw new ErrorNotFound(`${this.#ref} Not Found`);
    }
    const oldthing = this.things[updindex];
    this.things[updindex] = { ...oldthing, ...data };
    await this.#write();
    return this.things[updindex];
  }

  async updateMany(condition, data) {
    const ck = Object.keys(condition)[0];
    const cv = condition[ck];
    await this.#load();

    const updatedthings = [];
    for (let i = 0; i < this.things.length; i++) {
      const thing = this.things[i];
      if (thing.id === cv) {
        updatedthings.push({ ...thing, ...data });
      }
    }

    if (updatedthings.length === 0) {
      throw new ErrorNotFound("Not found with the specified condition");
    }

    this.things = this.things.map((thing) => {
      const updatedthing = updatedthings.find(
        (updated) => updated.id === thing.id
      );
      return updatedthing || thing;
    });

    await this.#write();

    return updatedthings;
  }

  async deleteOne(condition) {
    await this.#load();
    const finder = this.things.find((c) => c.id === condition);
    if (!finder) {
      throw new ErrorNotFound(`${this.#ref} Not Found`);
    }
    const deleter = this.things.filter((e) => e.id !== condition);
    this.things = deleter;
    await this.#write();
  }

  async deleteMany(condition) {
    const ck = Object.keys(condition)[0];
    const cv = condition[ck];
    await this.#load();
    const finder = this.things.find((c) => c[ck] === cv);
    if (!finder) {
      throw new ErrorNotFound(`${this.#ref} Not Found`);
    }
    const deleter = this.things.filter((e) => e[ck] !== cv);
    this.things = deleter;
    await this.#write();
  }
}
