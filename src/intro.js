// Lesson: Writing your first tests
export function max(a, b) {
	return a > b ? a : b;
}

// Exercise
export function fizzBuzz(n) {
	if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
	if (n % 3 === 0) return "Fizz";
	if (n % 5 === 0) return "Buzz";
	return n.toString();
}

export function calculateAverage(numbers) {
	if (numbers.length === 0) return NaN;
  const total = numbers.reduce((sum, current) => sum + current, 0);
  const average = total / numbers.length;

  return average;

}
