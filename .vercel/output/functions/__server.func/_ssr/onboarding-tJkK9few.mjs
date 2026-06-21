import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-B5jeyOoH.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useProfile, t as dashboardPathForRole } from "./use-profile-B8Sn44Wb.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useLocale } from "./locale-context-CdT0mpu7.mjs";
import { a as formatNumber, n as Lek, r as formatEur, t as CoinIcon } from "./coin-icon-CXePSZH_.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as ArrowLeft, g as CreditCard, x as Check } from "../_libs/lucide-react.mjs";
import { n as Wordmark, t as LangToggle } from "./site-header-I1XHLG5R.mjs";
import { i as stringType, n as coerce, r as objectType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-tJkK9few.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* PERX platform pricing — kept in one place so it can be tuned later.
* Values are in Lek (the smallest user-facing currency unit we use everywhere).
*/
var ANNUAL_LICENSE_PER_EMPLOYEE_L = 3600;
/** Default benefits budget per employee, per month (Lek). */
var DEFAULT_MONTHLY_BUDGET_PER_EMPLOYEE_L = 3e3;
function annualLicenseTotalL(employees) {
	return Math.max(0, Math.floor(employees || 0)) * ANNUAL_LICENSE_PER_EMPLOYEE_L;
}
function monthlyLicensePerEmployeeL() {
	return Math.round(ANNUAL_LICENSE_PER_EMPLOYEE_L / 12);
}
function lekToEur(l) {
	return Math.round(l / 100);
}
function OnboardingPage() {
	const { t, locale } = useLocale();
	const navigate = useNavigate();
	const { data: profile, isLoading, refetch } = useProfile();
	const sq = locale === "sq";
	const o = t.onboarding;
	const [resolvedRole, setResolvedRole] = (0, import_react.useState)(null);
	const [roleResolving, setRoleResolving] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (profile?.onboarding_complete) navigate({
			to: dashboardPathForRole(profile.role),
			replace: true
		});
	}, [profile, navigate]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			if (!profile) return;
			if (profile.role) {
				if (!cancelled) {
					setResolvedRole(profile.role);
					setRoleResolving(false);
				}
				return;
			}
			const { data } = await supabase.auth.getUser();
			const meta = data.user?.user_metadata ?? {};
			if (meta.role === "employee" || meta.role === "employer" || meta.role === "provider") {
				await supabase.from("profiles").update({ role: meta.role }).eq("id", profile.id);
				await refetch();
				if (!cancelled) {
					setResolvedRole(meta.role);
					setRoleResolving(false);
				}
				return;
			}
			if (!cancelled) {
				setResolvedRole(null);
				setRoleResolving(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [profile, refetch]);
	async function chooseRole(r) {
		if (!profile) return;
		setRoleResolving(true);
		await supabase.from("profiles").update({ role: r }).eq("id", profile.id);
		await refetch();
		setResolvedRole(r);
		setRoleResolving(false);
	}
	if (isLoading || !profile || roleResolving) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		sq,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hairline rounded-3xl bg-paper p-10 text-sm text-ink/50",
			children: sq ? "Po përgatisim…" : "Getting things ready…"
		})
	});
	if (!resolvedRole) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		sq,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RolePicker, {
			sq,
			onPick: chooseRole
		})
	});
	const role = resolvedRole;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		sq,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
			sq,
			role
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 hairline overflow-hidden rounded-3xl bg-paper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-[var(--hairline)] bg-parchment/60 px-7 py-5 sm:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-medium uppercase tracking-[0.16em] text-copper-dark",
						children: t.roles[role]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1.5 font-display text-2xl leading-tight tracking-tight sm:text-3xl",
						children: o[role].title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 max-w-xl text-sm text-ink/65",
						children: o[role].subtitle
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-7 sm:p-10",
				children: [
					role === "employee" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeForm, {
						profileId: profile.id,
						initialFullName: profile.full_name ?? "",
						onDone: async (r) => after(r, refetch, navigate)
					}),
					role === "employer" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployerForm, {
						profileId: profile.id,
						initialFullName: profile.full_name ?? "",
						onDone: async (r) => after(r, refetch, navigate)
					}),
					role === "provider" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderForm, {
						profileId: profile.id,
						initialFullName: profile.full_name ?? "",
						onDone: async (r) => after(r, refetch, navigate)
					})
				]
			})]
		})]
	});
}
function RolePicker({ sq, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hairline overflow-hidden rounded-3xl bg-paper p-7 sm:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-medium uppercase tracking-[0.16em] text-copper-dark",
				children: sq ? "Çfarë rolesh ke?" : "What's your role?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1.5 font-display text-2xl leading-tight tracking-tight sm:text-3xl",
				children: sq ? "Le ta personalizojmë përvojën." : "Let's tailor your experience."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3",
				children: [
					{
						id: "employee",
						titleSq: "Punonjës",
						titleEn: "Employee",
						bodySq: "Zgjidh interesat dhe fillo të përfitosh.",
						bodyEn: "Pick your interests and start enjoying benefits."
					},
					{
						id: "employer",
						titleSq: "Punëdhënës",
						titleEn: "Employer",
						bodySq: "Vendos kompaninë, buxhetin dhe planin.",
						bodyEn: "Set up your company, budget and plan."
					},
					{
						id: "provider",
						titleSq: "Ofrues shërbimi",
						titleEn: "Service provider",
						bodySq: "Shto biznesin dhe ofertat — falas.",
						bodyEn: "Add your business and offers — free."
					}
				].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(r.id),
					className: "btn-press flex h-full flex-col rounded-2xl border border-[var(--hairline)] bg-paper p-4 text-left hover:border-copper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-base",
						children: sq ? r.titleSq : r.titleEn
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-xs text-ink/65",
						children: sq ? r.bodySq : r.bodyEn
					})]
				}, r.id))
			})
		]
	});
}
async function after(role, refetch, navigate) {
	await refetch();
	navigate({
		to: dashboardPathForRole(role),
		replace: true
	});
}
function Shell({ children, sq }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-parchment text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-[var(--hairline)] bg-parchment/85 backdrop-blur",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "btn-press text-sm text-ink/70 hover:text-ink",
						children: sq ? "Dil" : "Exit"
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-14",
			children
		})]
	});
}
function Progress({ sq, role }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 text-xs text-ink/55",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex h-6 items-center rounded-full bg-copper-light/60 px-3 text-[11px] font-medium uppercase tracking-[0.16em] text-copper-dark",
				children: sq ? "Hapi 1 nga 1" : "Step 1 of 1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sq ? "Pothuajse gati — më pak se një minutë." : "Almost there — under a minute." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-auto hidden sm:inline",
				children: role
			})
		]
	});
}
function Label({ children, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs font-medium uppercase tracking-[0.14em] text-ink/55",
			children
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-xs text-ink/50",
			children: hint
		}) : null]
	});
}
function inputCls(hasError, mono = false) {
	return `block w-full rounded-xl border bg-parchment px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:bg-paper ${hasError ? "border-red-500/60 focus:border-red-500" : "border-[var(--hairline)] focus:border-copper"} ${mono ? "font-mono-num text-base tracking-tight" : ""}`;
}
function ErrorLine({ msg }) {
	if (!msg) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1.5 text-xs text-red-600",
		children: msg
	});
}
function Select({ value, onChange, options, hasError, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
		value,
		onChange: (e) => onChange(e.target.value),
		className: inputCls(hasError),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "",
			children: placeholder
		}), options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: o.value,
			children: o.label
		}, o.value))]
	});
}
function SubmitBar({ loading, label, savingLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-7 flex items-center justify-end",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "submit",
			disabled: loading,
			className: "btn-press inline-flex items-center justify-center rounded-full bg-copper px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(255,122,51,0.7)] hover:bg-copper-dark disabled:opacity-60",
			children: loading ? savingLabel : label
		})
	});
}
function EmployeeForm({ profileId, initialFullName, onDone }) {
	const { t } = useLocale();
	const c = t.onboarding;
	const o = c.employee;
	const [fullName, setFullName] = (0, import_react.useState)(initialFullName);
	const [jobTitle, setJobTitle] = (0, import_react.useState)("");
	const [department, setDepartment] = (0, import_react.useState)("");
	const [interests, setInterests] = (0, import_react.useState)([]);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const schema = (0, import_react.useMemo)(() => objectType({
		fullName: stringType().trim().min(1, c.common.fullNameError).max(120),
		jobTitle: stringType().trim().min(1, o.jobTitleError).max(120),
		department: stringType().min(1, o.departmentError),
		interests: arrayType(stringType()).min(1, o.interestsError)
	}), [c, o]);
	function toggle(v) {
		setInterests((cur) => cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]);
	}
	async function submit(e) {
		e.preventDefault();
		const parsed = schema.safeParse({
			fullName,
			jobTitle,
			department,
			interests
		});
		if (!parsed.success) {
			const map = {};
			parsed.error.issues.forEach((i) => {
				map[i.path[0]] = i.message;
			});
			setErrors(map);
			return;
		}
		setErrors({});
		setLoading(true);
		try {
			const { error } = await supabase.from("profiles").update({
				full_name: parsed.data.fullName,
				job_title: parsed.data.jobTitle,
				department: parsed.data.department,
				interests: parsed.data.interests,
				onboarding_complete: true
			}).eq("id", profileId);
			if (error) throw error;
			await onDone("employee");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : String(err));
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: c.common.fullName }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: fullName,
					onChange: (e) => setFullName(e.target.value),
					placeholder: c.common.fullNamePlaceholder,
					className: inputCls(!!errors.fullName),
					autoComplete: "name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorLine, { msg: errors.fullName })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: o.jobTitle }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: jobTitle,
					onChange: (e) => setJobTitle(e.target.value),
					placeholder: o.jobTitlePlaceholder,
					className: inputCls(!!errors.jobTitle)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorLine, { msg: errors.jobTitle })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: o.department }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: department,
					onChange: setDepartment,
					options: o.departmentOptions,
					hasError: !!errors.department,
					placeholder: "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorLine, { msg: errors.department })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					hint: o.interestsHint,
					children: o.interests
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: o.interestsOptions.map((it) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toggle(it.value),
							className: `btn-press rounded-full border px-3.5 py-1.5 text-sm transition-colors ${interests.includes(it.value) ? "border-copper bg-copper text-white shadow-[0_8px_24px_-14px_rgba(255,122,51,0.7)]" : "border-[var(--hairline)] bg-parchment text-ink/75 hover:border-ink/25"}`,
							children: it.label
						}, it.value);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorLine, { msg: errors.interests })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitBar, {
				loading,
				label: c.submit,
				savingLabel: c.saving
			})
		]
	});
}
var PERX_BRAND_DEFAULT = "#0E7C66";
function EmployerForm({ profileId, initialFullName, onDone }) {
	const { t, locale } = useLocale();
	const sq = locale === "sq";
	const o = t.onboarding.employer;
	const [step, setStep] = (0, import_react.useState)(1);
	const [fullName] = (0, import_react.useState)(initialFullName);
	const [name, setName] = (0, import_react.useState)("");
	const [industry, setIndustry] = (0, import_react.useState)("");
	const [brandPrimary, setBrandPrimary] = (0, import_react.useState)(PERX_BRAND_DEFAULT);
	const [brandSecondary, setBrandSecondary] = (0, import_react.useState)("");
	const [emailDomains, setEmailDomains] = (0, import_react.useState)("");
	const [employees, setEmployees] = (0, import_react.useState)("");
	const [budget, setBudget] = (0, import_react.useState)(String(DEFAULT_MONTHLY_BUDGET_PER_EMPLOYEE_L));
	const [cardNumber, setCardNumber] = (0, import_react.useState)("");
	const [cardExp, setCardExp] = (0, import_react.useState)("");
	const [cardCvc, setCardCvc] = (0, import_react.useState)("");
	const [paying, setPaying] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {}, [brandPrimary]);
	(0, import_react.useEffect)(() => () => {}, []);
	const step1Schema = (0, import_react.useMemo)(() => objectType({
		name: stringType().trim().min(1, o.companyNameError).max(160),
		industry: stringType().min(1, o.industryError)
	}), [o]);
	const step2Schema = (0, import_react.useMemo)(() => objectType({
		employees: coerce.number().int().min(1, o.employeeCountError).max(1e6),
		budget: coerce.number().int().min(0, o.budgetError).max(1e7)
	}), [o]);
	const employeesNum = Math.max(0, Math.floor(Number(employees) || 0));
	const budgetNum = Math.max(0, Math.floor(Number(budget) || 0));
	const annualLicense = annualLicenseTotalL(employeesNum);
	const annualWelfare = budgetNum * employeesNum * 12;
	function goNextFromStep1() {
		const parsed = step1Schema.safeParse({
			name,
			industry
		});
		if (!parsed.success) {
			const m = {};
			parsed.error.issues.forEach((i) => {
				m[i.path[0]] = i.message;
			});
			setErrors(m);
			return;
		}
		setErrors({});
		setStep(2);
	}
	function goNextFromStep2() {
		const parsed = step2Schema.safeParse({
			employees,
			budget
		});
		if (!parsed.success) {
			const m = {};
			parsed.error.issues.forEach((i) => {
				m[i.path[0]] = i.message;
			});
			setErrors(m);
			return;
		}
		setErrors({});
		setStep(3);
	}
	function parseDomains(raw) {
		return raw.split(/[,\s]+/).map((d) => d.trim()).filter(Boolean);
	}
	async function persist(planActive) {
		setSaving(true);
		try {
			const { error: pErr } = await supabase.from("profiles").update({
				full_name: fullName,
				onboarding_complete: true
			}).eq("id", profileId);
			if (pErr) throw pErr;
			const now = /* @__PURE__ */ new Date();
			const renews = new Date(now);
			renews.setFullYear(renews.getFullYear() + 1);
			const upsertPayload = {
				owner_id: profileId,
				name,
				industry,
				employee_count: employeesNum,
				monthly_budget_per_employee_lek: budgetNum,
				brand_primary: brandPrimary || null,
				brand_secondary: brandSecondary || null,
				employee_email_domains: parseDomains(emailDomains),
				plan_status: planActive ? "active" : "trial",
				plan_amount_l: planActive ? annualLicense : null,
				plan_employees_count: planActive ? employeesNum : null,
				plan_paid_at: planActive ? now.toISOString() : null,
				plan_renews_at: planActive ? renews.toISOString() : null
			};
			const { error: cErr } = await supabase.from("companies").upsert(upsertPayload, { onConflict: "owner_id" });
			if (cErr) throw cErr;
		} catch (err) {
			toast.error(err instanceof Error ? err.message : String(err));
			setSaving(false);
			throw err;
		}
	}
	async function pay() {
		setPaying(true);
		try {
			await new Promise((r) => setTimeout(r, 900));
			await persist(true);
			setStep(4);
		} catch {} finally {
			setPaying(false);
		}
	}
	async function skip() {
		try {
			await persist(false);
			await onDone("employer");
		} catch {}
	}
	function fillTestCard() {
		setCardNumber("4242 4242 4242 4242");
		setCardExp("12 / 29");
		setCardCvc("123");
	}
	const StepDots = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/55",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: o.stepLabel(step === 4 ? 3 : step, 3) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-1 flex items-center gap-1.5",
			children: [
				1,
				2,
				3
			].map((n) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 rounded-full transition-all ${step >= n ? "w-7 bg-brand" : "w-3 bg-ink/15"}` }, n);
			})
		})]
	});
	if (step === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepDots, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-medium tracking-tight",
			children: o.step1Title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				goNextFromStep1();
			},
			className: "mt-5 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-xl border border-[var(--hairline)] bg-parchment px-4 py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-medium uppercase tracking-[0.14em] text-ink/55",
						children: o.adminLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-ink/80",
						children: fullName || "—"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: o.companyName }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: o.companyNamePlaceholder,
						className: inputCls(!!errors.name),
						autoComplete: "organization"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorLine, { msg: errors.name })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: o.industry }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: industry,
						onChange: setIndustry,
						options: o.industryOptions,
						hasError: !!errors.industry,
						placeholder: "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorLine, { msg: errors.industry })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						hint: o.brandPrimaryHint,
						children: o.brandPrimary
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
						value: brandPrimary,
						onChange: setBrandPrimary
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						hint: o.brandSecondaryHint,
						children: o.brandSecondary
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
						value: brandSecondary,
						onChange: setBrandSecondary,
						allowEmpty: true
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					hint: o.emailDomainsHint,
					children: o.emailDomains
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: emailDomains,
					onChange: (e) => setEmailDomains(e.target.value),
					placeholder: o.emailDomainsPlaceholder,
					className: inputCls(false)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 flex items-center justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn-press inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--brand)_60%,transparent)] hover:bg-brand-dark",
						children: o.next
					})
				})
			]
		})
	] });
	if (step === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepDots, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-medium tracking-tight",
			children: o.step2Title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				goNextFromStep2();
			},
			className: "mt-5 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: o.employeeCount }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							inputMode: "numeric",
							min: 1,
							value: employees,
							onChange: (e) => setEmployees(e.target.value),
							placeholder: o.employeeCountPlaceholder,
							className: inputCls(!!errors.employees, true)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorLine, { msg: errors.employees })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							hint: o.budgetHint,
							children: o.budget
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								inputMode: "numeric",
								min: 0,
								value: budget,
								onChange: (e) => setBudget(e.target.value),
								placeholder: "0",
								className: `${inputCls(!!errors.budget, true)} pr-16`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-medium uppercase tracking-[0.14em] text-ink/45",
								children: o.budgetSuffix
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorLine, { msg: errors.budget })
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hairline rounded-2xl bg-brand-soft p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] font-medium uppercase tracking-[0.16em] text-ink/55",
							children: o.pricingKicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex items-baseline gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono-num text-4xl font-semibold tracking-tight text-ink",
								children: o.pricingHeroPerMonth
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs text-ink/55",
							children: o.pricingHeroSub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-baseline justify-between gap-3 border-t border-[var(--hairline)] pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-[0.14em] text-ink/55",
								children: o.pricingAnnualLabel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono-num text-base font-medium text-ink/80",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: annualLicense })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-2 text-xs text-ink/55",
									children: [
										"≈ ",
										formatEur(lekToEur(annualLicense)),
										" ",
										o.pricingPerYear
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 inline-flex items-center gap-1 text-[11px] text-ink/45",
							children: employeesNum > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								employeesNum,
								" × ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: monthlyLicensePerEmployeeL() }),
								"/",
								sq ? "muaj" : "mo"
							] }) : o.pricingPerEmployee
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-xs text-ink/60",
							children: o.pricingReassurance
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hairline rounded-2xl bg-paper p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] font-medium uppercase tracking-[0.16em] text-ink/55",
							children: o.welfarePoolTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 inline-flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center font-mono-num text-3xl font-semibold tracking-tight",
								children: [formatNumber(annualWelfare), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, { className: "ml-[0.25em]" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-ink/60",
								children: ["/", sq ? "vit" : "yr"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs text-ink/55",
							children: o.welfarePoolHint
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setStep(1),
						className: "btn-press inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-ink/65 hover:text-ink",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 14 }),
							" ",
							o.back
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn-press inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--brand)_60%,transparent)] hover:bg-brand-dark",
						children: o.next
					})]
				})
			]
		})
	] });
	if (step === 3) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepDots, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-medium tracking-tight",
			children: o.payTitle
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-ink/60",
			children: o.paySubtitle
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 hairline rounded-2xl bg-brand-soft p-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] font-medium uppercase tracking-[0.16em] text-ink/55",
					children: o.pricingTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 inline-flex items-center gap-1 text-xs text-ink/60",
					children: [
						employeesNum,
						" × ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: ANNUAL_LICENSE_PER_EMPLOYEE_L })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono-num text-3xl font-semibold tracking-tight",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: annualLicense })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-ink/55",
						children: [
							"≈ ",
							formatEur(lekToEur(annualLicense)),
							" ",
							o.pricingPerYear
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 hairline rounded-2xl bg-paper p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 text-sm font-medium text-ink/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { size: 16 }),
							" ",
							o.payCardLabel
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: fillTestCard,
						className: "btn-press text-xs font-medium text-brand hover:underline",
						children: o.payUseTestCard
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					inputMode: "numeric",
					value: cardNumber,
					onChange: (e) => setCardNumber(e.target.value),
					placeholder: o.payCardPlaceholder,
					className: `${inputCls(false, true)} mt-2`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: o.payExpLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: cardExp,
						onChange: (e) => setCardExp(e.target.value),
						placeholder: "MM / YY",
						className: inputCls(false, true)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: o.payCvcLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: cardCvc,
						onChange: (e) => setCardCvc(e.target.value),
						placeholder: "123",
						className: inputCls(false, true)
					})] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: skip,
				disabled: paying || saving,
				className: "btn-press inline-flex items-center justify-center rounded-full border border-[var(--hairline)] bg-parchment px-5 py-3 text-sm font-medium text-ink/75 hover:bg-paper disabled:opacity-60",
				children: o.paySkip
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: pay,
				disabled: paying || saving,
				className: "btn-press inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--brand)_60%,transparent)] hover:bg-brand-dark disabled:opacity-60",
				children: paying ? o.payProcessing : o.payButton(annualLicense)
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setStep(2),
				className: "btn-press text-xs text-ink/55 hover:text-ink",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						size: 12,
						className: "-mt-0.5 mr-1 inline"
					}),
					" ",
					o.back
				]
			})
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-[0_18px_40px_-16px_color-mix(in_oklab,var(--brand)_60%,transparent)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					size: 28,
					strokeWidth: 2.5
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 font-display text-2xl font-medium tracking-tight",
				children: o.paySuccess
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm text-ink/65",
				children: o.paySuccessBody
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 inline-flex items-center gap-1 font-mono-num text-sm text-ink/55",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: annualLicense }),
					" · ≈ ",
					formatEur(lekToEur(annualLicense))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onDone("employer"),
				className: "btn-press mt-6 inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground hover:bg-brand-dark",
				children: o.payGoDashboard
			})
		]
	});
}
function ColorField({ value, onChange, allowEmpty = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative inline-flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-[var(--hairline)]",
				style: { background: value || "#FFFFFF" },
				"aria-label": "Color picker",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "color",
					value: value || PERX_BRAND_DEFAULT,
					onChange: (e) => onChange(e.target.value),
					className: "absolute inset-0 h-full w-full cursor-pointer opacity-0"
				}), !value && allowEmpty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-ink/45",
					children: "—"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				value: value || (allowEmpty ? "" : PERX_BRAND_DEFAULT),
				onChange: (e) => onChange(e.target.value),
				placeholder: "#0E7C66",
				className: `${inputCls(false, true)} flex-1 uppercase`
			}),
			allowEmpty && value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onChange(""),
				className: "btn-press text-xs text-ink/50 hover:text-ink",
				children: "×"
			}) : null
		]
	});
}
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function ProviderForm({ profileId, initialFullName, onDone }) {
	const { t } = useLocale();
	const c = t.onboarding;
	const o = c.provider;
	const [fullName] = (0, import_react.useState)(initialFullName);
	const [businessName, setBusinessName] = (0, import_react.useState)("");
	const [contactEmail, setContactEmail] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [tagline, setTagline] = (0, import_react.useState)("");
	const [logoFile, setLogoFile] = (0, import_react.useState)(null);
	const [logoPreview, setLogoPreview] = (0, import_react.useState)(null);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const schema = (0, import_react.useMemo)(() => objectType({
		businessName: stringType().trim().min(1, o.businessNameError).max(160),
		contactEmail: stringType().trim().email(o.contactEmailError).max(160),
		category: stringType().min(1, o.categoryError),
		city: stringType().trim().min(1, o.cityError).max(80)
	}), [o]);
	function pickLogo(file) {
		if (!file) {
			setLogoFile(null);
			setLogoPreview(null);
			return;
		}
		if (file.size > 2 * 1024 * 1024) {
			toast.error(o.uploadFailed);
			return;
		}
		setLogoFile(file);
		const reader = new FileReader();
		reader.onload = () => setLogoPreview(typeof reader.result === "string" ? reader.result : null);
		reader.readAsDataURL(file);
	}
	async function uploadLogoIfAny() {
		if (!logoFile) return null;
		const ext = (logoFile.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
		const path = `${profileId}/${Date.now()}.${ext}`;
		const { error: upErr } = await supabase.storage.from("provider-logos").upload(path, logoFile, {
			upsert: true,
			contentType: logoFile.type || void 0
		});
		if (upErr) throw upErr;
		const { data, error: sErr } = await supabase.storage.from("provider-logos").createSignedUrl(path, 3600 * 24 * 365 * 10);
		if (sErr || !data?.signedUrl) throw sErr ?? /* @__PURE__ */ new Error("Signed URL failed");
		return data.signedUrl;
	}
	async function submit(e) {
		e.preventDefault();
		const parsed = schema.safeParse({
			businessName,
			contactEmail,
			category,
			city
		});
		if (!parsed.success) {
			const map = {};
			parsed.error.issues.forEach((i) => {
				map[i.path[0]] = i.message;
			});
			setErrors(map);
			return;
		}
		setErrors({});
		setLoading(true);
		try {
			let logoUrl = null;
			try {
				logoUrl = await uploadLogoIfAny();
			} catch (err) {
				toast.error(o.uploadFailed);
				console.error(err);
			}
			const { error: pErr } = await supabase.from("profiles").update({ onboarding_complete: true }).eq("id", profileId);
			if (pErr) throw pErr;
			const providerRow = {
				owner_id: profileId,
				business_name: parsed.data.businessName,
				category: parsed.data.category,
				city: parsed.data.city,
				description: tagline.trim() || null
			};
			if (logoUrl) providerRow.logo_url = logoUrl;
			const { data: providerData, error: prErr } = await supabase.from("providers").upsert(providerRow, { onConflict: "owner_id" }).select("id").single();
			if (prErr) throw prErr;
			if (parsed.data.contactEmail && providerData?.id) await supabase.from("provider_contacts").upsert({
				provider_id: providerData.id,
				contact_email: parsed.data.contactEmail,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}, { onConflict: "provider_id" });
			await onDone("provider");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : String(err));
		} finally {
			setLoading(false);
		}
	}
	const monogram = initials(businessName || fullName || "?");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hairline rounded-2xl bg-parchment/70 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-700",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }),
						" ",
						o.freeBadge
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ink/65",
					children: o.freeRationale
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-xl border border-[var(--hairline)] bg-parchment px-4 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-medium uppercase tracking-[0.14em] text-ink/55",
					children: c.common.fullName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-ink/80",
					children: fullName || "—"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: o.businessName }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: businessName,
					onChange: (e) => setBusinessName(e.target.value),
					placeholder: o.businessNamePlaceholder,
					className: inputCls(!!errors.businessName),
					autoComplete: "organization"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorLine, { msg: errors.businessName })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: o.contactEmail }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					value: contactEmail,
					onChange: (e) => setContactEmail(e.target.value),
					placeholder: o.contactEmailPlaceholder,
					className: inputCls(!!errors.contactEmail),
					autoComplete: "email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorLine, { msg: errors.contactEmail })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				hint: o.logoHint,
				children: o.logo
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-[var(--hairline)] bg-parchment text-base font-semibold text-ink/70",
					"aria-hidden": true,
					children: logoPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logoPreview,
						alt: "",
						className: "size-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono-num",
						children: monogram
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "btn-press inline-flex cursor-pointer items-center justify-center rounded-full border border-[var(--hairline)] bg-paper px-4 py-2 text-sm font-medium text-ink hover:border-ink/25",
						children: [logoPreview ? o.replaceLogo : o.uploadLogo, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/png,image/jpeg,image/webp,image/svg+xml",
							onChange: (e) => pickLogo(e.target.files?.[0] ?? null),
							className: "sr-only"
						})]
					}), logoPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => pickLogo(null),
						className: "btn-press text-xs text-ink/55 hover:text-ink",
						children: o.removeLogo
					}) : null]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: o.category }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: category,
						onChange: setCategory,
						options: o.categoryOptions,
						hasError: !!errors.category,
						placeholder: "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorLine, { msg: errors.category })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: o.city }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: city,
						onChange: (e) => setCity(e.target.value),
						placeholder: o.cityPlaceholder,
						className: inputCls(!!errors.city),
						autoComplete: "address-level2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorLine, { msg: errors.city })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: o.tagline }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				value: tagline,
				onChange: (e) => setTagline(e.target.value),
				placeholder: o.taglinePlaceholder,
				className: inputCls(false),
				maxLength: 140
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitBar, {
				loading,
				label: c.submit,
				savingLabel: c.saving
			})
		]
	});
}
//#endregion
export { OnboardingPage as component };
