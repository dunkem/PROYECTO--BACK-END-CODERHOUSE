import { DaoFs } from "./defaultDaofs.js";

export const tm = new DaoFs("./src/database/tickets.json", "Ticket");
