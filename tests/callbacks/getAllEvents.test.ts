import { describe, expect, it } from "vitest";
import { findEvent } from "../../src/helpers/findEvent"
import { DatabaseSync } from 'node:sqlite';
import { Request, Response } from 'express';
import { vi } from 'vitest'
import { getAllEvents } from "../../src/callbacks/getAllEvents"

describe("get all events test", () => {
  it("get all in db", () => {
    // @ts-ignore
    const response = { send: vi.fn(function(){
    })};
    const event = [{drinkType: "tea", amountInMl: 500}, {drinkType: "vodka", amountInMl: 500}]
    const allFunction = vi.fn(function() {
        return event
    })
    const prepareFunction = vi.fn(function () {
        return {all: allFunction}
    })
    // @ts-ignore
    const database = { prepare: prepareFunction } as DatabaseSync;

    // @ts-ignore
    getAllEvents(database, response)
    expect(prepareFunction).toHaveBeenCalledWith('SELECT * FROM Events')
    expect(allFunction).toHaveBeenCalled()
    expect(response.send).toHaveBeenCalledWith(event)
  });
});
