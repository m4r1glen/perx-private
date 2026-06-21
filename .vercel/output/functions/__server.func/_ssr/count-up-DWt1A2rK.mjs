import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-B5jeyOoH.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as formatNumber } from "./coin-icon-CXePSZH_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/count-up-DWt1A2rK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useCompanyInvitations(companyId) {
	return useQuery({
		queryKey: ["companyInvitations", companyId],
		enabled: !!companyId,
		queryFn: async () => {
			const { data, error } = await supabase.from("company_invitations").select("id, company_id, email, invited_by, status, token, created_at, expires_at").eq("company_id", companyId).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useCompanyJoinRequests(companyId) {
	return useQuery({
		queryKey: ["companyJoinRequests", companyId],
		enabled: !!companyId,
		queryFn: async () => {
			const { data, error } = await supabase.rpc("list_company_applicants");
			if (error) throw error;
			return (data ?? []).map((r) => ({
				request: {
					id: r.request_id,
					company_id: r.company_id,
					employee_id: r.employee_id,
					status: r.status,
					message: r.message,
					created_at: r.request_created_at,
					decided_at: r.decided_at
				},
				applicant: {
					id: r.employee_id,
					full_name: r.full_name,
					job_title: r.job_title,
					department: r.department
				}
			}));
		}
	});
}
function useMyJoinRequest(userId) {
	return useQuery({
		queryKey: ["myJoinRequest", userId],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("company_join_requests").select("id, company_id, status, created_at").eq("employee_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
}
function useEmployeePointsBalances(employeeIds) {
	return useQuery({
		queryKey: ["pointsBalances", employeeIds?.join(",")],
		enabled: !!employeeIds && employeeIds.length > 0,
		queryFn: async () => {
			const { data, error } = await supabase.from("points_ledger").select("employee_id, delta").in("employee_id", employeeIds);
			if (error) throw error;
			const m = /* @__PURE__ */ new Map();
			(data ?? []).forEach((row) => {
				m.set(row.employee_id, (m.get(row.employee_id) ?? 0) + (row.delta ?? 0));
			});
			return m;
		}
	});
}
function useCompaniesList() {
	return useQuery({
		queryKey: ["companiesList"],
		queryFn: async () => {
			const { data, error } = await supabase.from("public_companies").select("id, name, industry, brand_primary").order("name");
			if (error) throw error;
			return data ?? [];
		}
	});
}
var prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
function CountUp({ value, duration = 500, className, format = formatNumber, pulseOnChange = false }) {
	const [display, setDisplay] = (0, import_react.useState)(value);
	const fromRef = (0, import_react.useRef)(value);
	const rafRef = (0, import_react.useRef)(null);
	const pulseRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (display === value) return;
		if (prefersReducedMotion()) {
			setDisplay(value);
			return;
		}
		const from = fromRef.current;
		const to = value;
		const start = performance.now();
		const tick = (now) => {
			const t = Math.min(1, (now - start) / duration);
			const eased = 1 - Math.pow(1 - t, 3);
			setDisplay(Math.round(from + (to - from) * eased));
			if (t < 1) rafRef.current = requestAnimationFrame(tick);
			else fromRef.current = to;
		};
		rafRef.current = requestAnimationFrame(tick);
		if (pulseOnChange && pulseRef.current) {
			pulseRef.current.classList.remove("points-pulse");
			pulseRef.current.offsetWidth;
			pulseRef.current.classList.add("points-pulse");
		}
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			fromRef.current = value;
		};
	}, [value, duration]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref: pulseRef,
		className,
		style: { display: "inline-block" },
		children: format(display)
	});
}
//#endregion
export { useEmployeePointsBalances as a, useCompanyJoinRequests as i, useCompaniesList as n, useMyJoinRequest as o, useCompanyInvitations as r, CountUp as t };
