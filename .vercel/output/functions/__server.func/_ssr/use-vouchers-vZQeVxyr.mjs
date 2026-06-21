import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-B5jeyOoH.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-vouchers-vZQeVxyr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SIZE_CLASS = {
	xs: "size-6 rounded-md text-[10px]",
	sm: "size-7 rounded-lg text-[11px]",
	md: "size-8 rounded-lg text-xs"
};
var IMG_PAD = {
	xs: "p-[2px]",
	sm: "p-[3px]",
	md: "p-[3px]"
};
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "·";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[1][0]).toUpperCase();
}
/**
* Small, consistent provider identity mark.
* - Rounded-square container with hairline border + neutral background.
* - Shows logo (object-contain, padded, lazy-loaded) when available.
* - Falls back to a tinted monogram on image error or missing logo.
*/
function ProviderMark({ name, logoUrl, brandColor, size = "sm", className = "" }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	const showImg = !!logoUrl && !failed;
	const color = brandColor || "#FF7A33";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		title: name,
		className: `inline-grid shrink-0 place-items-center overflow-hidden border border-[var(--hairline)] bg-white ${SIZE_CLASS[size]} ${className}`,
		style: showImg ? void 0 : {
			background: `color-mix(in oklab, ${color} 14%, var(--paper))`,
			color: `color-mix(in oklab, ${color} 75%, #1a140e)`
		},
		children: showImg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: logoUrl,
			alt: "",
			loading: "lazy",
			decoding: "async",
			onError: () => setFailed(true),
			className: `h-full w-full object-contain ${IMG_PAD[size]}`
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-semibold leading-none tracking-tight",
			children: initials(name)
		})
	});
}
function useVouchersForSelection(selectionId) {
	return useQuery({
		queryKey: [
			"vouchers",
			"selection",
			selectionId
		],
		enabled: !!selectionId,
		queryFn: async () => {
			const { data, error } = await supabase.from("vouchers").select("id, selection_id, offer_id, employee_id, provider_id, code, status, value_l, expires_at, redeemed_at, redeemed_by_provider_id, created_at").eq("selection_id", selectionId).order("created_at", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useRedeemedVouchersForProvider(providerId) {
	return useQuery({
		queryKey: [
			"vouchers",
			"provider-redeemed",
			providerId
		],
		enabled: !!providerId,
		queryFn: async () => {
			const { data, error } = await supabase.from("vouchers").select("id, selection_id, offer_id, employee_id, provider_id, code, status, value_l, expires_at, redeemed_at, redeemed_by_provider_id, created_at").eq("provider_id", providerId).eq("status", "redeemed").order("redeemed_at", { ascending: false }).limit(20);
			if (error) throw error;
			return data ?? [];
		}
	});
}
async function fetchSignedToken(voucherId) {
	const { data, error } = await supabase.functions.invoke("voucher-sign", { body: { voucher_id: voucherId } });
	if (error) throw error;
	return data;
}
async function verifyVoucher(input) {
	const { data, error } = await supabase.functions.invoke("voucher-verify", { body: input });
	if (error) {
		const ctx = error.context;
		if (ctx && typeof ctx.json === "function") try {
			return await ctx.json();
		} catch {}
		return {
			ok: false,
			reason: "server_error"
		};
	}
	return data;
}
//#endregion
export { verifyVoucher as a, useVouchersForSelection as i, fetchSignedToken as n, useRedeemedVouchersForProvider as r, ProviderMark as t };
