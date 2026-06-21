import { n as supabase } from "./client-B5jeyOoH.mjs";
import { a as require_jsx_runtime, i as useQueryClient } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useLocale } from "./locale-context-CdT0mpu7.mjs";
import { n as Wordmark, t as LangToggle } from "./site-header-I1XHLG5R.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-BUJ_cfjY.js
var import_jsx_runtime = require_jsx_runtime();
function AppShell({ kicker, title, subtitle, headerMark, children }) {
	const { t } = useLocale();
	const navigate = useNavigate();
	const qc = useQueryClient();
	async function handleSignOut() {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen overflow-x-clip bg-parchment text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-40 border-b border-[var(--hairline)] bg-parchment/85 backdrop-blur",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 sm:gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleSignOut,
						className: "btn-press rounded-full border border-[var(--hairline)] bg-paper px-4 py-2 text-sm font-medium text-ink/80 hover:text-ink",
						children: t.dashboard.signOut
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto min-w-0 max-w-7xl px-5 py-10 sm:px-8 sm:py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-medium uppercase tracking-[0.16em] text-copper-dark",
					children: kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center gap-3",
					children: [headerMark, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-medium tracking-tight sm:text-5xl",
						children: title
					})]
				}),
				subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-base text-ink/70",
					children: subtitle
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid min-w-0 grid-cols-1 gap-8 [&>*]:min-w-0",
					children
				})
			]
		})]
	});
}
function Card({ title, hint, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `hairline rounded-2xl bg-paper p-6 sm:p-8 ${className}`,
		children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-medium tracking-tight",
				children: title
			}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-ink/55",
				children: hint
			}) : null]
		}) : null, children]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hairline rounded-2xl bg-paper p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-[0.14em] text-ink/55",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 font-mono-num text-3xl text-ink",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs text-ink/55",
				children: hint
			}) : null
		]
	});
}
//#endregion
export { Card as n, Stat as r, AppShell as t };
