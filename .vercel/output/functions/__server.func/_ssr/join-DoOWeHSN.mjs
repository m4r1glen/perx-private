import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-B5jeyOoH.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useProfile } from "./use-profile-B8Sn44Wb.mjs";
import { g as Link, v as useNavigate, y as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useLocale } from "./locale-context-CdT0mpu7.mjs";
import { t as joinDict } from "./team-i18n-DxlmE2PQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as LoaderCircle, x as Check } from "../_libs/lucide-react.mjs";
import { n as Wordmark, t as LangToggle } from "./site-header-I1XHLG5R.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/join-DoOWeHSN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function JoinPage() {
	const { token } = useSearch({ from: "/_authenticated/join" });
	const { locale } = useLocale();
	const T = joinDict[locale];
	const navigate = useNavigate();
	const { data: profile, refetch } = useProfile();
	const [state, setState] = (0, import_react.useState)("idle");
	const [invitation, setInvitation] = (0, import_react.useState)(null);
	const [companyName, setCompanyName] = (0, import_react.useState)("");
	const [errMsg, setErrMsg] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!token) return;
		(async () => {
			const { data, error } = await supabase.from("company_invitations").select("email, company_id, status, expires_at").eq("token", token).maybeSingle();
			if (error || !data || data.status !== "pending" || new Date(data.expires_at).getTime() < Date.now()) {
				setErrMsg(T.inviteInvalid);
				return;
			}
			setInvitation({
				email: data.email,
				company_id: data.company_id
			});
			const { data: c } = await supabase.from("public_companies").select("name").eq("id", data.company_id).maybeSingle();
			setCompanyName(c?.name ?? "");
		})();
	}, [token, T.inviteInvalid]);
	async function accept() {
		if (!token) return;
		if (!profile) {
			toast.error(T.inviteNeedAuth);
			return;
		}
		if (invitation && profile.email.toLowerCase() !== invitation.email.toLowerCase()) {
			setErrMsg(T.inviteWrongEmail);
			return;
		}
		setState("working");
		const { error } = await supabase.rpc("accept_invitation", { _token: token });
		if (error) {
			setState("err");
			setErrMsg(error.message);
			return;
		}
		setState("ok");
		toast.success(T.inviteAccepted);
		await refetch();
		setTimeout(() => navigate({ to: "/app/employee" }), 900);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-parchment text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-[var(--hairline)] bg-parchment/85 backdrop-blur",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-xl px-5 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hairline rounded-3xl bg-paper p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-medium uppercase tracking-[0.16em] text-copper-dark",
						children: T.bannerKicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl font-medium tracking-tight",
						children: T.inviteTitle
					}),
					invitation ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-ink/65",
						children: T.inviteSubtitle.replace("{company}", companyName || "—")
					}) : null,
					errMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700",
						children: errMsg
					}) : null,
					state === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: accept,
						disabled: !invitation || state === "working" || !!errMsg,
						className: "btn-press mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-white hover:bg-copper-dark disabled:opacity-60",
						children: state === "working" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								size: 14,
								className: "animate-spin"
							}),
							" ",
							T.inviteAccepting
						] }) : T.inviteAccept
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 text-xs text-ink/55",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app/employee",
							className: "hover:text-copper-dark",
							children: "→ /app"
						})
					})
				]
			})
		})]
	});
}
//#endregion
export { JoinPage as component };
