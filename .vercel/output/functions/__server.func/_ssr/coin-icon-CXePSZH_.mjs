import { n as supabase } from "./client-B5jeyOoH.mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coin-icon-CXePSZH_.js
var import_jsx_runtime = require_jsx_runtime();
function useOffers() {
	return useQuery({
		queryKey: ["offers"],
		queryFn: async () => {
			const { data, error } = await supabase.from("offers").select("id, provider_id, title_sq, title_en, description_sq, description_en, price_l, category, mood").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useProviders() {
	return useQuery({
		queryKey: ["providers"],
		queryFn: async () => {
			const { data, error } = await supabase.from("providers").select("id, owner_id, business_name, category, city, description, brand_color, logo_url");
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useMySelections(userId) {
	return useQuery({
		queryKey: [
			"selections",
			"mine",
			userId
		],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("selections").select("id, employee_id, offer_ids, total_l, status, created_at").eq("employee_id", userId).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useMyPoints(userId) {
	return useQuery({
		queryKey: ["points", userId],
		enabled: !!userId,
		queryFn: async () => {
			const [ledgerRes, holdsRes] = await Promise.all([supabase.from("points_ledger").select("id, delta, reason, created_at").eq("employee_id", userId).order("created_at", { ascending: false }), supabase.from("selection_holds").select("amount_l").eq("employee_id", userId).eq("status", "active")]);
			if (ledgerRes.error) throw ledgerRes.error;
			if (holdsRes.error) throw holdsRes.error;
			const entries = ledgerRes.data ?? [];
			const balance = entries.reduce((s, e) => s + e.delta, 0);
			const held = (holdsRes.data ?? []).reduce((s, h) => s + (h.amount_l ?? 0), 0);
			return {
				balance,
				available: balance - held,
				held,
				entries
			};
		}
	});
}
function useMyCompany(ownerId) {
	return useQuery({
		queryKey: [
			"company",
			"mine",
			ownerId
		],
		enabled: !!ownerId,
		queryFn: async () => {
			const { data, error } = await supabase.from("companies").select("id, name, industry, employee_count, monthly_budget_per_employee_lek, brand_primary, brand_secondary, employee_email_domains, plan_status").eq("owner_id", ownerId).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
}
function useCompanyEmployees(companyId) {
	return useQuery({
		queryKey: ["companyEmployees", companyId],
		enabled: !!companyId,
		queryFn: async () => {
			const { data, error } = await supabase.rpc("list_company_employees");
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useCompanySelections(employeeIds) {
	return useQuery({
		queryKey: [
			"selections",
			"company",
			employeeIds?.join(",")
		],
		enabled: !!employeeIds && employeeIds.length > 0,
		queryFn: async () => {
			const { data, error } = await supabase.from("selections").select("id, employee_id, offer_ids, total_l, status, created_at").in("employee_id", employeeIds).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useMyProvider(ownerId) {
	return useQuery({
		queryKey: [
			"provider",
			"mine",
			ownerId
		],
		enabled: !!ownerId,
		queryFn: async () => {
			const { data, error } = await supabase.from("providers").select("id, owner_id, business_name, category, city, description, brand_color, logo_url").eq("owner_id", ownerId).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
}
/**
* Single source of truth for number formatting across the app.
* Albanian convention: space as thousands separator, " L" suffix for Lek.
* Applied to EVERY amount (including 4-digit ones) so 6300 → "6 300 L"
* and 1200 → "1 200 L", matching the financial-precision feel.
*/
function formatNumber(n) {
	const rounded = Math.round(n);
	return (rounded < 0 ? "-" : "") + Math.abs(rounded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
/**
* Returns the formatted number only (no currency suffix).
* Render the Lek currency mark via the <CoinIcon /> / <Lek /> components
* from "@/components/coin-icon" so the symbol is a glyph, not a string.
*/
function formatLek(n) {
	return formatNumber(n);
}
function formatEur(n) {
	const rounded = Math.round(n);
	const sign = rounded < 0 ? "-" : "";
	const abs = Math.abs(rounded).toString();
	return sign + "€" + abs.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var perx_coin_default = "/assets/perx-coin-32-A5g_-.png";
/**
* Branded PERX coin glyph rendered wherever the Lek currency mark used to
* be shown as the text " L". Sized in `em` so it tracks the surrounding
* font-size (badges, prices, totals, voucher receipts, hero numbers).
*/
function CoinIcon({ className = "", title = "PERX", size = "1.25em" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: perx_coin_default,
		alt: title,
		"aria-label": title,
		draggable: false,
		width: 32,
		height: 32,
		style: {
			width: size,
			height: size,
			minWidth: size,
			minHeight: size
		},
		className: `inline-block shrink-0 select-none rounded-full object-contain align-[-0.25em] ${className}`
	});
}
/**
* Renders a Lek amount as `<number><CoinIcon/>`. Use in JSX wherever a
* monetary value is shown. Keeps formatLek() as the single number-formatting
* source of truth.
*/
function Lek({ value, className = "", iconClassName = "ml-[0.25em]", prefix }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center whitespace-nowrap font-mono-num tabular-nums ${className}`,
		children: [
			prefix,
			formatLek(value),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, { className: iconClassName })
		]
	});
}
//#endregion
export { formatNumber as a, useMyCompany as c, useMySelections as d, useOffers as f, formatLek as i, useMyPoints as l, Lek as n, useCompanyEmployees as o, useProviders as p, formatEur as r, useCompanySelections as s, CoinIcon as t, useMyProvider as u };
