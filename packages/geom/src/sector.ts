import type { Attribs } from "@thi.ng/geom-api";
import { copy } from "@thi.ng/vectors/copy";
import type { Arc } from "./api/arc.js";
import { Line } from "./api/line.js";
import { Path } from "./api/path.js";
import { __copyAttribsRaw } from "./internal/copy.js";

/**
 * Converts given arc into a closed path describing a sector (using the arc's
 * center point). If `attribs` are given they will be used instead of the arc's
 * attribs.
 *
 * @param arc
 * @param attribs
 */
export const sector = (arc: Arc, attribs?: Attribs) => {
	const path = new Path();
	path.addSegments(
		{ type: "m", point: copy(arc.pos) },
		{ type: "l", geo: new Line([copy(arc.pos), arc.pointAt(0)]) },
		{ type: "a", geo: arc },
		{ type: "l", geo: new Line([arc.pointAt(1), copy(arc.pos)]) },
		{ type: "z" }
	);
	path.attribs = attribs || __copyAttribsRaw(arc.attribs);
	return path;
};
