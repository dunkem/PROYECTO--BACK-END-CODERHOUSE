import { DaoFs } from "./defaultDaofs.js";

export const pm = new DaoFs("./src/database/productos.json", "Product");
