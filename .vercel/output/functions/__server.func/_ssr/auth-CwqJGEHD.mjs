import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-B5jeyOoH.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as dashboardPathForRole } from "./use-profile-B8Sn44Wb.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useLocale } from "./locale-context-CdT0mpu7.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as Building2, r as User, s as Store } from "../_libs/lucide-react.mjs";
import { n as Wordmark, t as LangToggle } from "./site-header-I1XHLG5R.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CwqJGEHD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ROLES = [
	{
		id: "employee",
		icon: User,
		titleSq: "Punonjës",
		titleEn: "Employee",
		bodySq: "Përdor benefitet që kompania ime ofron.",
		bodyEn: "Use the benefits my company offers.",
		nextSq: "Më pas: zgjidh interesat dhe fillo të përfitosh.",
		nextEn: "Next: pick your interests and start enjoying benefits."
	},
	{
		id: "employer",
		icon: Building2,
		titleSq: "Biznes — Punëdhënës",
		titleEn: "Business — Employer",
		bodySq: "Drejtoj benefitet për ekipin tim.",
		bodyEn: "I run benefits for my team.",
		nextSq: "Më pas: vendos kompaninë, buxhetin dhe planin.",
		nextEn: "Next: set up your company, budget and plan."
	},
	{
		id: "provider",
		icon: Store,
		titleSq: "Biznes — Ofrues Shërbimi",
		titleEn: "Business — Service Provider",
		bodySq: "Listoj shërbimet e biznesit tim në PERX.",
		bodyEn: "I list my business' services on PERX.",
		nextSq: "Më pas: shto biznesin dhe ofertat — falas.",
		nextEn: "Next: add your business and offers — free."
	}
];
function AuthPage() {
	const { locale, t } = useLocale();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [bootstrapped, setBootstrapped] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			const { data } = await supabase.auth.getUser();
			if (cancelled) return;
			if (data.user) await routeAfterAuth(navigate);
			else setBootstrapped(true);
		})();
		return () => {
			cancelled = true;
		};
	}, [navigate]);
	const sq = locale === "sq";
	const copy = {
		signinTitle: sq ? "Mirësevini sërish." : "Welcome back.",
		signupTitle: sq ? "Krijo llogarinë tuaj." : "Create your account.",
		signinBody: sq ? "Hyni për të vazhduar te benefitet tuaja." : "Sign in to continue to your benefits.",
		signupBody: sq ? "Disa hapa të shpejtë për të filluar." : "A few quick steps to get started.",
		email: sq ? "Email" : "Email",
		password: sq ? "Fjalëkalimi" : "Password",
		fullName: sq ? "Emri i plotë" : "Full name",
		chooseRole: sq ? "Çfarë rolesh ke?" : "What's your role?",
		chooseRoleHint: sq ? "Zgjidh një — mund ta ndryshosh më vonë." : "Pick one — you can change it later.",
		submitSignin: sq ? "Hyr" : "Log in",
		submitSignup: sq ? "Regjistrohu" : "Sign up",
		toggleToSignup: sq ? "Nuk ke llogari? Regjistrohu" : "No account yet? Sign up",
		toggleToSignin: sq ? "Ke tashmë llogari? Hyr" : "Already have an account? Log in",
		or: sq ? "ose" : "or",
		google: sq ? "Vazhdo me Google" : "Continue with Google",
		backHome: sq ? "← Kthehu" : "← Back",
		needRole: sq ? "Zgjidh një rol për të vazhduar." : "Pick a role to continue."
	};
	async function handleEmailSubmit(e) {
		e.preventDefault();
		const parsed = objectType({
			email: stringType().trim().email(),
			password: stringType().min(6).max(72),
			fullName: mode === "signup" ? stringType().trim().min(1).max(120) : stringType().optional()
		}).safeParse({
			email,
			password,
			fullName
		});
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
			return;
		}
		if (mode === "signup" && !role) {
			toast.error(copy.needRole);
			return;
		}
		setLoading(true);
		try {
			if (mode === "signup") {
				const { error } = await supabase.auth.signUp({
					email: parsed.data.email,
					password: parsed.data.password,
					options: {
						emailRedirectTo: `${window.location.origin}/onboarding`,
						data: {
							full_name: fullName,
							role
						}
					}
				});
				if (error) throw error;
				toast.success(sq ? "Llogaria u krijua." : "Account created.");
				if (role) {
					const { data: userRes } = await supabase.auth.getUser();
					if (userRes.user) await supabase.from("profiles").update({
						role,
						full_name: fullName
					}).eq("id", userRes.user.id);
				}
				navigate({
					to: "/onboarding",
					replace: true
				});
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email: parsed.data.email,
					password: parsed.data.password
				});
				if (error) throw error;
				await routeAfterAuth(navigate);
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	}
	async function handleGoogle() {
		setLoading(true);
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: { redirectTo: window.location.origin + "/auth" }
			});
			if (error) throw error;
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	}
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
						children: copy.backHome
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16",
			children: [!bootstrapped ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center text-sm text-ink/50",
				children: "…"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hairline overflow-hidden rounded-3xl bg-paper",
				children: [mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-[var(--hairline)] bg-parchment p-7 sm:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-medium uppercase tracking-[0.16em] text-copper-dark",
							children: copy.chooseRole
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-ink/65",
							children: copy.chooseRoleHint
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3",
							children: ROLES.map((r) => {
								const active = role === r.id;
								const Icon = r.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setRole(r.id),
									"aria-pressed": active,
									className: `group flex h-full flex-col rounded-2xl border p-4 text-left transition-all ${active ? "border-copper bg-copper-light/60 shadow-[0_10px_30px_-20px_rgba(255,122,51,0.6)]" : "border-[var(--hairline)] bg-paper hover:border-ink/20"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-flex h-9 w-9 items-center justify-center rounded-xl border ${active ? "border-copper-dark bg-copper text-white" : "border-[var(--hairline)] bg-parchment text-ink/70"}`,
											"aria-hidden": true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												size: 18,
												strokeWidth: 1.75
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 font-display text-base leading-tight",
											children: sq ? r.titleSq : r.titleEn
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 text-xs text-ink/65",
											children: sq ? r.bodySq : r.bodyEn
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `mt-3 text-[11px] leading-snug ${active ? "text-copper-dark" : "text-ink/45"}`,
											children: sq ? r.nextSq : r.nextEn
										})
									]
								}, r.id);
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: mode === "signup" ? "grid grid-cols-1" : "grid gap-0 md:grid-cols-[1.05fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-7 sm:p-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeTabs, {
								mode,
								setMode,
								sq
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-6 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl",
								children: mode === "signin" ? copy.signinTitle : copy.signupTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-md text-sm text-ink/65",
								children: mode === "signin" ? copy.signinBody : copy.signupBody
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-7 space-y-4",
								onSubmit: handleEmailSubmit,
								children: [
									mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: copy.fullName,
										type: "text",
										value: fullName,
										onChange: setFullName,
										autoComplete: "name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: copy.email,
										type: "email",
										value: email,
										onChange: setEmail,
										autoComplete: "email"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: copy.password,
										type: "password",
										value: password,
										onChange: setPassword,
										autoComplete: mode === "signup" ? "new-password" : "current-password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: loading,
										className: "btn-press mt-2 inline-flex w-full items-center justify-center rounded-full bg-copper px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(255,122,51,0.7)] hover:bg-copper-dark disabled:opacity-60",
										children: loading ? "…" : mode === "signin" ? copy.submitSignin : copy.submitSignup
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-[var(--hairline)]" }),
									copy.or,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-[var(--hairline)]" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: loading,
								onClick: handleGoogle,
								className: "btn-press inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--hairline)] bg-parchment px-5 py-3 text-sm font-medium text-ink hover:bg-paper disabled:opacity-60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleGlyph, {}), copy.google]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
								className: "btn-press mt-6 block w-full text-center text-sm text-ink/65 hover:text-copper-dark",
								children: mode === "signin" ? copy.toggleToSignup : copy.toggleToSignin
							})
						]
					}), mode === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-[var(--hairline)] bg-parchment p-7 sm:p-10 md:border-l md:border-t-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AsideHero, { sq })
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 text-center text-xs text-ink/40",
				children: t.footer.copyright
			})]
		})]
	});
}
function ModeTabs({ mode, setMode, sq }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "inline-flex items-center rounded-full border border-[var(--hairline)] bg-parchment p-0.5 text-xs font-medium",
		children: ["signin", "signup"].map((m) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setMode(m),
				className: `btn-press rounded-full px-4 py-1.5 ${m === mode ? "bg-ink text-parchment" : "text-ink/60 hover:text-ink"}`,
				children: m === "signin" ? sq ? "Hyr" : "Log in" : sq ? "Regjistrohu" : "Sign up"
			}, m);
		})
	});
}
function Field({ label, type, value, onChange, autoComplete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-xs font-medium uppercase tracking-[0.14em] text-ink/55",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			onChange: (e) => onChange(e.target.value),
			autoComplete,
			required: true,
			className: "mt-1.5 block w-full rounded-xl border border-[var(--hairline)] bg-parchment px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-copper focus:bg-paper"
		})]
	});
}
function AsideHero({ sq }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col justify-between gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-medium uppercase tracking-[0.16em] text-copper-dark",
				children: "PERX"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-3xl leading-tight tracking-tight",
				children: sq ? "Përfitime që njerëzit i duan vërtet." : "Benefits people actually love."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-ink/65",
				children: sq ? "Tregu i benefiteve për ekipet moderne — i ndërtuar në Shqipëri." : "The benefits marketplace for modern teams — built in Albania."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hairline rounded-2xl bg-paper p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] uppercase tracking-[0.14em] text-ink/50",
					children: sq ? "Kursimi mesatar" : "Average savings"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 font-mono-num text-3xl font-semibold",
					children: "23%"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-xs text-ink/55",
					children: sq ? "tatim për punonjësit dhe punëdhënësit." : "tax for employees and employers."
				})
			]
		})]
	});
}
function GoogleGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 48 48",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FFC107",
				d: "M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FF3D00",
				d: "M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4CAF50",
				d: "M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35 26.7 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.6 5.1C9.6 39.6 16.2 44 24 44z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#1976D2",
				d: "M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2C40.6 36 44 30.5 44 24c0-1.2-.1-2.3-.4-3.5z"
			})
		]
	});
}
/** Decide where to send a freshly-authenticated user. */
async function routeAfterAuth(navigate) {
	const { data: userRes } = await supabase.auth.getUser();
	const user = userRes.user;
	if (!user) return;
	const { data: profile } = await supabase.from("profiles").select("role, onboarding_complete").eq("id", user.id).maybeSingle();
	if (!profile || !profile.onboarding_complete) {
		navigate({
			to: "/onboarding",
			replace: true
		});
		return;
	}
	navigate({
		to: dashboardPathForRole(profile.role),
		replace: true
	});
}
//#endregion
export { AuthPage as component };
