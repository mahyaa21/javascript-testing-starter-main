import { describe, test, it, expect } from "vitest";
import { max } from "../intro";

describe("max", () => {
	//this is function which called by test runners
	it("should return the first argument if it is greater", () => {
		// AAA pattern => arrange(setup test env), act(perform the action), assert(check the out code);
		// Arrange
		const a = 2;
		const b = 1;
		//Act
		const result = max(a, b);
		//assert
		expect(result).toBe(2);
    // test in a single line => expect(max(2, 1)).toBe(2);`
	});

  it("should return the second argument if it is greater", () => {
    expect(max(1, 2)).toBe(2);
  });

  it("should return the first argument if arguments are equal", () => {
    expect(max(1, 1)).toBe(1);
  });
});
