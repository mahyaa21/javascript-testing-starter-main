import { describe, test, it, expect } from "vitest";
import { calculateAverage, fizzBuzz, max } from "../intro";

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

describe("FizzBuzz", () => {
	it('should return "Fizz" if number is divisible by 3', () => {
    expect(fizzBuzz(24)).toBe("Fizz");
  });

	it("should return 'Buzz' if number is divisible by 5", () => {
    expect(fizzBuzz(35)).toBe("Buzz");
  });

  it("should return 'FizzBuzz' if number is divisible by 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("should return the number if it is not divisible by 3 or 5", () => {
    expect(fizzBuzz(7)).toBe("7");
    // .toBeDefined always show true even if production code and test code are different
  });
});

describe("calculateAverage", () => {
  it("should return NAN if array is empty", () => {
    expect(calculateAverage([])).toBe(NaN);
  })
  it("should calculate the average of an array with a single number", () => {
    expect(calculateAverage([1])).toBe(1);
  })

  it("should calculate the average of an array with a two number", () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  })

  it("should calculate the average of an array with a three number", () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  })

})
