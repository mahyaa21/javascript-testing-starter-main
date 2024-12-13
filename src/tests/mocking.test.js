import { vi, it, expect, describe } from "vitest";
import {
	getPriceInCurrency,
	getShippingInfo,
	renderPage,
	signUp,
} from "../mocking";
import { getExchangeRate } from "../libs/currency";
import { getShippingQuote } from "../libs/shipping";
import { trackPageView } from "../libs/analytics";
import { submitOrder } from "../mocking";
import { charge } from "../libs/payment";
import { sendEmail } from "../libs/email";
// Mock Function
describe("test suite", () => {
	it("test case", () => {
		// it generates a mock function in jest we say jest.fn()
		// by default it is empty and return undefined
		const greet = vi.fn();
		greet.mockReturnValue("hello");
		const result = greet();
		console.log(result);

		greet.mockResolvedValue("hi");
		greet().then((result) => console.log(result));

		greet.mockImplementation((name) => "hello " + name);
		console.log(greet("mahya"));

		expect(greet).toHaveBeenCalled();
		expect(greet).toHaveBeenCalledWith("mahya");
		// expect(greet).toHaveBeenCalledOnce()
	});
});

describe("senText", () => {
	it("test case", () => {
		const sendText = vi.fn();
		sendText.mockReturnValue("ok");
		const result = sendText("message");
		expect(sendText).toHaveBeenCalled();
		expect(result).toBe("ok");
	});
});

// Mock the module and its function
vi.mock("../libs/currency", () => ({
	getExchangeRate: vi.fn(),
}));

describe("getPriceInCurrency", () => {
	it("should return price in target range", () => {
		// Mock the return value of getExchangeRate
		getExchangeRate.mockReturnValue(1.5); // Mocking exchange rate as 1.5

		const price = getPriceInCurrency(10, "AUD");

		// Test the expected outcome
		expect(price).toBe(15);
	});
});

vi.mock("../libs/shipping", () => ({
	getShippingQuote: vi.fn(),
}));

describe("getShippingInfo", () => {
	it("should return shipping unavailable", () => {
		getShippingQuote.mockReturnValue(null);
		const shippingInfo = getShippingInfo();
		expect(shippingInfo).toMatch(/unavailable/i);
	});
	it("should return shipping info", () => {
		getShippingQuote.mockReturnValue({ cost: 10, estimatedDays: 2 });
		const shippingInfo = getShippingInfo("New York");
		expect(shippingInfo).toBe("Shipping Cost: $10 (2 Days)");
	});
});

vi.mock("../libs/analytics", () => ({
	trackPageView: vi.fn(),
}));

describe("renderPage", () => {
	it("should render page", async () => {
		const result = await renderPage();
		expect(result).toMatch(/content/i);
	});

	it("should call analytics", async () => {
		await renderPage();
		expect(trackPageView).toHaveBeenCalledWith("/home");
	});
});

vi.mock("../libs/payment.js", () => ({
	charge: vi.fn(),
}));

describe("submitOrder", () => {
	const order = {
		totalAmount: 10,
	};
	const creditCard = { creditCardNumber: "1234" };
	it("should charge the customer", async () => {
		charge.mockResolvedValue({ status: "success" });
		await submitOrder(order, creditCard);
		expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
	});
	it("should return success when payment is successful", async () => {
		charge.mockResolvedValue({ status: "success" });
		const result = await submitOrder(order, creditCard);
		expect(result).toEqual({ success: true });
	});
	it("should return false when payment is failed ", async () => {
		charge.mockResolvedValue({ status: "failed" });
		const result = await submitOrder(order, creditCard);
		expect(result).toEqual({ success: false, error: "payment_error" });
	});
});
// Partial mocking
vi.mock("../libs/email.js", async (importOriginal) => {
	const originalModule = await importOriginal();
	return {
		...originalModule, // keep all other functions original and just mock sendEmail
		sendEmail: vi.fn(),
	};
});
describe("signup", () => {
	const email = "name@domain.com";
	it("should return false if the email is invalid", async () => {
		const result = await signUp("a");
		expect(result).toBe(false);
	});
	it("should return true if the email is valid", async () => {
		const result = await signUp(email);
		expect(result).toBe(true);
	});
	it("should send the welcome email if the email is valid", async () => {
		const result = await signUp(email);
		expect(sendEmail).toHaveBeenCalled();
		const args = sendEmail.mock.calls[0]
		expect(args[0]).toBe(email);
		expect(args[1]).toMatch(/welcome/i)
	});
});
