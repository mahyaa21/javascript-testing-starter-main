import { vi, it, expect, describe } from "vitest";
import { getPriceInCurrency, getShippingInfo, renderPage } from "../mocking";
import { getExchangeRate } from "../libs/currency";
import { getShippingQuote } from "../libs/shipping";
import { trackPageView } from "../libs/analytics";
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
