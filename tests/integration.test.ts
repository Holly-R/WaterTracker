import { assert, describe, expect, it, vi, afterEach } from "vitest";
import request from "supertest";
import { app } from "../src/routes";
import test from "node:test";

// @ts-ignore
const { mockDatabase } = vi.hoisted(() => {
  // Use a dynamic require to safely pull node:sqlite at the very top of execution
  const { DatabaseSync } = require("node:sqlite");
  const database = new DatabaseSync(":memory:");

  // Set up your schema structure
  database.exec(`
   CREATE TABLE Events (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	date DATETIME DEFAULT (datetime('now', 'localtime')),
	amount_in_ml NUMBER NOT NULL,
	drink_type VARCHAR(100) NOT NULL
);
  `);

  database.exec(`
    INSERT into "Events" (amount_in_ml, drink_type, date) values (500, 'test drink', '2026-11-04 15:36:28');
  `);

  return { mockDatabase: database };
});

// 2. Mock the file using the pre-hoisted instance
vi.mock("../src/database", () => {
  return {
    default: mockDatabase, // Maps to 'import database from ...'
    database: mockDatabase, // Maps to 'import { database } from ...'
  };
});

describe("GET /events", function () {
  afterEach(async () => {
    mockDatabase.exec("drop table Events");

    mockDatabase.exec(`
   CREATE TABLE Events (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	date DATETIME DEFAULT (datetime('now', 'localtime')),
	amount_in_ml NUMBER NOT NULL,
	drink_type VARCHAR(100) NOT NULL
);
  `);

    mockDatabase.exec(`
    INSERT into "Events" (amount_in_ml, drink_type, date) values (500, 'test drink', '2026-11-04 15:36:28');
  `);
  });

  it("responds with json", async () => {
    // @ts-ignore
    const res = await request(app)
      .get("/events")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.body).toEqual([
      {
        amount_in_ml: 500,
        date: "2026-11-04 15:36:28",
        drink_type: "test drink",
        id: 1,
      },
    ]);
    expect(res.status).toBe(200);
  });
  it("responds with specific event", async () => {
    // @ts-ignore
    const res = await request(app)
      .get("/events/1")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.body).toEqual({
      amount_in_ml: 500,
      date: "2026-11-04 15:36:28",
      drink_type: "test drink",
      id: 1,
    });
    expect(res.status).toBe(200);
  });

  it("Delete success", async () => {
    // @ts-ignore
    const res = await request(app)
      .delete("/events/1")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.status).toBe(200);

    // @ts-ignore
    const res2 = await request(app)
      .get("/events/1")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res2.status).toBe(404);
  });

  it("create new event", async () => {
    const res = await request(app)
      .post("/events")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({
        amount_in_ml: 500,
        date: "2026-11-04 15:36:28",
        drink_type: "vodka",
      });

    expect(res.body).toEqual({
      amount_in_ml: 500,
      date: "2026-11-04 15:36:28",
      drink_type: "vodka",
      id: 2,
    });
  });

  it("Update entry", async () => {
    const res = await request(app)
      .put("/events/1")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({
        amount_in_ml: 500,
        date: "2026-11-04 15:36:28",
        drink_type: "vodka",
      });

    expect(res.body).toEqual({
      amount_in_ml: 500,
      date: "2026-11-04 15:36:28",
      drink_type: "vodka",
      id: 1,
    });
  });
  it("Get from empty db", async () => {
    // @ts-ignore
    const res = await request(app)
      .delete("/events/1")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.status).toBe(200);

    // @ts-ignore
    const res2 = await request(app)
      .get("/events")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res2.status).toBe(200);
    expect(res.body).toEqual({})
  });
  it("Update entry that doesn't exist", async () => {
    const res = await request(app)
      .put("/events/5")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({
        amount_in_ml: 500,
        date: "2026-11-04 15:36:28",
        drink_type: "tequila",
      });

    expect(res.status).toBe(404)
    });
});
