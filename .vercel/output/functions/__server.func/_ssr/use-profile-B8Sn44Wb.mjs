import { n as supabase } from "./client-B5jeyOoH.mjs";
import { n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-profile-B8Sn44Wb.js
function useProfile() {
	return useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const { data: userRes } = await supabase.auth.getUser();
			const user = userRes.user;
			if (!user) return null;
			const { data, error } = await supabase.from("profiles").select("id, email, full_name, role, onboarding_complete, interests, job_title, department, streak_count, last_active_date, company_id, company_status").eq("id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		},
		staleTime: 3e4
	});
}
function dashboardPathForRole(role) {
	switch (role) {
		case "employer": return "/app/employer";
		case "provider": return "/app/provider";
		default: return "/app/employee";
	}
}
//#endregion
export { useProfile as n, dashboardPathForRole as t };
