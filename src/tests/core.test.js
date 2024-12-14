import { it, expect, describe } from "vitest";
import {
	calculateDiscount,
	getCoupons,
	validateUserInput,
	isPriceInRange,
	isValidUsername,
	canDrive,
	fetchData,
	fetchRejectedData
} from "../core.js";

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

describe("validateUserInput", () => {
	it("should return errors if username is non-string", () => {
		expect(validateUserInput(1, 20)).toMatch(/invalid/i);
	});
	it("should return errors if username length is less than 3", () => {
		expect(validateUserInput("ab", 20)).toMatch(/invalid/i);
	});
	it("should return errors if username length is greater than 255", () => {
		expect(validateUserInput("A".repeat(256), 20)).toMatch(/invalid/i);
	});
	it("should return errors if age is non-number", () => {
		expect(validateUserInput("mahya", "20")).toMatch(/invalid/i);
	});
	it("should return errors if age is less than 18", () => {
		expect(validateUserInput("mahya", 15)).toMatch(/invalid/i);
	});
	it("should return errors if both username and age are invalid", () => {
		expect(validateUserInput("", 0)).toMatch(/invalid username/i);
		expect(validateUserInput("", 0)).toMatch(/invalid age/i);
	});
	it("should return success message if username and age are valid", () => {
		expect(validateUserInput("mahya", 20)).toMatch(/success/i);
	});
});

describe("isPriceInRange", () => {
	it("should return false if the price is outside the range", () => {
		expect(isPriceInRange(10, 20, 30)).toBe(false);
		expect(isPriceInRange(200, 20, 30)).toBe(false);
	});
	// Boundary test
	it("should return true if the price is equal to min or the max", () => {
		expect(isPriceInRange(20, 20, 30)).toBe(true);
		expect(isPriceInRange(30, 20, 30)).toBe(true);
	});
	it("should return true when the price is in the range", () => {
		expect(isPriceInRange(22, 20, 30)).toBe(true);
	});
});

describe("isValidUsername", () => {
	const minLength = 5;
	const maxLength = 15;
	it("should return false if the username is outside the range", () => {
		expect(isValidUsername("m".repeat(minLength - 1))).toBe(false);
		expect(isValidUsername("m".repeat(maxLength + 1))).toBe(false);
	});
	it("should return true if the username is equal to min or the max", () => {
		expect(isValidUsername("m".repeat(maxLength))).toBe(true);
		expect(isValidUsername("m".repeat(minLength))).toBe(true);
	});
	it("should return true if the username is in the range", () => {
		expect(isValidUsername("m".repeat(maxLength - 1))).toBe(true);
		expect(isValidUsername("m".repeat(minLength + 1))).toBe(true);
	});
	it("should return false for invalid inout types", () => {
		expect(isValidUsername(1)).toBe(false);
		expect(isValidUsername(null)).toBe(false);
		expect(isValidUsername(undefined)).toBe(false);
	});
});

describe("canDrive", () => {
	it("should return false if the country code is invalid", () => {
		expect(canDrive(18, "FR")).toMatch(/invalid/i);
	});
	it("should return false if the age is less than 16", () => {
		expect(canDrive(10, "US")).toBe(false);
		expect(canDrive(10, "UK")).toBe(false);
	});
	it("should return false if the age is less than 16 and the country code is UK", () => {
		expect(canDrive(16, "UK")).toBe(false);
	});
	it("should return true if the age is greater than or equal to 16 and the country code is US", () => {
		expect(canDrive(16, "US")).toBe(true);
	});
	it("should return true if the age is greater than or equal to 17 and the country code is valid", () => {
		expect(canDrive(20, "US")).toBe(true);
		expect(canDrive(20, "UK")).toBe(true);
	});
});

// Parameterize Tests
describe("canDrive", () => {
	it.each([
		{
			age: 15,
			country: "US",
			result: false,
		},
		{
			age: 16,
			country: "US",
			result: true,
		},
		{
			age: 17,
			country: "US",
			result: true,
		},
		{
			age: 16,
			country: "UK",
			result: false,
		},
		{
			age: 17,
			country: "UK",
			result: true,
		},
		{
			age: 18,
			country: "UK",
			result: true,
		},
	])(
		"should return $result for ($age, $country)",
		({ age, country, result }) => {
			expect(canDrive(age, country)).toBe(result);
		}
	);
});

describe("isPriceInRange", () => {
	const min = 20;
	const max = 30;
	it.each([
		{ scenario: "price < min", price: 10, result: false },
		{ scenario: "price > max", price: 200, result: false },
		{ scenario: "price = min", price: 20, result: true },
		{ scenario: "price = min", price: 30, result: true },
		{ scenario: "min > price < max", price: 22, result: true },
	])("should return $result when $scenario", ({ scenario, price, result }) => {
		expect(isPriceInRange(price, min, max)).toBe(result);
	});
});

// Test asynchronous
describe("fetchData", () => {
	it("should return a promise that will resolve to an array of numbers", async () => {
		try {
			const result = await fetchData();
			expect(Array.isArray(result)).toBe(true);
			expect(result.length).toBeGreaterThan(0);
		} catch (error) {
			expect(error).toHaveProperty("reason");
			expect(error.reason).toMatch(/fail/i);
		}
		fetchData().then((result) => {
			expect(Array.isArray(result)).toBe(true);
			expect(result.length).toBeGreaterThan(0);
		});
	});
});

describe("fetchRejectedData", () => {
	it("should return a promise that will reject the promise and show result", async () => {
		try {
			const result = await fetchRejectedData();
		} catch (error) {
			expect(error).toHaveProperty("reason");
			expect(error.reason).toMatch(/fail/i);
		}
	});
});
