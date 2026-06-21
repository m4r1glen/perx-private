import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useLocale } from "./locale-context-CdT0mpu7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-header-I1XHLG5R.js
var import_jsx_runtime = require_jsx_runtime();
function Wordmark({ size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: `font-display font-semibold tracking-tight ${size === "lg" ? "text-3xl" : "text-xl"} inline-flex items-baseline`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PERX" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-copper",
			"aria-hidden": true
		})]
	});
}
function LangToggle() {
	const { locale, setLocale, t } = useLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"aria-label": t.nav.langLabel,
		className: "inline-flex items-center rounded-full border border-[var(--hairline)] bg-paper p-0.5 text-xs font-medium",
		children: ["sq", "en"].map((l) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setLocale(l),
				className: `btn-press rounded-full px-3 py-1.5 uppercase tracking-wide ${l === locale ? "bg-ink text-parchment" : "text-ink/60 hover:text-ink"}`,
				children: l
			}, l);
		})
	});
}
//#endregion
export { Wordmark as n, LangToggle as t };
