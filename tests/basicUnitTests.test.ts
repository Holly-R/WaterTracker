import { assert, describe, expect, it, vi, afterEach } from "vitest";

function add(a: number, b: number) {
  return a + b;
}

function createUser() {
  return { id: 1, name: "holly", age: 32 };
}

function division(a: number, b: number) {
  if (b === 0) {
    return 0;
  }
  return a / b;
}

// @ts-ignore
function findEvent(id:number, onSuccess) {
    if (id > 0) {
        return onSuccess("Success")
    } 
}

const logger = {
    log: function(s:string) {
        console.log(s)
    }
}

describe("maths test", function () {
  it("adds two numbers", async () => {
    const three = add(1, 2);
    expect(three).toEqual(3);
  });
  it("adds two negative numbers", () => {
    const minusThree = add(-1, -2);
    expect(minusThree).toEqual(-3);
  });
  it("add two decimal point numbers", () => {
    const decimalPoint = add(0.1, 0.2);
    expect(decimalPoint).toBeCloseTo(0.3);
  });
  it("divide two numbers", () => {
    const six = division(12, 2);
    expect(six).toEqual(6);
  });
  it("divide by 0", () => {
    const zero = division(12, 0);
    expect(zero).toEqual(0);
  });
});

describe("create user", function () {
  it("create user", () => {
    const user = createUser();
    expect(user.age).toEqual(32);
    expect(user.name).toEqual("holly");
    expect(user.id).toEqual(1);
  });
});

describe("find event", function () {
    it("find event", () => {
        const mockOnSuccess = vi.fn()
        const result = findEvent(1, mockOnSuccess)
        expect(mockOnSuccess).toHaveBeenCalled()
    })
    it("find event", () => {
        const mockOnSuccess = vi.fn().mockReturnValue(21)
        const result = findEvent(1, mockOnSuccess)
        expect(mockOnSuccess).toHaveBeenCalled()
        expect(result).toEqual(21)
    })
})

describe("logger", function () {
    it("should log a message", () => {
        const spy = vi.spyOn(logger, "log")
        logger.log("test")
        expect(spy).toHaveBeenLastCalledWith("test")
    })
    it("override log", () => {
        const spy = vi.spyOn(logger, "log").mockImplementation( () => {return 1 + 2})
        const three = logger.log("test")
        expect(three).toEqual(3)
    })
})