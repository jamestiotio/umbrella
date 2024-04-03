import type { Fn, MaybeAsyncIterable, Nullable } from "@thi.ng/api";
import type { AsyncTransducer } from "./api.js";
import { cat } from "./cat.js";
import { comp } from "./comp.js";
import { iterator } from "./iterator.js";
import { map } from "./map.js";

export function mapcat<A, B>(
	fn: Fn<A, Nullable<MaybeAsyncIterable<B>>>
): AsyncTransducer<A, B>;
export function mapcat<A, B>(
	fn: Fn<A, Nullable<MaybeAsyncIterable<B>>>,
	src: MaybeAsyncIterable<A>
): AsyncIterableIterator<B>;
export function mapcat<A, B>(
	fn: Fn<A, Nullable<MaybeAsyncIterable<B>>>,
	src?: MaybeAsyncIterable<A>
): any {
	return src ? iterator(mapcat(fn), src) : comp(map(fn), cat());
}
