import { describe, expect, it } from "vitest";
import { findEvent } from "../../src/helpers/findEvent"
import { DatabaseSync } from 'node:sqlite';
import { Request, Response } from 'express';
import { vi } from 'vitest'

describe("find event test", () => {
  it("find event in db", () => {
    // @ts-ignore
    const request = { params: { id: "1" } };
    const event = {drinkType: "tea", amountInMl: 500}
    const getFunction = vi.fn(function() {
        return event
    })
    const prepareFunction = vi.fn(function () {
        return {get: getFunction}
    })
    // @ts-ignore
    const database = { prepare: prepareFunction } as DatabaseSync;

    // @ts-ignore
    const actualEvent = findEvent(database, request)
    expect(actualEvent).toEqual(event)
    expect(prepareFunction).toHaveBeenCalledWith('SELECT * FROM Events WHERE id = ?')
    expect(getFunction).toHaveBeenCalledWith(request.params.id)
  });
});
