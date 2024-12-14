import { vi, it, expect, describe } from "vitest";
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
