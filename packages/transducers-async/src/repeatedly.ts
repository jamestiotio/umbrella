import type { Fn } from "@thi.ng/api";
import { delayed } from "@thi.ng/compose/delayed";

/**
 * Async iterator. Yields return values of given single-arg async function `fn`
 * (called with `i`, current iteration count). If `n` is given, only that many
 * values will be produced, else the iterator is infinite.
 *
 * @remarks
 * If `delay>0` waits given number of milliseconds between each successive call
 * to `fn`.
 *
 * @param fn
 * @param n
 * @param delay
 */
export async function* repeatedly<T>(
	fn: Fn<number, Promise<T>>,
	n = Infinity,
	delay = 0
) {
	for (let i = 0; i < n; i++) {
		yield await fn(i);
		if (delay > 0) {
			await delayed(null, delay);
		}
	}
}
