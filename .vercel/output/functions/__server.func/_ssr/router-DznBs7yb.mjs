import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-B5jeyOoH.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { a as require_jsx_runtime, i as useQueryClient, o as require_react, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { M as redirect, b as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useLocale, t as LocaleProvider } from "./locale-context-CdT0mpu7.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DznBs7yb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B68TO3X8.css";
var ROUTES = {
	employee: "/app/employee",
	employer: "/app/employer",
	provider: "/app/provider"
};
var PASSWORD = "DemoPerx!2026";
var ACCOUNTS = {
	employer: [
		{
			email: "demo.employer@perx.al",
			label: "DigitalNova Shpk",
			sub: "Tech · 25 employees"
		},
		{
			email: "admin@adriatikbank.al",
			label: "Adriatik Bank",
			sub: "Finance · 40 employees"
		},
		{
			email: "admin@kafeflora.al",
			label: "Kafe Flora Group",
			sub: "Hospitality · 15 employees"
		}
	],
	employee: [
		{
			email: "arta.k@perx.al",
			label: "Arta Kola",
			sub: "DigitalNova · Product (wellness-skewed)"
		},
		{
			email: "besnik.h@perx.al",
			label: "Besnik Hoxha",
			sub: "DigitalNova · Engineering"
		},
		{
			email: "eliona.s@perx.al",
			label: "Eliona Shehu",
			sub: "DigitalNova · Operations"
		},
		{
			email: "endrit.k@digitalnova.al",
			label: "Endrit Kraja",
			sub: "DigitalNova · Engineering"
		},
		{
			email: "klejda.m@digitalnova.al",
			label: "Klejda Marku",
			sub: "DigitalNova · Marketing"
		},
		{
			email: "edon.b@adriatikbank.al",
			label: "Edon Bregu",
			sub: "Adriatik Bank · Branch Manager"
		},
		{
			email: "ilirjana.d@adriatikbank.al",
			label: "Ilirjana Daja",
			sub: "Adriatik Bank · Compliance"
		},
		{
			email: "genc.h@adriatikbank.al",
			label: "Genc Hysenaj",
			sub: "Adriatik Bank · Sales"
		},
		{
			email: "mirela.c@adriatikbank.al",
			label: "Mirela Çela",
			sub: "Adriatik Bank · Risk"
		},
		{
			email: "florian.b@adriatikbank.al",
			label: "Florian Bardhi",
			sub: "Adriatik Bank · IT"
		},
		{
			email: "anila.k@adriatikbank.al",
			label: "Anila Kuka",
			sub: "Adriatik Bank · People (wellness)"
		},
		{
			email: "driton.v@kafeflora.al",
			label: "Driton Vlashi",
			sub: "Kafe Flora · Operations"
		},
		{
			email: "suela.m@kafeflora.al",
			label: "Suela Mema",
			sub: "Kafe Flora · Operations"
		},
		{
			email: "klara.b@kafeflora.al",
			label: "Klara Berisha",
			sub: "Kafe Flora · Kitchen"
		},
		{
			email: "rinor.h@kafeflora.al",
			label: "Rinor Hyseni",
			sub: "Kafe Flora · Marketing"
		}
	],
	provider: [
		{
			email: "prov1@perx.al",
			label: "Fitness First Tirana",
			sub: "Fitness · Tirana"
		},
		{
			email: "prov2@perx.al",
			label: "Serotonin Gym",
			sub: "Fitness · Tirana"
		},
		{
			email: "prov3@perx.al",
			label: "Ritual Spa & Hammam",
			sub: "Wellness · Tirana"
		},
		{
			email: "prov4@perx.al",
			label: "LIFT Rooftop",
			sub: "Food · Tirana"
		},
		{
			email: "prov5@perx.al",
			label: "Oda Restaurant",
			sub: "Food · Tirana"
		},
		{
			email: "prov6@perx.al",
			label: "Artigiano",
			sub: "Food · Tirana"
		},
		{
			email: "prov7@perx.al",
			label: "Vodafone Albania",
			sub: "Telecom · 5 cities"
		},
		{
			email: "prov8@perx.al",
			label: "One Albania",
			sub: "Telecom · 4 cities"
		},
		{
			email: "prov9@perx.al",
			label: "Zenith Travel",
			sub: "Travel · Tirana"
		},
		{
			email: "prov10@perx.al",
			label: "Elite Travel",
			sub: "Travel · Tirana"
		},
		{
			email: "prov11@perx.al",
			label: "Spa Lavanda",
			sub: "Wellness · Tirana (2 branches)"
		},
		{
			email: "prov12@perx.al",
			label: "Albtravel Tours",
			sub: "Travel · Tirana"
		},
		{
			email: "prov13@perx.al",
			label: "Mediplus Klinikë",
			sub: "Health · Tirana"
		},
		{
			email: "prov14@perx.al",
			label: "Berlitz Tiranë",
			sub: "Learning · Tirana"
		},
		{
			email: "prov15@perx.al",
			label: "Mullixhiu Restorant",
			sub: "Food · Tirana (2 branches)"
		},
		{
			email: "prov16@perx.al",
			label: "Thalasso Durrës",
			sub: "Wellness · Durrës"
		},
		{
			email: "prov17@perx.al",
			label: "Conad Supermarket",
			sub: "Retail · 4 cities"
		},
		{
			email: "prov18@perx.al",
			label: "Gjelbërimi Yoga",
			sub: "Wellness · Tirana"
		}
	]
};
var BRAND_KEY = "perx.brand";
var LAST_ACCOUNT_KEY = "perx.demo.lastAccount";
var HIDDEN_KEY = "perx.demo.hidden";
function applyBrand(brand) {
	const root = document.documentElement;
	if (brand === "teamsystem") root.setAttribute("data-theme", "teamsystem");
	else root.removeAttribute("data-theme");
}
function DemoRoleSwitcher() {
	const { t } = useLocale();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [switching, setSwitching] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [brand, setBrand] = (0, import_react.useState)("perx");
	const [open, setOpen] = (0, import_react.useState)(null);
	const [lastEmail, setLastEmail] = (0, import_react.useState)({
		employee: void 0,
		employer: void 0,
		provider: void 0
	});
	const [hidden, setHidden] = (0, import_react.useState)(true);
	const rootRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const saved = typeof window !== "undefined" && localStorage.getItem(BRAND_KEY) || "perx";
		setBrand(saved);
		applyBrand(saved);
		try {
			const raw = localStorage.getItem(LAST_ACCOUNT_KEY);
			if (raw) setLastEmail(JSON.parse(raw));
		} catch {}
		try {
			setHidden(localStorage.getItem(HIDDEN_KEY) !== "0");
		} catch {}
	}, []);
	function setHiddenPersist(v) {
		setHidden(v);
		try {
			localStorage.setItem(HIDDEN_KEY, v ? "1" : "0");
		} catch {}
	}
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onDocClick(e) {
			if (!rootRef.current?.contains(e.target)) setOpen(null);
		}
		function onKey(e) {
			if (e.key === "Escape") setOpen(null);
		}
		document.addEventListener("mousedown", onDocClick);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDocClick);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);
	function switchBrand(next) {
		setBrand(next);
		applyBrand(next);
		try {
			localStorage.setItem(BRAND_KEY, next);
		} catch {}
	}
	const currentRole = pathname.startsWith("/app/employee") ? "employee" : pathname.startsWith("/app/employer") ? "employer" : pathname.startsWith("/app/provider") ? "provider" : null;
	async function loginAs(role, account) {
		setSwitching(true);
		setOpen(null);
		try {
			await queryClient.cancelQueries();
			queryClient.clear();
			const { data, error } = await supabase.auth.signInWithPassword({
				email: account.email,
				password: PASSWORD
			});
			if (error) throw error;
			if (data.session) await supabase.auth.setSession({
				access_token: data.session.access_token,
				refresh_token: data.session.refresh_token
			});
			const next = {
				...lastEmail,
				[role]: account.email
			};
			setLastEmail(next);
			try {
				localStorage.setItem(LAST_ACCOUNT_KEY, JSON.stringify(next));
			} catch {}
			await queryClient.invalidateQueries();
			navigate({
				to: ROUTES[role],
				replace: true
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Demo login failed");
		} finally {
			setSwitching(false);
		}
	}
	function quickSwitch(role) {
		const remembered = lastEmail[role];
		loginAs(role, remembered && ACCOUNTS[role].find((a) => a.email === remembered) || ACCOUNTS[role][0]);
	}
	if (hidden) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-2 right-2 z-[60] sm:bottom-3 sm:right-3 print:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setHiddenPersist(false),
			className: "btn-press group inline-flex items-center gap-1 rounded-full border border-[var(--hairline)] bg-paper/60 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/35 backdrop-blur transition-all hover:bg-paper/95 hover:text-ink/80 hover:px-2 focus-visible:opacity-100 focus-visible:text-ink",
			title: "Show demo controls",
			"aria-label": "Show demo controls",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-brand/70 group-hover:bg-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "opacity-70 group-hover:opacity-100",
				children: t.demo.label
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: rootRef,
		className: "fixed inset-x-0 bottom-4 z-[60] flex justify-center px-3 sm:bottom-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hairline relative flex max-w-[calc(100vw-1.5rem)] items-center gap-2 overflow-visible rounded-full bg-paper/95 px-2 py-1.5 soft-shadow backdrop-blur",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-1.5 hidden items-center gap-1.5 pr-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/60 sm:inline-flex",
					title: t.demo.hint,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-brand" }), t.demo.label]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "group",
					"aria-label": t.demo.hint,
					className: "flex items-center gap-0.5",
					children: Object.keys(ROUTES).map((r) => {
						const active = r === currentRole;
						const count = ACCOUNTS[r].length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex items-center rounded-full transition-colors ${active ? "bg-ink text-parchment" : "text-ink/70 hover:bg-parchment"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => quickSwitch(r),
									disabled: switching,
									className: "btn-press rounded-l-full px-3 py-1.5 text-xs font-medium",
									title: `Sign in as ${t.roles[r]}`,
									children: switching ? "…" : t.roles[r]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setOpen(open === r ? null : r),
									disabled: switching,
									"aria-label": `Pick which ${t.roles[r]} account`,
									className: "btn-press rounded-r-full px-1.5 py-1.5 text-[10px] opacity-70 hover:opacity-100",
									children: ["▾ ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: count
									})]
								})]
							}), open === r ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-full left-1/2 z-[70] mb-2 w-72 -translate-x-1/2 rounded-2xl border border-[var(--hairline)] bg-paper p-1.5 soft-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "px-2.5 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/55",
									children: [
										t.roles[r],
										" accounts (",
										count,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "max-h-72 overflow-auto",
									children: ACCOUNTS[r].map((acc) => {
										const last = lastEmail[r] === acc.email;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => loginAs(r, acc),
											className: "flex w-full items-start gap-2 rounded-xl px-2.5 py-2 text-left text-xs hover:bg-parchment",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "min-w-0 flex-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "block truncate text-sm font-medium text-ink",
														children: [
															acc.label,
															" ",
															last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] text-ink/45",
																children: "· last"
															}) : null
														]
													}),
													acc.sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block truncate text-[11px] text-ink/55",
														children: acc.sub
													}) : null,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block truncate font-mono-num text-[10px] text-ink/40",
														children: acc.email
													})
												]
											})]
										}, acc.email);
									})
								})]
							}) : null]
						}, r);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-1 hidden h-4 w-px bg-[var(--hairline-strong)] sm:inline-block",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "group",
					"aria-label": "Brand theme",
					className: "flex items-center gap-0.5",
					title: "Switch brand theme — show how PERX adapts to any company.",
					children: ["perx", "teamsystem"].map((b) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => switchBrand(b),
							className: `btn-press inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${b === brand ? "bg-brand text-brand-foreground" : "text-ink/70 hover:bg-parchment hover:text-ink"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "inline-block size-2 rounded-full",
								style: { background: b === "perx" ? "#0E7C66" : "#1A9EDA" }
							}), b === "perx" ? "PERX" : "TeamSystem"]
						}, b);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setHiddenPersist(true),
					className: "btn-press ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/45 hover:bg-parchment hover:text-ink",
					title: "Hide demo switcher",
					"aria-label": "Hide demo switcher",
					children: "×"
				})
			]
		})
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		position: "top-center",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "PERX — Përfitimet që punonjësit duan vërtet" },
			{
				name: "description",
				content: "Tregu i benefiteve për punonjësit, ndërtuar për Shqipërinë dhe gati për Europën."
			},
			{
				name: "author",
				content: "PERX"
			},
			{
				property: "og:title",
				content: "PERX — Përfitimet që punonjësit duan vërtet"
			},
			{
				property: "og:description",
				content: "Tregu i benefiteve për punonjësit, ndërtuar për Shqipërinë dhe gati për Europën."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "PERX — Përfitimet që punonjësit duan vërtet"
			},
			{
				name: "twitter:description",
				content: "Tregu i benefiteve për punonjësit, ndërtuar për Shqipërinë dhe gati për Europën."
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Inter:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		let mounted = true;
		import("./client-B5jeyOoH.mjs").then((n) => n.t).then((n) => n.t).then(({ supabase }) => {
			if (!mounted) return;
			const { data } = supabase.auth.onAuthStateChange((event) => {
				if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
				router.invalidate();
				if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
			});
			window.__perxAuthSub = data.subscription;
		});
		return () => {
			mounted = false;
			window.__perxAuthSub?.unsubscribe();
		};
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoRoleSwitcher, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		] })
	});
}
var $$splitComponentImporter$8 = () => import("./auth-CwqJGEHD.mjs");
var Route$8 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Hyrje · PERX" }, {
		name: "description",
		content: "Hyni ose krijoni një llogari në PERX."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
/** Decide where to send a freshly-authenticated user. */
var $$splitComponentImporter$7 = () => import("./route-Di7iQBCH.mjs");
var Route$7 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./routes-Ax8czbzY.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "PERX — Përfitimet që punonjësit duan vërtet" }, {
		name: "description",
		content: "Tregu i benefiteve për punonjësit, ndërtuar për Shqipërinë dhe gati për Europën."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./onboarding-tJkK9few.mjs");
var Route$5 = createFileRoute("/_authenticated/onboarding")({
	head: () => ({ meta: [{ title: "Mirësevini · PERX" }, {
		name: "description",
		content: "Disa hapa të shpejtë për të personalizuar përvojën tuaj në PERX."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./join-DoOWeHSN.mjs");
var searchSchema = objectType({ token: stringType().optional() });
var Route$4 = createFileRoute("/_authenticated/join")({
	validateSearch: (s) => searchSchema.parse(s),
	head: () => ({ meta: [{ title: "Ftesë · PERX" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./app-DmEYdvG6.mjs");
var Route$3 = createFileRoute("/_authenticated/app")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./app.provider-CGYd7yPd.mjs");
var Route$2 = createFileRoute("/_authenticated/app/provider")({
	head: () => ({ meta: [{ title: "Ofruesi · PERX" }, {
		name: "description",
		content: "Paneli i ofruesit në PERX."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./app.employer-CSRGQ8hO.mjs");
var Route$1 = createFileRoute("/_authenticated/app/employer")({
	head: () => ({ meta: [{ title: "Punëdhënësi · PERX" }, {
		name: "description",
		content: "Paneli i punëdhënësit në PERX."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./app.employee-BhlAIvmJ.mjs");
var Route = createFileRoute("/_authenticated/app/employee")({
	head: () => ({ meta: [{ title: "Punonjësi · PERX" }, {
		name: "description",
		content: "Paneli i punonjësit në PERX."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Deterministic drop end: 6..72h from current week's Monday; rolls forward. */
var AuthRoute = Route$8.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$9
});
var AuthenticatedRouteRoute = Route$7.update({
	id: "/_authenticated",
	getParentRoute: () => Route$9
});
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var AuthenticatedOnboardingRoute = Route$5.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedJoinRoute = Route$4.update({
	id: "/join",
	path: "/join",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAppRoute = Route$3.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAppProviderRoute = Route$2.update({
	id: "/provider",
	path: "/provider",
	getParentRoute: () => AuthenticatedAppRoute
});
var AuthenticatedAppEmployerRoute = Route$1.update({
	id: "/employer",
	path: "/employer",
	getParentRoute: () => AuthenticatedAppRoute
});
var AuthenticatedAppRouteChildren = {
	AuthenticatedAppEmployeeRoute: Route.update({
		id: "/employee",
		path: "/employee",
		getParentRoute: () => AuthenticatedAppRoute
	}),
	AuthenticatedAppEmployerRoute,
	AuthenticatedAppProviderRoute
};
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAppRoute: AuthenticatedAppRoute._addFileChildren(AuthenticatedAppRouteChildren),
	AuthenticatedJoinRoute,
	AuthenticatedOnboardingRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
