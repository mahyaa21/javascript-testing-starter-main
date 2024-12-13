import { it, expect, describe } from "vitest";

describe("Test Suit", () => {
	it("is string good assertion test case", () => {
		const result = "The requested file is not found";
		// Loose (too general)
		expect(result).toBeDefined();
		// Tight (too specific)
		expect(result).toBe("The requested file is not found");
		// Good Assertion
		expect(result).toMatch(/not found/);
	});

	it("is array good assertion test case", () => {
		const result = [1, 2, 3];
		// Loose (too general)
		expect(result).toBeDefined();
		// Tight (too specific)
		expect(result).toEqual([1, 2, 3]);
		// Good Assertion
		expect(result).toEqual(expect.arrayContaining([1, 2, 3]));
	});

	it("is object good assertion test case", () => {
		const result = { name: "mahya", id: 1 };
    expect(result).toMatchObject({ name: "mahya" });
		expect(result).toHaveProperty("name");
    expect(typeof result.name).toBe("string");
	});
});
