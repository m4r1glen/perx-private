import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useProfile } from "./use-profile-B8Sn44Wb.mjs";
import { f as Outlet, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-DmEYdvG6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppGate() {
	const { data: profile, isLoading } = useProfile();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (isLoading || !profile) return;
		if (!profile.onboarding_complete) navigate({
			to: "/onboarding",
			replace: true
		});
	}, [
		profile,
		isLoading,
		navigate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
}
//#endregion
export { AppGate as component };
