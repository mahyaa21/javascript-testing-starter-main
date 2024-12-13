import { it, expect, describe } from "vitest";
import { calculateDiscount, getCoupons } from "../core.js";

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

describe("getCoupons", () => {
	it("should return ad=n array of coupons", () => {
		const coupons = getCoupons();
		expect(Array.isArray(coupons)).toBe(true); // in typescript we doesn't need to write test for types because the typescript take care of it.
		expect(coupons.length).toBeGreaterThan(0);
	});

	it("should return an array with valid coupon codes", () => {
		const coupons = getCoupons();
		coupons.forEach((coupon) => {
			expect(coupon).toHaveProperty("code");
			expect(typeof coupon.code).toBe("string");
			expect(typeof coupon.code).toBeTruthy();
		});
	});

	it("should return an array with valid discounts codes", () => {
		const coupons = getCoupons();
		coupons.forEach((coupon) => {
			expect(coupon).toHaveProperty("discount");
			expect(typeof coupon.discount).toBe("number");
			expect(coupon.discount).toBeGreaterThan(0);
			expect(coupon.discount).toBeLessThan(1);
		});
	});
});

describe("calculateDiscount", () => {
	it("should return discount amount if they are a valid code", () => {
		expect(calculateDiscount(10, "SAVE10")).toBe(9);
		expect(calculateDiscount(10, "SAVE20")).toBe(8);
	});
	it("should handle non-numeric prices", () => {
		expect(calculateDiscount("10", "SAVE10")).toMatch(/Invalid/);
	});
	it("should handle negative prices", () => {
		expect(calculateDiscount(-10, "SAVE10")).toMatch(/Invalid/);
	});
	it("should handle non-string discount codes", () => {
		expect(calculateDiscount(10, 10)).toMatch(/Invalid/);
	});
	it("should handle invalid discount codes", () => {
		expect(calculateDiscount(10, "invalid")).toBe(10);
	});
});
