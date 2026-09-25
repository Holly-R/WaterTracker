import path from "path";
import { DatabaseSync } from 'node:sqlite';

const dbPath = path.join(__dirname, "db.sqli");

const database = new DatabaseSync(dbPath);

export default database