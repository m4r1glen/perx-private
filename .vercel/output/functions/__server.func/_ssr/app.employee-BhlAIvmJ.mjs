import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-B5jeyOoH.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as useProfile } from "./use-profile-B8Sn44Wb.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useLocale } from "./locale-context-CdT0mpu7.mjs";
import { a as formatNumber, c as useMyCompany, d as useMySelections, f as useOffers, i as formatLek, l as useMyPoints, n as Lek, p as useProviders, t as CoinIcon } from "./coin-icon-CXePSZH_.mjs";
import { t as joinDict } from "./team-i18n-DxlmE2PQ.mjs";
import { n as useCompaniesList, o as useMyJoinRequest, t as CountUp } from "./count-up-DWt1A2rK.mjs";
import { i as useVouchersForSelection, n as fetchSignedToken, t as ProviderMark } from "./use-vouchers-vZQeVxyr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as Building2, a as Trophy, b as ChevronLeft, c as Sparkles, h as Flame, l as Share2, m as Gift, p as Hourglass, t as X, u as Search, y as ChevronRight } from "../_libs/lucide-react.mjs";
import { t as confetti_module_default } from "../_libs/canvas-confetti.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.employee-BhlAIvmJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
function todayISO() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function daysBetween(aISO, bISO) {
	const a = (/* @__PURE__ */ new Date(aISO + "T00:00:00")).getTime();
	const b = (/* @__PURE__ */ new Date(bISO + "T00:00:00")).getTime();
	return Math.round((b - a) / 864e5);
}
/**
* Bumps the user's streak when the feed opens.
* - same day: no change
* - 1 day later: +1
* - older or null: reset to 1
* Calls onIncrease(newCount, prevCount) only when streak grew.
*/
function useStreakOnOpen(profile, onIncrease) {
	const qc = useQueryClient();
	const ran = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!profile || ran.current) return;
		ran.current = true;
		const today = todayISO();
		const prev = profile.streak_count ?? 0;
		const last = profile.last_active_date;
		let next = prev;
		if (!last) next = 1;
		else {
			const diff = daysBetween(last, today);
			if (diff === 0) return;
			if (diff === 1) next = prev + 1;
			else next = 1;
		}
		(async () => {
			const { error } = await supabase.from("profiles").update({
				streak_count: next,
				last_active_date: today
			}).eq("id", profile.id);
			if (error) return;
			qc.invalidateQueries({ queryKey: ["profile"] });
			if (next > prev) onIncrease(next, prev);
		})();
	}, [
		profile,
		qc,
		onIncrease
	]);
}
function computeTaxSavings(value) {
	const x = Math.max(0, Math.round(value));
	let pit = 0;
	if (x > 2e5) {
		pit += (x - 2e5) * .23;
		pit += 15e4 * .13;
	} else if (x > 5e4) pit += (x - 5e4) * .13;
	const social = x * .095;
	const raiseNet = Math.max(0, x - pit - social);
	const difference = x - raiseNet;
	return {
		benefitNet: x,
		raiseNet: Math.round(raiseNet),
		taxPaid: Math.round(pit),
		socialPaid: Math.round(social),
		difference: Math.round(difference),
		effectiveRate: x === 0 ? 0 : difference / x
	};
}
function JoinCompanyBanner({ userId }) {
	const { locale } = useLocale();
	const T = joinDict[locale];
	const qc = useQueryClient();
	const myReqQ = useMyJoinRequest(userId);
	const companiesQ = useCompaniesList();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)("");
	const [pickedId, setPickedId] = (0, import_react.useState)(null);
	const [message, setMessage] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const pending = myReqQ.data?.status === "pending";
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return (companiesQ.data ?? []).filter((c) => !q || c.name.toLowerCase().includes(q)).slice(0, 8);
	}, [companiesQ.data, search]);
	async function send() {
		if (!pickedId) {
			toast(T.pickFirst);
			return;
		}
		setSending(true);
		const { error } = await supabase.rpc("request_join_company", {
			_company_id: pickedId,
			_message: message
		});
		setSending(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(T.requestSent);
		setOpen(false);
		qc.invalidateQueries({ queryKey: ["myJoinRequest", userId] });
		qc.invalidateQueries({ queryKey: ["profile"] });
	}
	if (pending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hairline mb-6 flex items-start gap-3 rounded-2xl bg-copper-light p-4 text-copper-dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hourglass, {
			size: 18,
			className: "mt-0.5 shrink-0"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-medium",
			children: T.pendingTitle
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm opacity-80",
			children: T.pendingBody
		})] })]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hairline mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-paper p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-10 w-10 place-items-center rounded-xl bg-parchment",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 18 })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] font-medium uppercase tracking-[0.14em] text-copper-dark",
					children: T.bannerKicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-lg leading-tight",
					children: T.bannerTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-ink/60",
					children: T.bannerBody
				})
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setOpen(true),
			className: "btn-press rounded-full bg-copper px-4 py-2 text-sm font-medium text-white hover:bg-copper-dark",
			children: T.bannerCta
		})]
	}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4",
		onClick: () => !sending && setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: (e) => e.stopPropagation(),
			className: "hairline w-full max-w-lg rounded-2xl bg-paper p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: T.bannerTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium uppercase tracking-wide text-ink/55",
							children: T.pickCompany
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								size: 14,
								className: "absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: T.searchPlaceholder,
								className: "block w-full rounded-xl border border-[var(--hairline)] bg-parchment py-2.5 pl-9 pr-3 text-sm outline-none focus:border-copper"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 max-h-48 overflow-y-auto rounded-xl border border-[var(--hairline)]",
							children: [filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setPickedId(c.id),
								className: `w-full px-4 py-2.5 text-left text-sm hover:bg-parchment ${pickedId === c.id ? "bg-copper-light text-copper-dark" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium",
									children: c.name
								}), c.industry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-ink/55",
									children: c.industry
								}) : null]
							}) }, c.id)), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "px-4 py-3 text-sm text-ink/55",
								children: "—"
							}) : null]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-medium uppercase tracking-wide text-ink/55",
						children: T.messageLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 3,
						value: message,
						onChange: (e) => setMessage(e.target.value),
						placeholder: T.messagePlaceholder,
						className: "mt-2 block w-full rounded-xl border border-[var(--hairline)] bg-parchment px-4 py-2.5 text-sm outline-none focus:border-copper",
						maxLength: 300
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(false),
						disabled: sending,
						className: "btn-press rounded-full border border-[var(--hairline)] px-4 py-2 text-sm",
						children: joinDict[locale === "sq" ? "sq" : "en"].pendingTitle ? locale === "sq" ? "Anulo" : "Cancel" : "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: send,
						disabled: sending || !pickedId,
						className: "btn-press rounded-full bg-copper px-4 py-2 text-sm font-medium text-white hover:bg-copper-dark disabled:opacity-60",
						children: sending ? T.sending : T.sendRequest
					})]
				})
			]
		})
	}) : null] });
}
var MOOD_WORDS = {
	relax: [
		"relax",
		"relaks",
		"qetë",
		"qetesi",
		"qetësi",
		"spa",
		"calm",
		"rileks"
	],
	energy: [
		"energy",
		"energji",
		"gym",
		"fitness",
		"run",
		"vrap",
		"stërvitje",
		"sport"
	],
	adventure: [
		"adventure",
		"aventure",
		"aventurë",
		"travel",
		"udhetim",
		"udhëtim",
		"trip",
		"shtegtim"
	],
	focus: [
		"focus",
		"fokus",
		"work",
		"punë",
		"produktivitet",
		"concentration",
		"kafe"
	]
};
function detectMoods(msg) {
	const m = msg.toLowerCase();
	const out = [];
	for (const [mood, words] of Object.entries(MOOD_WORDS)) if (words.some((w) => m.includes(w))) out.push(mood);
	return out;
}
function detectBudget(msg) {
	const m = msg.replace(/[.,](?=\d{3}\b)/g, "").match(/(\d{3,7})\s*(l|lek|lekë|leke)?/i);
	return m ? parseInt(m[1], 10) : null;
}
function localRecommend(message, offers, balance, locale) {
	const moods = detectMoods(message);
	const budget = Math.min(detectBudget(message) ?? balance, balance || Infinity);
	const matchesMood = (o) => moods.length === 0 || (o.mood ?? []).some((m) => moods.includes(m));
	const ranked = [...offers].filter((o) => o.price_l <= budget).sort((a, b) => {
		const am = matchesMood(a) ? 0 : 1;
		const bm = matchesMood(b) ? 0 : 1;
		if (am !== bm) return am - bm;
		return a.price_l - b.price_l;
	});
	const picks = [];
	const seenCats = /* @__PURE__ */ new Set();
	let total = 0;
	for (const o of ranked) {
		if (picks.length >= 4) break;
		if (total + o.price_l > budget) continue;
		if (seenCats.has(o.category) && picks.length >= 2) continue;
		picks.push(o);
		seenCats.add(o.category);
		total += o.price_l;
	}
	if (picks.length < 2) for (const o of ranked) {
		if (picks.length >= 2) break;
		if (picks.includes(o)) continue;
		if (total + o.price_l > budget) continue;
		picks.push(o);
		total += o.price_l;
	}
	const budgetStr = Math.round(budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	const intro = locale === "sq" ? moods.length ? `Një paketë ${moods.join(" + ")} brenda ${budgetStr} pikë:` : "Ja një paketë e zgjedhur posaçërisht për ty:" : moods.length ? `A ${moods.join(" + ")} bundle within ${budgetStr} points:` : "Here's a bundle picked for you:";
	const reasonFor = (o) => {
		if (locale === "sq") {
			if (matchesMood(o)) return `Përputhet me humorin ${(o.mood ?? []).join(", ")}.`;
			return `Brenda buxhetit dhe i kërkuar nga kolegët.`;
		}
		if (matchesMood(o)) return `Matches your ${(o.mood ?? []).join(", ")} mood.`;
		return `Within budget and popular with peers.`;
	};
	return {
		intro,
		picks: picks.map((o) => ({
			offer_id: o.id,
			reason: reasonFor(o)
		}))
	};
}
var TYPE_CHAR_MS = 28;
var TYPING_DOTS_MS = 650;
var CARDS_REVEAL_DELAY = 120;
var COPY$1 = {
	sq: {
		kicker: "Konçerzh i Përfitimeve",
		title: "Çfarë po kërkon sot?",
		sub: "Më thuaj humorin dhe buxhetin — të rekomandoj një paketë reale nga katalogu.",
		placeholder: "p.sh. diçka relaksuese nën 8000 Lekë…",
		send: "Pyet",
		thinking: "Po mendoj…",
		addBundle: "Shto të gjithë paketën",
		bundleTotal: "Totali i paketës",
		suggestions: [
			"Cila paketë është më e mira për mua?",
			"Diçka relaksuese nën 8000 Lekë",
			"Energji & fokus për javën e punës"
		],
		fallbackNote: "Rekomanduar lokalisht (offline)",
		empty: "Nuk gjeta oferta që përshtaten me kërkesën — provo një buxhet tjetër."
	},
	en: {
		kicker: "Benefits Concierge",
		title: "What are you in the mood for?",
		sub: "Tell me a vibe and a budget — I'll curate a real bundle from the catalog.",
		placeholder: "e.g. something relaxing under 8000 Lekë…",
		send: "Ask",
		thinking: "Thinking…",
		addBundle: "Add whole bundle",
		bundleTotal: "Bundle total",
		suggestions: [
			"Which package is best for me?",
			"Something relaxing under 8000 Lekë",
			"Energy & focus for the work week"
		],
		fallbackNote: "Recommended locally (offline)",
		empty: "No matching offers — try a different budget."
	}
};
function ConciergePanel({ offers, profile, balance, selections, locale, onAddBundle, onOpenDetails, compact = false }) {
	const c = COPY$1[locale];
	const [input, setInput] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [freshId, setFreshId] = (0, import_react.useState)(null);
	const scrollerRef = (0, import_react.useRef)(null);
	const offerById = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		offers.forEach((o) => m.set(o.id, o));
		return m;
	}, [offers]);
	const spendByCategory = (0, import_react.useMemo)(() => {
		const out = {};
		selections.filter((s) => s.status === "paid").forEach((s) => s.offer_ids.forEach((id) => {
			const o = offerById.get(id);
			if (!o) return;
			out[o.category] = (out[o.category] ?? 0) + o.price_l;
		}));
		return out;
	}, [selections, offerById]);
	const recentOfferIds = (0, import_react.useMemo)(() => {
		const ids = [];
		for (const s of selections) for (const id of s.offer_ids) {
			if (!ids.includes(id)) ids.push(id);
			if (ids.length >= 3) return ids;
		}
		return ids;
	}, [selections]);
	async function ask(message) {
		const text = message.trim();
		if (!text || loading) return;
		setInput("");
		const priorHistory = messages.map((m) => m.role === "user" ? {
			role: "user",
			text: m.text
		} : {
			role: "assistant",
			intro: m.intro,
			picks: m.picks
		});
		setMessages((m) => [...m, {
			role: "user",
			text
		}]);
		setLoading(true);
		let assistant = null;
		try {
			const { data, error } = await supabase.functions.invoke("concierge", { body: {
				message: text,
				locale,
				profile: {
					full_name: profile?.full_name,
					job_title: profile?.job_title,
					department: profile?.department,
					interests: profile?.interests
				},
				balance,
				spendByCategory,
				recentOfferIds,
				history: priorHistory,
				offers: offers.map((o) => ({
					id: o.id,
					title_sq: o.title_sq,
					title_en: o.title_en,
					price_l: o.price_l,
					category: o.category,
					mood: o.mood
				}))
			} });
			if (error) throw error;
			const validPicks = (Array.isArray(data?.picks) ? data.picks : []).filter((p) => offerById.has(p.offer_id));
			if (validPicks.length >= 2) assistant = {
				role: "assistant",
				intro: typeof data?.intro === "string" ? data.intro : "",
				picks: validPicks.slice(0, 4),
				source: "ai"
			};
		} catch (e) {
			console.warn("concierge_fallback", e);
		}
		if (!assistant) {
			const fb = localRecommend(text, offers, balance, locale);
			assistant = {
				role: "assistant",
				intro: fb.intro,
				picks: fb.picks,
				source: "fallback"
			};
		}
		const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `a_${Date.now()}_${Math.random()}`;
		assistant = {
			...assistant,
			id
		};
		setFreshId(id);
		setMessages((m) => [...m, assistant]);
		setLoading(false);
		requestAnimationFrame(() => {
			scrollerRef.current?.scrollTo({
				top: scrollerRef.current.scrollHeight,
				behavior: "smooth"
			});
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `concierge-panel-glow hairline flex h-full flex-col overflow-hidden bg-ink text-parchment ${compact ? "rounded-2xl" : "rounded-3xl"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-start justify-between gap-4 border-b border-parchment/10 ${compact ? "px-5 py-4" : "p-6 sm:p-8"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] font-medium uppercase tracking-[0.18em] text-copper",
							children: c.kicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: `mt-1 font-display font-medium tracking-tight ${compact ? "text-lg" : "mt-2 text-3xl sm:text-4xl"}`,
							children: c.title
						}),
						!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-md text-sm text-parchment/65",
							children: c.sub
						})
					]
				}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkBadge, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scrollerRef,
				className: `flex-1 space-y-4 overflow-y-auto ${compact ? "px-5 py-4" : "max-h-[480px] px-6 py-5 sm:px-8"}`,
				children: [
					messages.length === 0 && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: c.suggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => ask(s),
							className: "concierge-chip btn-press rounded-full border border-parchment/15 bg-parchment/5 px-3.5 py-1.5 text-xs font-medium text-parchment/85 hover:border-copper hover:text-parchment",
							children: s
						}, s))
					}) : null,
					messages.map((m, i) => m.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-w-[80%] rounded-2xl rounded-br-sm bg-copper px-4 py-2.5 text-sm text-parchment",
							children: m.text
						})
					}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantBubble, {
						msg: m,
						offerById,
						locale,
						copy: c,
						onAddBundle,
						onOpenDetails,
						animate: !!m.id && m.id === freshId,
						onAnimationDone: () => {
							requestAnimationFrame(() => {
								scrollerRef.current?.scrollTo({
									top: scrollerRef.current.scrollHeight,
									behavior: "smooth"
								});
							});
						}
					}, i)),
					loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm text-parchment/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-2 w-2 animate-pulse rounded-full bg-copper" }), c.thinking]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 animate-pulse rounded-2xl bg-parchment/5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 animate-pulse rounded-2xl bg-parchment/5" })]
						})]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					ask(input);
				},
				className: `flex items-center gap-2 border-t border-parchment/10 bg-ink/80 ${compact ? "p-3" : "p-4 sm:p-5"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `relative flex-1 rounded-full ${loading ? "concierge-thinking" : "concierge-glow"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: input,
						onChange: (e) => setInput(e.target.value),
						placeholder: c.placeholder,
						className: "relative z-[1] w-full min-w-0 rounded-full bg-parchment/10 px-4 py-2.5 text-sm text-parchment placeholder:text-parchment/40 focus:outline-none focus:ring-2 focus:ring-copper"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: loading || !input.trim(),
					className: "ask-sheen btn-press shrink-0 rounded-full bg-copper px-5 py-2.5 text-sm font-medium text-parchment hover:bg-copper-dark disabled:opacity-50",
					children: c.send
				})]
			})
		]
	});
}
function AssistantBubble({ msg, offerById, locale, copy, onAddBundle, onOpenDetails, animate = false, onAnimationDone }) {
	const items = msg.picks.map((p) => ({
		offer: offerById.get(p.offer_id),
		reason: p.reason
	})).filter((x) => !!x.offer);
	const total = items.reduce((s, x) => s + x.offer.price_l, 0);
	const detailsLabel = locale === "sq" ? "Shiko detajet" : "View details";
	const reducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	const shouldAnimate = animate && !reducedMotion;
	const [phase, setPhase] = (0, import_react.useState)(shouldAnimate ? "dots" : "done");
	const [typedCount, setTypedCount] = (0, import_react.useState)(shouldAnimate ? 0 : msg.intro.length);
	(0, import_react.useEffect)(() => {
		if (!shouldAnimate) return;
		const t = setTimeout(() => setPhase("typing"), TYPING_DOTS_MS);
		return () => clearTimeout(t);
	}, []);
	(0, import_react.useEffect)(() => {
		if (phase !== "typing") return;
		if (typedCount >= msg.intro.length) {
			const t = setTimeout(() => {
				setPhase("cards");
				onAnimationDone?.();
			}, CARDS_REVEAL_DELAY);
			return () => clearTimeout(t);
		}
		const t = setTimeout(() => setTypedCount((n) => n + 1), TYPE_CHAR_MS);
		return () => clearTimeout(t);
	}, [
		phase,
		typedCount,
		msg.intro,
		onAnimationDone
	]);
	(0, import_react.useEffect)(() => {
		if (phase !== "cards") return;
		const t = setTimeout(() => setPhase("done"), 600);
		return () => clearTimeout(t);
	}, [phase]);
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-parchment/10 bg-parchment/5 p-5 text-sm text-parchment/75",
		children: copy.empty
	});
	const showCards = phase === "cards" || phase === "done";
	const isTyping = phase === "typing" && typedCount < msg.intro.length;
	const introText = shouldAnimate ? msg.intro.slice(0, typedCount) : msg.intro;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			phase === "dots" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "inline-flex items-center gap-1.5 rounded-2xl bg-parchment/5 px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "concierge-typing-dot" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "concierge-typing-dot" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "concierge-typing-dot" })
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-lg leading-snug text-parchment",
				children: [introText, isTyping && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "concierge-typing-caret",
					"aria-hidden": true
				})]
			}),
			showCards && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stagger-rise grid gap-2.5 sm:grid-cols-2",
				children: items.map(({ offer, reason }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl border border-parchment/10 bg-parchment/5 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-[0.14em] text-copper",
							children: offer.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm font-medium text-parchment",
							children: locale === "sq" ? offer.title_sq : offer.title_en
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 font-mono-num text-sm text-parchment/85",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: offer.price_l })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-relaxed text-parchment/65",
							children: reason
						})
					]
				}, offer.id))
			}),
			showCards && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-parchment/5 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-parchment/65",
					children: [
						copy.bundleTotal,
						":",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono-num text-parchment",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: total })
						}),
						msg.source === "fallback" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 text-[10px] uppercase tracking-wider text-parchment/40",
							children: ["· ", copy.fallbackNote]
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [onOpenDetails && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onOpenDetails(items.map((x) => x.offer), {
							sq: msg.intro || "Paketë",
							en: msg.intro || "Bundle"
						}),
						className: "btn-press rounded-full border border-parchment/20 bg-parchment/5 px-3 py-2 text-xs font-medium text-parchment/85 hover:border-copper hover:text-parchment",
						children: detailsLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onAddBundle(items.map((x) => x.offer)),
						className: "btn-press rounded-full bg-copper px-4 py-2 text-xs font-medium text-parchment hover:bg-copper-dark",
						children: copy.addBundle
					})]
				})]
			})
		]
	});
}
function SparkBadge() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-copper/15 text-copper sm:flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			className: "h-6 w-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z",
				fill: "currentColor"
			})
		})
	});
}
function ConciergeLauncher(props) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const label = props.locale === "sq" ? "Pyet asistentin" : "Ask the concierge";
	const closeLabel = props.locale === "sq" ? "Mbyll" : "Close";
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `fixed bottom-20 right-4 z-[55] transition-opacity duration-200 sm:bottom-24 sm:right-6 ${open ? "pointer-events-none opacity-0" : "opacity-100"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "group relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					role: "tooltip",
					className: "pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-parchment opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "concierge-fab-halo pointer-events-none absolute inset-0 rounded-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": label,
					onClick: () => setOpen(true),
					className: "concierge-fab-btn btn-press relative grid h-14 w-14 place-items-center rounded-full bg-brand text-brand-foreground shadow-[0_10px_30px_-8px_color-mix(in_oklab,var(--brand)_70%,transparent)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-10px_color-mix(in_oklab,var(--brand)_80%,transparent)] sm:h-[60px] sm:w-[60px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						className: "h-6 w-6",
						strokeWidth: 1.8
					})
				})
			]
		})
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": closeLabel,
			onClick: () => setOpen(false),
			className: "concierge-backdrop fixed inset-0 z-[65] bg-ink/50 backdrop-blur-sm sm:hidden"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": closeLabel,
			onClick: () => setOpen(false),
			tabIndex: -1,
			className: "fixed inset-0 z-[65] hidden cursor-default sm:block"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Benefits Concierge",
			className: "concierge-sheet fixed inset-x-0 bottom-0 z-[70] flex max-h-[88vh] flex-col sm:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelInner, {
				onClose: () => setOpen(false),
				closeLabel,
				...props
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Benefits Concierge",
			className: "concierge-pop fixed z-[70] hidden origin-bottom-right sm:bottom-24 sm:right-6 sm:flex sm:h-[640px] sm:max-h-[calc(100vh-8rem)] sm:w-[400px] sm:flex-col",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelInner, {
				onClose: () => setOpen(false),
				closeLabel,
				...props
			})
		})
	] })] });
}
function PanelInner({ onClose, closeLabel, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-t-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] sm:rounded-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": closeLabel,
			onClick: onClose,
			className: "btn-press absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-parchment/10 text-parchment backdrop-blur-md hover:bg-parchment/20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConciergePanel, {
			...props,
			compact: true
		})]
	});
}
var prefersReducedMotion$1 = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
var SLIDE_DURATION_MS = 5200;
function YearInBenefits({ open, onClose, selections, offerById, streakCount, fullName }) {
	const { t, locale } = useLocale();
	const e = t.dashboard.employee;
	const [step, setStep] = (0, import_react.useState)(0);
	const [reduced, setReduced] = (0, import_react.useState)(false);
	const progressRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setReduced(prefersReducedMotion$1());
	}, [open]);
	const stats = (0, import_react.useMemo)(() => {
		const byCat = /* @__PURE__ */ new Map();
		let total = 0;
		let picks = 0;
		selections.filter((s) => s.status === "paid" || s.status === "approved").forEach((s) => {
			total += s.total_l;
			s.offer_ids.forEach((id) => {
				const o = offerById.get(id);
				if (!o) return;
				picks += 1;
				byCat.set(o.category, (byCat.get(o.category) ?? 0) + o.price_l);
			});
		});
		let topCategory = null;
		let topValue = 0;
		byCat.forEach((v, k) => {
			if (v > topValue) {
				topValue = v;
				topCategory = k;
			}
		});
		const personaKey = topCategory && topCategory in e.personas ? topCategory : "default";
		return {
			total,
			picks,
			topCategory,
			topValue,
			personaKey
		};
	}, [
		selections,
		offerById,
		e.personas
	]);
	const firstName = (fullName?.split(/\s+/)[0] ?? "PERX").toUpperCase();
	const slides = (0, import_react.useMemo)(() => [
		{
			kicker: e.wrappedKicker,
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wrap-rise text-xs font-medium uppercase tracking-[0.28em] text-brand-light/80",
					children: [locale === "sq" ? "Përshëndetje" : "Hello", ","]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "wrap-rise mt-3 font-display text-[clamp(56px,13vw,140px)] font-medium leading-[0.95] tracking-tight",
					children: firstName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "wrap-rise mt-6 font-display text-2xl font-medium tracking-tight sm:text-4xl",
					children: e.wrappedYourYear
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wrap-rise mt-3 max-w-md text-sm text-parchment/65 sm:text-base",
					children: locale === "sq" ? "Le ta shohim së bashku." : "Let's take a look together."
				})
			] })
		},
		{
			kicker: e.wrappedPersonaLabel,
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wrap-rise relative flex items-center justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute size-[clamp(180px,30vw,320px)] rounded-full bg-brand/25 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						className: "relative size-[clamp(96px,16vw,180px)] text-brand-light",
						strokeWidth: 1.1
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "wrap-rise mt-8 text-xs font-medium uppercase tracking-[0.22em] text-parchment/50",
					children: locale === "sq" ? "Ti je" : "You are"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "wrap-rise mt-3 font-display text-4xl font-medium tracking-tight sm:text-6xl",
					children: e.personas[stats.personaKey]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wrap-rise mt-3 max-w-md text-sm text-parchment/65 sm:text-base",
					children: locale === "sq" ? "Bazuar në zgjedhjet që ke bërë gjatë vitit." : "Based on the picks you made this year."
				})
			] }),
			accent: true
		},
		{
			kicker: e.wrappedCategoryLabel,
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "wrap-rise text-xs font-medium uppercase tracking-[0.22em] text-parchment/50",
					children: locale === "sq" ? "Më shumë se gjithçka" : "More than anything"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "wrap-rise mt-4 font-display text-5xl font-medium tracking-tight sm:text-7xl",
					children: stats.topCategory ? t.categories[stats.topCategory] ?? stats.topCategory : "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wrap-rise mt-10 flex items-baseline justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono-num text-[clamp(56px,12vw,120px)] leading-none text-brand-light",
						children: reduced ? formatNumber(stats.picks) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
							value: stats.picks,
							duration: 900
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm uppercase tracking-[0.18em] text-parchment/60 sm:text-base",
						children: locale === "sq" ? "zgjedhje" : "picks"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "wrap-rise mx-auto mt-8 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-parchment/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-brand-light",
						style: {
							width: "100%",
							transformOrigin: "left",
							animation: reduced ? "none" : "wrapBarGrow 1100ms cubic-bezier(.2,.7,.2,1) 300ms both"
						}
					})
				})
			] })
		},
		{
			kicker: e.wrappedValueLabel,
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "wrap-rise text-xs font-medium uppercase tracking-[0.22em] text-brand-light",
					children: locale === "sq" ? "Vlerë pa tatim që mban për vete" : "Tax-free value you kept"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wrap-rise mt-8 flex items-baseline justify-center gap-3 font-mono-num text-[clamp(72px,17vw,220px)] font-medium leading-none tracking-tight text-brand-light",
					children: [reduced ? formatLek(stats.total) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
						value: stats.total,
						duration: 1800,
						format: formatLek
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, { className: "opacity-80" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wrap-rise mt-6 max-w-md text-sm text-parchment/65 sm:text-base",
					children: locale === "sq" ? "Përfitime që do të kishin shkuar te tatimet — janë te ti." : "Benefits that would've gone to taxes — they stayed with you."
				})
			] }),
			accent: true
		},
		{
			kicker: e.wrappedStreakLabel,
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wrap-rise relative flex items-center justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute size-[clamp(160px,28vw,300px)] rounded-full bg-brand/20 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, {
						className: "relative size-[clamp(80px,14vw,160px)] text-brand-light",
						strokeWidth: 1.15
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wrap-rise mt-8 flex items-baseline justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono-num text-[clamp(64px,14vw,160px)] leading-none",
						children: reduced ? streakCount : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
							value: streakCount,
							duration: 1100
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-base uppercase tracking-[0.18em] text-parchment/60 sm:text-lg",
						children: locale === "sq" ? "javë" : "weeks"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wrap-rise mt-4 inline-flex items-center gap-1.5 text-sm text-brand-light/90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: locale === "sq" ? "Streak më i gjatë" : "Longest streak" })]
				})
			] })
		},
		{
			kicker: locale === "sq" ? "Faleminderit" : "Thank you",
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "wrap-rise text-xs font-medium uppercase tracking-[0.22em] text-brand-light",
					children: locale === "sq" ? "Faleminderit që zgjodhe PERX" : "Thanks for choosing PERX"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "wrap-rise mt-6 font-display text-4xl font-medium tracking-tight sm:text-6xl",
					children: locale === "sq" ? "Viti tjetër pret." : "Next year is waiting."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wrap-rise mt-4 max-w-md text-sm text-parchment/65 sm:text-base",
					children: locale === "sq" ? "Vazhdo të zgjedhësh atë që të bën mirë." : "Keep choosing what makes you well."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: (ev) => ev.stopPropagation(),
					className: "wrap-rise mt-10 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground btn-press",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), locale === "sq" ? "Ndaj momentin" : "Share the moment"]
				})
			] }),
			accent: true
		}
	], [
		e,
		t.categories,
		firstName,
		stats,
		streakCount,
		locale,
		reduced
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		if (reduced) return;
		if (step !== 3) return;
		const id = setTimeout(() => {
			confetti_module_default({
				particleCount: 80,
				spread: 90,
				startVelocity: 32,
				origin: { y: .35 },
				colors: [
					"#0E7C66",
					"#16A34A",
					"#D5EDE6"
				],
				ticks: 160,
				scalar: .85
			});
		}, 600);
		return () => clearTimeout(id);
	}, [
		open,
		step,
		reduced
	]);
	(0, import_react.useEffect)(() => {
		if (open) setStep(0);
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open || reduced) return;
		const bar = progressRef.current;
		if (bar) {
			bar.style.transition = "none";
			bar.style.width = "0%";
			bar.offsetWidth;
			bar.style.transition = `width ${SLIDE_DURATION_MS}ms linear`;
			bar.style.width = "100%";
		}
		const id = setTimeout(() => {
			setStep((s) => Math.min(slides.length - 1, s + 1));
		}, SLIDE_DURATION_MS);
		return () => clearTimeout(id);
	}, [
		step,
		open,
		reduced,
		slides.length
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onKey(ev) {
			if (ev.key === "Escape") onClose();
			else if (ev.key === "ArrowRight" || ev.key === " " || ev.key === "Enter") next();
			else if (ev.key === "ArrowLeft") prev();
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});
	function next() {
		setStep((s) => {
			if (s >= slides.length - 1) {
				queueMicrotask(() => onClose());
				return 0;
			}
			return s + 1;
		});
	}
	function prev() {
		setStep((s) => Math.max(0, s - 1));
	}
	function handleTap(ev) {
		const rect = ev.currentTarget.getBoundingClientRect();
		if (ev.clientX - rect.left < rect.width * .32) prev();
		else next();
	}
	if (!open) return null;
	const slide = slides[step];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		className: "fixed inset-0 z-[60] overflow-hidden bg-ink text-parchment wrap-open",
		style: { backgroundImage: "radial-gradient(1200px 800px at 20% 10%, color-mix(in oklab, var(--brand) 38%, transparent), transparent 60%), radial-gradient(900px 700px at 85% 90%, color-mix(in oklab, var(--brand-dark) 50%, transparent), transparent 65%), linear-gradient(135deg, #0A0B10 0%, #14171C 55%, #0A1F1A 100%)" },
		children: [
			!reduced && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "pointer-events-none absolute -left-24 top-1/4 size-[420px] rounded-full bg-brand/25 blur-3xl wrap-drift-a"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "pointer-events-none absolute -right-24 bottom-10 size-[520px] rounded-full bg-brand-dark/35 blur-3xl wrap-drift-b"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "pointer-events-none absolute inset-0 wrap-particles"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-0 right-0 top-4 z-10 mx-auto flex max-w-2xl gap-1.5 px-5",
				children: slides.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-[3px] flex-1 overflow-hidden rounded-full bg-parchment/15",
					children: [i < step && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-parchment/85" }), i === step && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: progressRef,
						className: "absolute inset-y-0 left-0 bg-parchment/85",
						style: { width: reduced ? "100%" : "0%" }
					})]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onClose,
				"aria-label": e.wrappedClose,
				className: "absolute right-4 top-9 z-20 inline-flex size-9 items-center justify-center rounded-full border border-parchment/15 bg-parchment/5 text-parchment/85 hover:bg-parchment/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: prev,
				"aria-label": "Previous",
				disabled: step === 0,
				className: "absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-parchment/10 bg-parchment/5 p-2 text-parchment/80 hover:bg-parchment/10 disabled:opacity-30 sm:inline-flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: next,
				"aria-label": "Next",
				className: "absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-parchment/10 bg-parchment/5 p-2 text-parchment/80 hover:bg-parchment/10 sm:inline-flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				onClick: handleTap,
				className: "relative z-0 flex h-full w-full items-center justify-center px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `wrap-slide mx-auto flex max-w-2xl flex-col items-center text-center ${slide.accent ? "" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "wrap-rise text-[11px] font-medium uppercase tracking-[0.28em] text-brand-light",
						children: slide.kicker
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 w-full",
						children: slide.content
					})]
				}, step)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute bottom-5 left-0 right-0 text-center text-[11px] uppercase tracking-[0.2em] text-parchment/40",
				children: step === slides.length - 1 ? e.wrappedTapClose : e.wrappedTapNext
			})
		]
	});
}
function useOfferLocations() {
	return useQuery({
		queryKey: ["offer_locations"],
		queryFn: async () => {
			const { data, error } = await supabase.from("offer_locations").select(`
          id, offer_id, provider_id, name, latitude, longitude, city, address,
          provider:providers!offer_locations_provider_id_fkey ( id, business_name, brand_color, logo_url, category ),
          offer:offers!offer_locations_offer_id_fkey ( id, title_sq, title_en, price_l, category )
        `);
			if (error) throw error;
			return (data ?? []).filter((l) => l.latitude != null && l.longitude != null && l.provider && l.offer);
		}
	});
}
var MAPS_KEY = "AIzaSyBmvJph4LmrbtW7skeczzpBIyb9WWzFKo4";
var TRACKING_ID = "e67fb7505fc6450e228c4032f62e3045";
var DEMO_MAP_ID = "DEMO_MAP_ID";
var ALBANIA_CENTER = {
	lat: 41.1533,
	lng: 20.1683
};
var CATEGORY_GLYPHS = {
	fitness: "Fi",
	wellness: "We",
	travel: "Tr",
	health: "He",
	telecom: "Te",
	food: "Fo",
	learning: "Le"
};
var FALLBACK_COLOR$1 = "#FF7A33";
var mapsPromise = null;
function loadGoogleMaps() {
	if (typeof window === "undefined") return Promise.reject(/* @__PURE__ */ new Error("SSR"));
	if (window.google?.maps) return Promise.resolve(window.google);
	if (mapsPromise) return mapsPromise;
	mapsPromise = new Promise((resolve, reject) => {
		const cbName = `__perxInitMap_${Date.now()}`;
		window[cbName] = () => {
			const g = window.google;
			if (g?.maps) resolve(g);
			else reject(/* @__PURE__ */ new Error("Maps did not initialize"));
			delete window[cbName];
		};
		const params = new URLSearchParams({
			key: MAPS_KEY,
			v: "weekly",
			libraries: "marker",
			loading: "async",
			callback: cbName
		});
		params.set("channel", TRACKING_ID);
		const s = document.createElement("script");
		s.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
		s.async = true;
		s.defer = true;
		s.onerror = () => reject(/* @__PURE__ */ new Error("Failed to load Google Maps"));
		document.head.appendChild(s);
	});
	return mapsPromise;
}
function PerxMap({ locations: presetLocations, heightClass, showFilters = true }) {
	const { locale, t } = useLocale();
	const m = t.dashboard.employee.map;
	const all = useOfferLocations();
	const allLocations = presetLocations ?? all.data ?? [];
	const categories = (0, import_react.useMemo)(() => {
		const s = /* @__PURE__ */ new Set();
		allLocations.forEach((l) => s.add(l.provider.category ?? l.offer.category));
		return Array.from(s);
	}, [allLocations]);
	const [category, setCategory] = (0, import_react.useState)("all");
	const visible = (0, import_react.useMemo)(() => category === "all" ? allLocations : allLocations.filter((l) => (l.provider.category ?? l.offer.category) === category), [allLocations, category]);
	const h = heightClass ?? "h-[420px] sm:h-[560px] lg:h-[640px]";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [showFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryChips, {
			categories,
			category,
			setCategory,
			filterAll: m.filterAll,
			t,
			venuesLabel: m.venuesCount.replace("{n}", String(visible.length))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapCanvas, {
			locations: visible,
			heightClass: h,
			locale,
			m
		})]
	});
}
function CategoryChips({ categories, category, setCategory, filterAll, t, venuesLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setCategory("all"),
				className: `btn-press rounded-full border px-3 py-1.5 text-xs font-medium transition ${category === "all" ? "border-ink bg-ink text-parchment" : "border-[var(--hairline)] bg-paper text-ink/70 hover:text-ink"}`,
				children: filterAll
			}),
			categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setCategory(category === c ? "all" : c),
				className: `btn-press rounded-full border px-3 py-1.5 text-xs font-medium transition ${category === c ? "border-ink bg-ink text-parchment" : "border-[var(--hairline)] bg-paper text-ink/70 hover:text-ink"}`,
				children: t.categories[c] ?? c
			}, c)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-auto text-xs text-ink/55",
				children: venuesLabel
			})
		]
	});
}
function MapCanvas({ locations, heightClass, locale, m }) {
	const containerRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const markersRef = (0, import_react.useRef)([]);
	const infoRef = (0, import_react.useRef)(null);
	const [status, setStatus] = (0, import_react.useState)("loading");
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		loadGoogleMaps().then(async (g) => {
			if (cancelled || !containerRef.current) return;
			const { Map, InfoWindow } = await g.maps.importLibrary("maps");
			mapRef.current = new Map(containerRef.current, {
				center: ALBANIA_CENTER,
				zoom: 7,
				mapId: DEMO_MAP_ID,
				disableDefaultUI: true,
				zoomControl: true,
				clickableIcons: false,
				gestureHandling: "greedy"
			});
			infoRef.current = new InfoWindow({ disableAutoPan: false });
			setStatus("ready");
		}).catch(() => !cancelled && setStatus("error"));
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			const btn = e.target?.closest?.("[data-perx-view-provider]");
			if (!btn) return;
			const providerId = btn.getAttribute("data-perx-view-provider");
			const providerName = btn.getAttribute("data-perx-provider-name") ?? "";
			if (!providerId) return;
			window.dispatchEvent(new CustomEvent("perx:view-provider", { detail: {
				providerId,
				providerName
			} }));
			infoRef.current?.close();
		};
		document.addEventListener("click", handler);
		return () => document.removeEventListener("click", handler);
	}, []);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || status !== "ready") return;
		let cancelled = false;
		(async () => {
			const g = window.google;
			const { AdvancedMarkerElement } = await g.maps.importLibrary("marker");
			if (cancelled) return;
			markersRef.current.forEach((mk) => mk.map = null);
			markersRef.current = [];
			if (locations.length === 0) return;
			const bounds = new g.maps.LatLngBounds();
			for (const loc of locations) {
				const color = loc.provider.brand_color || FALLBACK_COLOR$1;
				const glyph = CATEGORY_GLYPHS[loc.provider.category ?? loc.offer.category] ?? "•";
				const el = document.createElement("div");
				el.className = "perx-pin";
				const hasLogo = !!loc.provider.logo_url;
				const bg = hasLogo ? "#FFFFFF" : color;
				const fg = hasLogo ? color : "#FFFFFF";
				el.setAttribute("style", `display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:14px;background:${bg};color:${fg};font-size:12px;font-weight:700;letter-spacing:-0.02em;line-height:1;box-shadow:0 6px 18px rgba(20,15,10,0.28),0 0 0 3px ${color},0 0 0 6px rgba(255,255,255,0.92);transform:translateY(-6px);cursor:pointer;font-family:Inter,system-ui,sans-serif;overflow:hidden;`);
				if (hasLogo) el.innerHTML = `<img src="${loc.provider.logo_url}" alt="" style="width:34px;height:34px;border-radius:8px;object-fit:contain;background:#FFFFFF;" />`;
				else el.textContent = glyph;
				const marker = new AdvancedMarkerElement({
					map,
					position: {
						lat: Number(loc.latitude),
						lng: Number(loc.longitude)
					},
					content: el,
					title: loc.name
				});
				marker.addListener("click", () => {
					if (!infoRef.current) return;
					infoRef.current.setContent(buildInfoHtml(loc, locale, m));
					infoRef.current.open({
						map,
						anchor: marker
					});
				});
				markersRef.current.push(marker);
				bounds.extend({
					lat: Number(loc.latitude),
					lng: Number(loc.longitude)
				});
			}
			if (locations.length === 1) {
				map.setCenter(bounds.getCenter());
				map.setZoom(13);
			} else map.fitBounds(bounds, 64);
		})();
		return () => {
			cancelled = true;
		};
	}, [
		locations,
		status,
		locale,
		m
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative ${heightClass} w-full overflow-hidden rounded-3xl border border-[var(--hairline)] bg-paper`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: containerRef,
				className: "absolute inset-0"
			}),
			status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 grid place-items-center bg-parchment/60 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-10 animate-spin rounded-full border-2 border-copper/30 border-t-copper" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-[0.16em] text-ink/55",
						children: m.loading
					})]
				})
			}),
			status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 grid place-items-center bg-parchment/95 p-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-lg",
					children: m.fallbackTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-ink/65",
					children: m.fallbackBody
				})] })
			}),
			status === "ready" && locations.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 top-4 mx-auto w-fit rounded-full bg-paper px-4 py-1.5 text-xs text-ink/65 shadow",
				children: m.empty
			})
		]
	});
}
function buildInfoHtml(loc, locale, m) {
	const title = locale === "sq" ? loc.offer.title_sq : loc.offer.title_en;
	const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;
	const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${loc.latitude},${loc.longitude}`;
	const color = loc.provider.brand_color || FALLBACK_COLOR$1;
	const price = formatLek(loc.offer.price_l);
	const esc = (s) => s.replace(/[&<>"']/g, (c) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;"
	})[c]);
	return `
<div style="font-family:system-ui,sans-serif;max-width:260px;padding:6px 4px 2px;">
  <div style="display:flex;align-items:center;gap:8px;">
    <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${color};"></span>
    <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#7a6f63;">${esc(loc.provider.business_name)}</span>
  </div>
  <div style="font-family:'Fraunces',Georgia,serif;font-size:18px;line-height:1.2;color:#1a140e;margin-top:6px;">${esc(loc.name)}</div>
  <div style="font-size:12px;color:#7a6f63;margin-top:2px;">${esc(loc.address ?? "")}${loc.city ? ` · ${esc(loc.city)}` : ""}</div>
  <div style="margin-top:10px;padding-top:8px;border-top:1px solid #ece4d6;">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#7a6f63;">${esc(m.usableHere)}</div>
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:4px;gap:8px;">
      <span style="font-size:14px;color:#1a140e;">${esc(title)}</span>
      <span style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;color:#1a140e;">${esc(price)}</span>
    </div>
  </div>
  <button data-perx-view-provider="${esc(loc.provider.id)}" data-perx-provider-name="${esc(loc.provider.business_name)}" style="display:block;width:100%;margin-top:12px;padding:9px 12px;border-radius:999px;border:0;background:${color};color:#FFFFFF;font-size:13px;font-weight:600;cursor:pointer;font-family:Inter,system-ui,sans-serif;">${esc(m.viewOffers)}</button>
  <div style="display:flex;gap:6px;margin-top:8px;">
    <a href="${mapsUrl}" target="_blank" rel="noopener" style="flex:1;text-align:center;padding:7px 10px;border-radius:999px;background:#FBF7F1;color:#1a140e;text-decoration:none;font-size:12px;font-weight:500;border:1px solid #ece4d6;">${esc(m.openInMaps)}</a>
    <a href="${dirUrl}" target="_blank" rel="noopener" style="flex:1;text-align:center;padding:7px 10px;border-radius:999px;background:#FBF7F1;color:#1a140e;text-decoration:none;font-size:12px;font-weight:500;border:1px solid #ece4d6;">${esc(m.directions)}</a>
  </div>
</div>`;
}
var FALLBACK_COLOR = "#FF7A33";
var DESTINATIONS = [
	{
		match: /amalfi/i,
		city: "Amalfi",
		country: "Italy",
		flag: "IT"
	},
	{
		match: /paris/i,
		city: "Paris",
		country: "France",
		flag: "FR"
	},
	{
		match: /barcelona/i,
		city: "Barcelona",
		country: "Spain",
		flag: "ES"
	},
	{
		match: /santorini|greece|greek/i,
		city: "Santorini",
		country: "Greece",
		flag: "GR"
	},
	{
		match: /istanbul|turkey|turqi/i,
		city: "Istanbul",
		country: "Turkey",
		flag: "TR"
	}
];
function findDestination(offer) {
	const hay = `${offer.title_sq} ${offer.title_en}`;
	return DESTINATIONS.find((d) => d.match.test(hay)) ?? null;
}
var COPY = {
	sq: {
		bundleTag: "Paketë",
		offerTag: "Ofertë",
		description: "Përshkrimi",
		includes: "Përfshin",
		total: "Totali",
		taxKicker: "Kursimi tatimor",
		asSalary: "Si pagë (neto)",
		asBenefit: "Si benefit (neto)",
		keepMore: "Mban më shumë",
		pointsTitle: "Pikët",
		pointsCost: "Kushton",
		pointsBalance: "Bilanci yt",
		pointsEnough: "Ke pikë të mjaftueshme",
		pointsShort: "Të mungojnë {n}",
		pointsUnit: "1 pikë = 1 PERX",
		usableSingle: "Përdoret në të gjitha pikat {name} në Shqipëri",
		usableMulti: "Përdoret në këto lokacione",
		bookedInTirana: "Rezervohet në Tiranë",
		enjoyedIn: "Shijohet në {city} {flag}",
		locationsList: "Lokacionet",
		openInMaps: "Hap në Google Maps",
		addToSelection: "Shto në zgjedhje",
		addAll: "Shto të gjithë paketën",
		close: "Mbyll",
		seededDesc: {
			fitness: "Akses në palestër & klasa në grup gjatë gjithë muajit.",
			wellness: "Trajtim relaksues nga profesionistë të certifikuar.",
			travel: "Përvojë e organizuar — udhëtim, akomodim dhe detaje të kuruara.",
			health: "Konsultë mjekësore me specialistë të rrjetit.",
			telecom: "Internet & paketë celulare për një muaj të plotë.",
			food: "Vakte & përvoja kulinare nga kuzhinierë lokalë.",
			learning: "Materiale & sesione mësimore për të rritur shkathtësitë."
		}
	},
	en: {
		bundleTag: "Bundle",
		offerTag: "Offer",
		description: "Description",
		includes: "Includes",
		total: "Total",
		taxKicker: "Tax savings",
		asSalary: "As salary (net)",
		asBenefit: "As benefit (net)",
		keepMore: "You keep more",
		pointsTitle: "Points",
		pointsCost: "Costs",
		pointsBalance: "Your balance",
		pointsEnough: "You have enough points",
		pointsShort: "You're short by {n}",
		pointsUnit: "1 point = 1 PERX",
		usableSingle: "Usable at all {name} locations in Albania",
		usableMulti: "Usable at these locations",
		bookedInTirana: "Booked in Tirana",
		enjoyedIn: "Enjoyed in {city} {flag}",
		locationsList: "Locations",
		openInMaps: "Open in Google Maps",
		addToSelection: "Add to selection",
		addAll: "Add whole bundle",
		close: "Close",
		seededDesc: {
			fitness: "Full month of gym access and group classes.",
			wellness: "Relaxing treatment by certified professionals.",
			travel: "Curated experience — travel, stay, and the small details.",
			health: "Specialist consultation across our health network.",
			telecom: "Mobile & home internet for a full month.",
			food: "Meals and culinary experiences from local chefs.",
			learning: "Materials and sessions to grow your skills."
		}
	}
};
function OfferDetailModal({ open, onClose, offers, providerById, bundleTitle, pointsBalance, onAdd }) {
	const { locale } = useLocale();
	const c = COPY[locale];
	const isBundle = !!bundleTitle || offers.length > 1;
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [open, onClose]);
	const allLocations = useOfferLocations();
	const offerIds = (0, import_react.useMemo)(() => new Set(offers.map((o) => o.id)), [offers]);
	const filteredLocations = (0, import_react.useMemo)(() => (allLocations.data ?? []).filter((l) => offerIds.has(l.offer_id)), [allLocations.data, offerIds]);
	const total = offers.reduce((s, o) => s + o.price_l, 0);
	const tax = computeTaxSavings(total);
	const uniqueProviders = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		offers.forEach((o) => {
			const p = providerById.get(o.provider_id);
			if (p) m.set(p.id, p);
		});
		return Array.from(m.values());
	}, [offers, providerById]);
	const headerTitle = bundleTitle ? locale === "sq" ? bundleTitle.sq : bundleTitle.en : (locale === "sq" ? offers[0]?.title_sq : offers[0]?.title_en) ?? "";
	const travelDestination = (0, import_react.useMemo)(() => {
		const travelOffer = offers.find((o) => o.category === "travel");
		return travelOffer ? findDestination(travelOffer) : null;
	}, [offers]);
	const mapCaption = (0, import_react.useMemo)(() => {
		if (travelDestination) return `${c.bookedInTirana} · ${c.enjoyedIn.replace("{city}", travelDestination.city).replace("{flag}", travelDestination.flag)}`;
		if (uniqueProviders.length === 1) return c.usableSingle.replace("{name}", uniqueProviders[0].business_name);
		return c.usableMulti;
	}, [
		travelDestination,
		uniqueProviders,
		c
	]);
	const pointsShort = Math.max(0, total - pointsBalance);
	const pointsPct = Math.min(100, pointsBalance / Math.max(1, total) * 100);
	const pointsEnough = pointsBalance >= total;
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "offer-detail-title",
		className: "fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			"aria-label": c.close,
			onClick: onClose,
			className: "absolute inset-0 bg-ink/55 backdrop-blur-sm animate-in fade-in duration-200"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-[var(--hairline)] bg-paper text-ink shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-6 duration-300 sm:max-h-[88vh] sm:rounded-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					"aria-label": c.close,
					className: "absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full bg-parchment/80 text-ink/70 backdrop-blur transition hover:bg-parchment hover:text-ink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-y-auto px-6 pb-32 pt-8 sm:px-10 sm:pb-10 sm:pt-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] font-medium uppercase tracking-[0.18em] text-copper-dark",
							children: isBundle ? c.bundleTag : c.offerTag
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "offer-detail-title",
							className: "mt-2 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl",
							children: headerTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap items-center gap-x-4 gap-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderChips, { providers: uniqueProviders }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto font-mono-num text-2xl tabular-nums sm:text-3xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: total })
							})]
						}),
						isBundle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-medium uppercase tracking-[0.14em] text-ink/55",
								children: c.includes
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 divide-y divide-[var(--hairline)] rounded-2xl border border-[var(--hairline)] bg-parchment/60",
								children: offers.map((o) => {
									const p = providerById.get(o.provider_id);
									const name = p?.business_name ?? "—";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderMark, {
												name,
												logoUrl: p?.logo_url,
												brandColor: p?.brand_color,
												size: "md"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "truncate font-medium",
													children: locale === "sq" ? o.title_sq : o.title_en
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "truncate text-xs text-ink/55",
													children: name
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono-num text-sm tabular-nums",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: o.price_l })
											})
										]
									}, o.id);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-7 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-medium uppercase tracking-[0.14em] text-ink/55",
								children: c.description
							}), offers.map((o) => {
								const desc = (locale === "sq" ? o.description_sq : o.description_en) ?? c.seededDesc[o.category] ?? "";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm leading-relaxed text-ink/75",
									children: [isBundle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mr-2 font-medium text-ink",
										children: [locale === "sq" ? o.title_sq : o.title_en, " —"]
									}), desc]
								}, o.id);
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-7 overflow-hidden rounded-3xl border border-copper-light bg-gradient-to-br from-copper-light/60 via-paper to-paper p-5 sm:p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] font-medium uppercase tracking-[0.16em] text-copper-dark",
									children: c.taxKicker
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-ink/60",
										children: c.asSalary
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-mono-num text-xl tabular-nums text-ink/70 line-through",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: tax.raiseNet })
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-ink/60",
										children: c.asBenefit
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-mono-num text-xl tabular-nums",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: tax.benefitNet })
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex flex-wrap items-baseline justify-between gap-2 rounded-2xl bg-copper px-4 py-3 text-parchment",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium uppercase tracking-[0.14em] opacity-90",
										children: c.keepMore
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono-num text-2xl font-medium tabular-nums",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, {
											prefix: "+",
											value: tax.difference
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-7 rounded-2xl border border-[var(--hairline)] bg-parchment/60 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-medium uppercase tracking-[0.14em] text-ink/55",
										children: c.pointsTitle
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-ink/70",
											children: [c.pointsCost, ": "]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono-num font-medium tabular-nums",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: total })
										})]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right text-xs text-ink/60",
										children: [c.pointsBalance, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-mono-num text-sm tabular-nums text-ink",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: pointsBalance })
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 h-2 w-full overflow-hidden rounded-full bg-copper-light/60",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-full rounded-full transition-[width] duration-700 ${pointsEnough ? "bg-sage" : "bg-copper"}`,
										style: { width: `${pointsPct}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center justify-between text-[11px] text-ink/55",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.pointsUnit }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: pointsEnough ? "text-sage" : "text-copper-dark",
										children: pointsEnough ? c.pointsEnough : c.pointsShort.replace("{n}", formatNumber(pointsShort))
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex flex-wrap items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-ink/75",
										children: mapCaption
									}), travelDestination && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-full border border-copper-light bg-copper-light/40 px-2.5 py-1 text-[11px] font-medium text-copper-dark",
										children: [
											travelDestination.flag,
											" ",
											travelDestination.city
										]
									})]
								}),
								allLocations.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[280px] w-full animate-pulse rounded-3xl border border-[var(--hairline)] bg-parchment/60" }) : filteredLocations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-3xl border border-dashed border-[var(--hairline)] bg-parchment/40 p-6 text-center text-sm text-ink/55",
									children: locale === "sq" ? "Lokacionet do të konfirmohen pas miratimit." : "Locations will be confirmed after approval."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerxMap, {
									locations: filteredLocations,
									showFilters: false,
									heightClass: "h-[280px] sm:h-[340px]"
								}),
								filteredLocations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 divide-y divide-[var(--hairline)] rounded-2xl border border-[var(--hairline)] bg-paper",
									children: filteredLocations.map((loc) => {
										const color = loc.provider.brand_color || FALLBACK_COLOR;
										const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "size-2.5 rounded-sm",
													"aria-hidden": true,
													style: { background: color }
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "truncate text-sm font-medium",
														children: loc.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "truncate text-xs text-ink/55",
														children: [loc.provider.business_name, loc.city ? ` · ${loc.city}` : ""]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: mapsUrl,
													target: "_blank",
													rel: "noopener noreferrer",
													className: "rounded-full border border-[var(--hairline)] bg-parchment px-3 py-1 text-[11px] font-medium text-ink/75 hover:text-ink",
													children: c.openInMaps
												})
											]
										}, loc.id);
									})
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 bottom-0 border-t border-[var(--hairline)] bg-paper/95 px-6 py-4 backdrop-blur sm:static sm:bg-paper",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "btn-press rounded-full border border-[var(--hairline)] bg-parchment px-5 py-2.5 text-sm font-medium text-ink/75 hover:text-ink",
							children: c.close
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								onAdd(offers);
								onClose();
							},
							className: "btn-press inline-flex items-center justify-center rounded-full bg-copper px-5 py-2.5 text-sm font-medium text-parchment hover:bg-copper-dark",
							children: isBundle ? c.addAll : c.addToSelection
						})]
					})
				})
			]
		})]
	});
}
function ProviderChips({ providers }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: providers.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-parchment py-1 pl-1 pr-3 text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderMark, {
				name: p.business_name,
				logoUrl: p.logo_url,
				brandColor: p.brand_color,
				size: "xs"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-ink",
				children: p.business_name
			})]
		}, p.id))
	});
}
function useColleagues(myId) {
	return useQuery({
		queryKey: ["colleagues", myId],
		enabled: !!myId,
		queryFn: async () => {
			const { data, error } = await supabase.rpc("list_colleagues");
			if (error) throw error;
			return (data ?? []).filter((p) => p.role !== "provider").map((p) => ({
				id: p.id,
				full_name: p.full_name,
				job_title: p.job_title,
				department: p.department
			}));
		},
		staleTime: 3e4
	});
}
function useMyTransfers(myId) {
	return useQuery({
		queryKey: ["transfers", myId],
		enabled: !!myId,
		queryFn: async () => {
			const { data: transfers, error } = await supabase.from("transfers").select("*").or(`sender_id.eq.${myId},recipient_id.eq.${myId}`).order("created_at", { ascending: false });
			if (error) throw error;
			const rows = transfers ?? [];
			const peopleIds = Array.from(new Set(rows.flatMap((r) => [r.sender_id, r.recipient_id])));
			let people = {};
			if (peopleIds.length) {
				const { data: ps } = await supabase.from("profiles").select("id, full_name, job_title, department").in("id", peopleIds);
				(ps ?? []).forEach((p) => {
					people[p.id] = {
						id: p.id,
						full_name: p.full_name,
						job_title: p.job_title,
						department: p.department
					};
				});
			}
			return rows.map((r) => ({
				...r,
				sender: people[r.sender_id] ?? null,
				recipient: people[r.recipient_id] ?? null
			}));
		},
		staleTime: 15e3
	});
}
function useSendGift() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (args) => {
			const { data, error } = await supabase.rpc("send_gift", {
				_recipient: args.recipientId,
				_type: args.type,
				_points: args.points ?? 0,
				_offer_ids: args.offerIds ?? [],
				_message: args.message ?? ""
			});
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["points"] });
			qc.invalidateQueries({ queryKey: ["transfers"] });
			qc.invalidateQueries({ queryKey: ["selections"] });
		}
	});
}
function useClaimGift() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (transferId) => {
			const { error } = await supabase.rpc("claim_transfer", { _transfer_id: transferId });
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["transfers"] });
		}
	});
}
function displayName(c) {
	if (!c) return "—";
	return (c.full_name?.trim() || c.email?.split("@")[0] || "—").trim();
}
function initials(c) {
	return displayName(c).split(/\s+/).map((p) => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}
function GiftModal({ open, onClose, myId, balance, offers, initialMode = "points", initialOfferIds, locale }) {
	const { t } = useLocale();
	const g = t.dashboard.employee.gifts;
	const [mode, setMode] = (0, import_react.useState)(initialMode);
	const [recipient, setRecipient] = (0, import_react.useState)(null);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [selectedOfferIds, setSelectedOfferIds] = (0, import_react.useState)(initialOfferIds ?? []);
	const [message, setMessage] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const colleaguesQ = useColleagues(myId);
	const sendMut = useSendGift();
	const dialogRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (open) {
			setMode(initialMode);
			setSelectedOfferIds(initialOfferIds ?? []);
			setAmount("");
			setMessage("");
			setRecipient(null);
			setSearch("");
		}
	}, [
		open,
		initialMode,
		initialOfferIds
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onKey(e) {
			if (e.key === "Escape") onClose();
		}
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	const colleagues = colleaguesQ.data ?? [];
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		if (!q) return colleagues;
		return colleagues.filter((c) => {
			const n = displayName(c).toLowerCase();
			const j = (c.job_title ?? "").toLowerCase();
			return n.includes(q) || j.includes(q);
		});
	}, [colleagues, search]);
	const numericAmount = Number(amount.replace(/\D/g, "")) || 0;
	const packageTotal = (0, import_react.useMemo)(() => offers.filter((o) => selectedOfferIds.includes(o.id)).reduce((s, o) => s + o.price_l, 0), [offers, selectedOfferIds]);
	const totalCost = mode === "points" ? numericAmount : packageTotal;
	const overBalance = totalCost > balance;
	const canSend = !!recipient && !sendMut.isPending && totalCost > 0 && !overBalance && (mode === "points" || selectedOfferIds.length > 0);
	async function handleSend() {
		if (!recipient) return;
		try {
			await sendMut.mutateAsync({
				recipientId: recipient.id,
				type: mode,
				points: mode === "points" ? numericAmount : void 0,
				offerIds: mode === "package" ? selectedOfferIds : void 0,
				message: message.trim()
			});
			burstCoins();
			const name = displayName(recipient);
			const msg = mode === "points" ? g.successPoints.replace("{n}", formatNumber(numericAmount)).replace("{name}", name) : g.successPackage.replace("{name}", name);
			toast.success(msg);
			onClose();
		} catch (err) {
			toast.error(err?.message ?? "Error");
		}
	}
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-end justify-center bg-ink/45 backdrop-blur-sm sm:items-center",
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: dialogRef,
			className: "paper-card relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-paper p-6 shadow-2xl animate-scale-in sm:rounded-2xl sm:p-8",
			role: "dialog",
			"aria-modal": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					"aria-label": "Close",
					className: "absolute right-4 top-4 grid size-9 place-items-center rounded-full text-ink/55 hover:bg-parchment hover:text-ink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-brand",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
									className: "size-3.5",
									"aria-hidden": true
								}),
								" ",
								g.cta
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-3xl font-medium tracking-tight",
							children: g.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-ink/65",
							children: g.subtitle
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex rounded-full border border-[var(--hairline)] bg-parchment p-1 text-sm font-medium",
					children: ["points", "package"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setMode(m),
						className: `btn-press rounded-full px-4 py-1.5 transition ${mode === m ? "bg-ink text-parchment" : "text-ink/65 hover:text-ink"}`,
						children: m === "points" ? g.tabPoints : g.tabPackage
					}, m))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-medium uppercase tracking-wider text-ink/55",
						children: g.pickColleague
					}), recipient ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between rounded-2xl border border-copper/40 bg-copper-light/40 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { c: recipient }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: displayName(recipient)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-ink/60",
								children: recipient.job_title ?? recipient.department ?? ""
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setRecipient(null),
							className: "text-xs font-medium text-ink/65 hover:text-ink underline",
							children: g.cancel
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: g.searchColleague,
						className: "mt-2 w-full rounded-full border border-[var(--hairline)] bg-parchment px-4 py-2 text-sm outline-none focus:border-ink/50"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 max-h-48 overflow-y-auto rounded-2xl border border-[var(--hairline)] bg-parchment",
						children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 text-sm text-ink/55",
							children: g.noColleagues
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y divide-[var(--hairline)]",
							children: filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setRecipient(c),
								className: "flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-paper",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { c }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-medium",
										children: displayName(c)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-ink/55",
										children: c.job_title ?? c.department ?? ""
									})]
								})]
							}) }, c.id))
						})
					})] })]
				}),
				mode === "points" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-5 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium uppercase tracking-wider text-ink/55",
								children: g.amount
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-ink/55",
								children: [
									g.balanceLabel,
									": ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono-num text-ink",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: balance })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "numeric",
							value: amount,
							onChange: (e) => setAmount(e.target.value.replace(/[^\d]/g, "")),
							placeholder: g.amountPlaceholder,
							className: `w-full rounded-2xl border bg-parchment px-4 py-3 font-mono-num text-2xl outline-none ${overBalance ? "border-red-500" : "border-[var(--hairline)] focus:border-ink/50"}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-wider text-ink/55",
								children: g.quickAmounts
							}), [
								500,
								1e3,
								2e3,
								5e3
							].map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setAmount(String(q)),
								disabled: q > balance,
								className: "btn-press rounded-full border border-[var(--hairline)] bg-paper px-3 py-1 font-mono-num text-xs disabled:opacity-40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: q })
							}, q))]
						}),
						overBalance && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-red-600",
							children: g.insufficient
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium uppercase tracking-wider text-ink/55",
								children: g.pickPackage
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-ink/55",
								children: [
									g.balanceLabel,
									": ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono-num text-ink",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: balance })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 max-h-56 overflow-y-auto rounded-2xl border border-[var(--hairline)] bg-parchment p-2",
							children: offers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-3 text-sm text-ink/55",
								children: g.noPackages
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-1",
								children: offers.map((o) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setSelectedOfferIds((curr) => curr.includes(o.id) ? curr.filter((x) => x !== o.id) : [...curr, o.id]),
										className: `flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition ${selectedOfferIds.includes(o.id) ? "bg-copper-light/60" : "hover:bg-paper"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "truncate text-sm font-medium",
												children: locale === "sq" ? o.title_sq : o.title_en
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "truncate text-[11px] uppercase tracking-wider text-ink/55",
												children: o.category
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono-num text-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: o.price_l })
										})]
									}) }, o.id);
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center justify-between rounded-xl bg-parchment px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-ink/70",
								children: g.packageTotal
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-mono-num text-lg ${overBalance ? "text-red-600" : "text-ink"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: packageTotal })
							})]
						}),
						overBalance && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs font-medium text-red-600",
							children: g.insufficient
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-medium uppercase tracking-wider text-ink/55",
						children: g.message
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: message,
						onChange: (e) => setMessage(e.target.value.slice(0, 200)),
						placeholder: g.messagePlaceholder,
						rows: 2,
						className: "mt-2 w-full resize-none rounded-2xl border border-[var(--hairline)] bg-parchment px-4 py-3 text-sm outline-none focus:border-ink/50"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "sticky bottom-0 mt-6 flex items-center justify-end gap-2 bg-paper/95 pt-3 backdrop-blur",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "btn-press rounded-full border border-[var(--hairline)] bg-paper px-4 py-2 text-sm font-medium text-ink/75 hover:text-ink",
						children: g.cancel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleSend,
						disabled: !canSend,
						className: "btn-press inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment shadow-sm transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50",
						children: sendMut.isPending ? g.sending : g.send
					})]
				})
			]
		})
	});
}
function Avatar({ c }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-copper to-copper-dark font-display text-sm font-medium text-parchment shadow-sm",
		"aria-hidden": true,
		children: initials(c)
	});
}
function prefersReducedMotion() {
	return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}
function burstCoins() {
	if (prefersReducedMotion()) return;
	const defaults = {
		spread: 70,
		ticks: 90,
		gravity: 1.1,
		decay: .92,
		startVelocity: 35,
		colors: [
			"#FF7A33",
			"#E0A458",
			"#C75C3D",
			"#F5E6C8"
		],
		shapes: ["circle"],
		scalar: 1.1
	};
	confetti_module_default({
		...defaults,
		particleCount: 60,
		origin: {
			x: .5,
			y: .7
		}
	});
	setTimeout(() => confetti_module_default({
		...defaults,
		particleCount: 40,
		origin: {
			x: .2,
			y: .8
		}
	}), 120);
	setTimeout(() => confetti_module_default({
		...defaults,
		particleCount: 40,
		origin: {
			x: .8,
			y: .8
		}
	}), 220);
}
function GiftReveal({ myId, offerById, locale }) {
	const { t } = useLocale();
	const g = t.dashboard.employee.gifts;
	const transfersQ = useMyTransfers(myId);
	const claim = useClaimGift();
	const [dismissed, setDismissed] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const reveal = (0, import_react.useMemo)(() => {
		return (transfersQ.data ?? []).find((tr) => tr.recipient_id === myId && tr.status === "sent" && !dismissed.has(tr.id));
	}, [
		transfersQ.data,
		myId,
		dismissed
	]);
	(0, import_react.useEffect)(() => {
		if (!reveal) return;
		if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
		const id = setTimeout(() => {
			confetti_module_default({
				particleCount: 80,
				spread: 90,
				startVelocity: 40,
				gravity: 1.1,
				colors: [
					"#0E7C66",
					"#16A34A",
					"#D5EDE6",
					"#16171D"
				],
				origin: {
					x: .5,
					y: .5
				}
			});
		}, 150);
		return () => clearTimeout(id);
	}, [reveal?.id]);
	if (!reveal) return null;
	const senderName = displayName(reveal.sender);
	const packageNames = reveal.type === "points" ? "" : reveal.offer_ids.map((id) => {
		const o = offerById.get(id);
		return o ? locale === "sq" ? o.title_sq : o.title_en : null;
	}).filter(Boolean).join(" · ");
	async function handleClaim() {
		try {
			await claim.mutateAsync(reveal.id);
			setDismissed((s) => new Set(s).add(reveal.id));
		} catch {
			setDismissed((s) => new Set(s).add(reveal.id));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[110] flex items-center justify-center bg-ink/55 p-5 backdrop-blur-sm",
		onClick: (e) => {
			if (e.target === e.currentTarget) setDismissed((s) => new Set(s).add(reveal.id));
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "paper-card relative w-full max-w-md overflow-hidden rounded-3xl bg-paper p-8 text-center shadow-2xl animate-scale-in",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-light/70 via-transparent to-brand-soft" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-brand-foreground shadow-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
							className: "size-9",
							"aria-hidden": true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 text-[11px] uppercase tracking-[0.2em] text-brand",
						children: g.revealKicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 font-display text-3xl font-medium leading-tight tracking-tight",
						children: g.revealTitle.replace("{name}", senderName)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-center gap-3 rounded-2xl bg-parchment p-3",
						children: [reveal.sender && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-9 place-items-center rounded-full bg-ink font-display text-xs font-medium text-parchment",
							children: initials(reveal.sender)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-wider text-ink/55",
								children: g.from
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: senderName
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-mono-num text-lg text-ink",
						children: reveal.type === "points" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: reveal.points_amount }) : packageNames || "—"
					}),
					reveal.gift_message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 rounded-xl bg-brand-light/60 px-4 py-3 text-sm italic text-ink/80",
						children: [
							"“",
							reveal.gift_message,
							"”"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleClaim,
						disabled: claim.isPending,
						className: "btn-press mt-6 w-full rounded-full bg-ink px-6 py-3 text-base font-medium text-parchment shadow-sm hover:bg-ink/90 disabled:opacity-60",
						children: claim.isPending ? "…" : g.revealClaim
					})
				]
			})]
		})
	});
}
var ROTATE_MS = 3e4;
function VoucherModal({ open, onClose, selectionId, offerById, providerById }) {
	const { t, locale } = useLocale();
	const v = t.dashboard.employee.voucher;
	const vouchersQ = useVouchersForSelection(open ? selectionId : void 0);
	const vouchers = vouchersQ.data ?? [];
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		if (vouchers.length === 0) {
			setActiveId(null);
			return;
		}
		if (!activeId || !vouchers.some((x) => x.id === activeId)) setActiveId((vouchers.find((x) => x.status === "valid") ?? vouchers[0]).id);
	}, [
		open,
		vouchers,
		activeId
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open) return null;
	const active = vouchers.find((x) => x.id === activeId) ?? null;
	const isBundle = vouchers.length > 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[80] flex items-end justify-center bg-ink/55 backdrop-blur-sm sm:items-center",
		role: "dialog",
		"aria-modal": "true",
		onClick: onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "voucher-enter w-full max-w-[440px] max-h-[100dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl",
			onClick: (e) => e.stopPropagation(),
			children: vouchersQ.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-paper p-10 text-center text-ink/60",
				children: v.loadingToken
			}) : vouchers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-paper p-10 text-center text-ink/60",
				children: [v.loadError, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "rounded-full bg-ink px-4 py-2 text-sm text-parchment",
						children: v.close
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [isBundle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BundleSwitcher, {
				vouchers,
				activeId,
				onPick: setActiveId,
				providerById,
				offerById,
				locale,
				v
			}), active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoucherPass, {
				voucher: active,
				provider: providerById.get(active.provider_id),
				offer: offerById.get(active.offer_id),
				locale,
				v,
				onClose
			}, active.id)] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .voucher-enter { animation: voucherIn 320ms cubic-bezier(.2,.7,.2,1); }
        @keyframes voucherIn {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .qr-ring {
          position: absolute; inset: -6px;
          border-radius: 18px;
          background: conic-gradient(from 0deg, transparent 0%, color-mix(in oklab, var(--copper) 65%, transparent) 35%, transparent 70%);
          filter: blur(8px); opacity: .55;
          animation: qrRing 6s linear infinite;
          pointer-events: none;
        }
        @keyframes qrRing { to { transform: rotate(360deg); } }
        .qr-shimmer {
          position: absolute; inset: 0; border-radius: 12px;
          background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,.55) 50%, transparent 70%);
          background-size: 220% 100%;
          animation: qrShimmer 3.4s ease-in-out infinite;
          pointer-events: none; mix-blend-mode: overlay;
        }
        @keyframes qrShimmer { 0% { background-position: 120% 0; } 100% { background-position: -120% 0; } }
        @media (prefers-reduced-motion: reduce) {
          .voucher-enter { animation: none; }
          .qr-ring, .qr-shimmer { animation: none; }
        }
      ` })]
	});
}
function BundleSwitcher({ vouchers, activeId, onPick, providerById, offerById, locale, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hairline rounded-t-3xl bg-paper px-4 pb-2 pt-4 sm:rounded-t-3xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-1 pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] font-medium uppercase tracking-[0.18em] text-copper-dark",
				children: v.bundleHeading
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 text-xs text-ink/60",
				children: v.bundleNote
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mx-1 flex gap-2 overflow-x-auto px-1 pb-1",
			children: vouchers.map((vc) => {
				const prov = providerById.get(vc.provider_id);
				const offer = offerById.get(vc.offer_id);
				const title = offer ? locale === "sq" ? offer.title_sq : offer.title_en : prov?.business_name ?? "—";
				const isActive = vc.id === activeId;
				const dim = vc.status !== "valid";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onPick(vc.id),
					className: `btn-press flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${isActive ? "border-ink bg-ink text-parchment" : "border-[var(--hairline)] bg-paper text-ink/75 hover:text-ink"} ${dim && !isActive ? "opacity-60" : ""}`,
					"aria-pressed": isActive,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-block h-2 w-2 rounded-full",
						style: { background: prov?.brand_color ?? "var(--copper)" },
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "max-w-[160px] truncate",
						children: prov?.business_name ?? title
					})]
				}, vc.id);
			})
		})]
	});
}
function VoucherPass({ voucher, provider, offer, locale, v, onClose }) {
	const isValid = voucher.status === "valid" && new Date(voucher.expires_at).getTime() > Date.now();
	const isRedeemed = voucher.status === "redeemed";
	const isExpired = voucher.status === "expired" || !isRedeemed && new Date(voucher.expires_at).getTime() <= Date.now();
	const isCancelled = voucher.status === "cancelled";
	const [token, setToken] = (0, import_react.useState)(null);
	const [tokenErr, setTokenErr] = (0, import_react.useState)(false);
	const [qrDataUrl, setQrDataUrl] = (0, import_react.useState)(null);
	const mountedRef = (0, import_react.useRef)(true);
	const fetchToken = (0, import_react.useCallback)(async () => {
		try {
			const res = await fetchSignedToken(voucher.id);
			if (!mountedRef.current) return;
			if (res.ok && res.token) {
				setToken(res.token);
				setTokenErr(false);
			} else setTokenErr(true);
		} catch {
			if (mountedRef.current) setTokenErr(true);
		}
	}, [voucher.id]);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		if (!isValid) return;
		fetchToken();
		const id = window.setInterval(() => {
			fetchToken();
		}, ROTATE_MS);
		return () => {
			mountedRef.current = false;
			window.clearInterval(id);
		};
	}, [fetchToken, isValid]);
	(0, import_react.useEffect)(() => {
		if (!token) {
			setQrDataUrl(null);
			return;
		}
		let cancelled = false;
		import_lib.toDataURL(token, {
			errorCorrectionLevel: "M",
			margin: 1,
			width: 360,
			color: {
				dark: "#14151A",
				light: "#FFFDF8"
			}
		}).then((url) => {
			if (!cancelled) setQrDataUrl(url);
		}).catch(() => {
			if (!cancelled) setTokenErr(true);
		});
		return () => {
			cancelled = true;
		};
	}, [token]);
	const offerTitle = offer ? locale === "sq" ? offer.title_sq : offer.title_en : "—";
	const providerName = provider?.business_name ?? "";
	const brandColor = provider?.brand_color ?? "#FF7A33";
	const tax = (0, import_react.useMemo)(() => computeTaxSavings(voucher.value_l), [voucher.value_l]);
	const expiryDate = new Date(voucher.expires_at).toLocaleDateString(locale === "sq" ? "sq-AL" : "en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
	const redeemedDate = voucher.redeemed_at ? new Date(voucher.redeemed_at).toLocaleDateString(locale === "sq" ? "sq-AL" : "en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	}) : null;
	const statusChip = isRedeemed ? {
		label: v.redeemed,
		klass: "bg-parchment text-ink/55"
	} : isExpired ? {
		label: v.expired,
		klass: "bg-clay/10 text-clay"
	} : isCancelled ? {
		label: v.cancelled,
		klass: "bg-clay/10 text-clay"
	} : {
		label: v.valid,
		klass: "bg-sage/15 text-sage"
	};
	const copyCode = (0, import_react.useCallback)(async () => {
		try {
			await navigator.clipboard.writeText(voucher.code);
			toast.success(v.copied);
		} catch {}
	}, [voucher.code, v.copied]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "relative rounded-3xl shadow-[0_24px_60px_-30px_rgba(20,21,26,0.45)]",
		style: {
			background: "var(--paper)",
			WebkitMaskImage: "radial-gradient(circle 10px at 0 50%, transparent 99%, #000 100%), radial-gradient(circle 10px at 100% 50%, transparent 99%, #000 100%)",
			maskImage: "radial-gradient(circle 10px at 0 50%, transparent 99%, #000 100%), radial-gradient(circle 10px at 100% 50%, transparent 99%, #000 100%)",
			WebkitMaskComposite: "source-in",
			maskComposite: "intersect"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3 rounded-t-3xl px-5 py-4",
				style: { background: `color-mix(in oklab, ${brandColor} 14%, var(--paper))` },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderMark, {
						name: providerName || "—",
						logoUrl: provider?.logo_url,
						brandColor,
						size: "md"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-xs font-medium uppercase tracking-[0.14em] text-ink/65",
							children: providerName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate font-display text-lg font-medium tracking-tight",
							children: offerTitle
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${statusChip.klass}`,
					children: statusChip.label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-5 my-1 border-t border-dashed border-[var(--hairline)]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-5 pb-5 pt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex w-fit flex-col items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [isValid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "qr-ring",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative rounded-xl bg-paper p-3 shadow-[0_2px_0_rgba(20,21,26,0.04)] ring-1 ring-[var(--hairline)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative h-[240px] w-[240px] overflow-hidden rounded-md",
									children: qrDataUrl && isValid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: qrDataUrl,
										alt: `QR ${voucher.code}`,
										width: 240,
										height: 240,
										className: "block h-[240px] w-[240px]"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "qr-shimmer",
										"aria-hidden": true
									})] }) : isValid && !tokenErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-full w-full place-items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-block h-6 w-6 animate-spin rounded-full border-2 border-ink/15 border-t-ink/60",
											"aria-label": v.loadingToken
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-full w-full place-items-center rounded-md bg-parchment text-center text-xs text-ink/55",
										children: tokenErr ? v.loadError : isRedeemed ? v.scanHintRedeemed : statusChip.label
									})
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 inline-flex items-center gap-1.5 rounded-full bg-parchment px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/65",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "10",
									height: "10",
									viewBox: "0 0 24 24",
									fill: "none",
									"aria-hidden": true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z",
										stroke: "currentColor",
										strokeWidth: "2",
										strokeLinejoin: "round"
									})
								}),
								v.secureBadge,
								isValid && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1 text-ink/40",
									children: ["· ", v.rotating]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-medium uppercase tracking-[0.18em] text-ink/55",
							children: v.codeHint
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: copyCode,
							className: "btn-press mt-1 inline-flex items-center gap-2 rounded-lg bg-parchment px-3 py-1.5 font-mono-num text-base tracking-[0.08em] text-ink hover:bg-[color-mix(in_oklab,var(--ink)_5%,var(--parchment))]",
							title: v.copyCode,
							children: [voucher.code, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "13",
								height: "13",
								viewBox: "0 0 24 24",
								fill: "none",
								"aria-hidden": true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "8",
									y: "8",
									width: "12",
									height: "12",
									rx: "2",
									stroke: "currentColor",
									strokeWidth: "2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2",
									stroke: "currentColor",
									strokeWidth: "2"
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid grid-cols-2 gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-parchment px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-medium uppercase tracking-[0.16em] text-ink/55",
								children: v.valueLabel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 font-mono-num text-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: voucher.value_l })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-parchment px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-medium uppercase tracking-[0.16em] text-copper-dark",
								children: v.taxFreeLabel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 font-mono-num text-lg text-copper-dark",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, {
									prefix: "+",
									value: tax.difference
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 text-center text-xs text-ink/60",
						children: isRedeemed && redeemedDate ? v.redeemedOn.replace("{date}", redeemedDate) : v.expiresOn.replace("{date}", expiryDate)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-center text-[11px] leading-relaxed text-ink/55",
						children: isRedeemed ? v.scanHintRedeemed : isValid ? v.scanHint : statusChip.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "btn-press w-full rounded-full border border-[var(--hairline)] bg-paper px-4 py-2.5 text-sm font-medium text-ink/75 hover:text-ink",
							children: v.close
						})
					})
				]
			})
		]
	});
}
function EmployeeDashboard() {
	const { t, locale } = useLocale();
	const e = t.dashboard.employee;
	const { data: profile, isLoading: profileLoading } = useProfile();
	const userId = profile?.id;
	const offersQ = useOffers();
	const providersQ = useProviders();
	const pointsQ = useMyPoints(userId);
	const selectionsQ = useMySelections(userId);
	const companyQ = useMyCompany(void 0);
	const qc = useQueryClient();
	const [tab, setTab] = (0, import_react.useState)("feed");
	const [cart, setCart] = (0, import_react.useState)([]);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [wrappedOpen, setWrappedOpen] = (0, import_react.useState)(false);
	const [detail, setDetail] = (0, import_react.useState)(null);
	const openDetails = (0, import_react.useCallback)((offers, bundleTitle) => {
		setDetail({
			offers,
			bundleTitle
		});
	}, []);
	const [giftOpen, setGiftOpen] = (0, import_react.useState)(false);
	const [giftInitial, setGiftInitial] = (0, import_react.useState)({ mode: "points" });
	const openGift = (0, import_react.useCallback)((init) => {
		setGiftInitial(init ?? { mode: "points" });
		setGiftOpen(true);
	}, []);
	const [voucherSelectionId, setVoucherSelectionId] = (0, import_react.useState)(null);
	const openVoucher = (0, import_react.useCallback)((selectionId) => setVoucherSelectionId(selectionId), []);
	const handleStreakIncrease = (0, import_react.useCallback)((next, _prev) => {
		burstConfetti();
		toast.success(e.streakUp, { description: e.streakUpBody });
	}, [e.streakUp, e.streakUpBody]);
	useStreakOnOpen(profile ?? null, handleStreakIncrease);
	const providerById = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		(providersQ.data ?? []).forEach((p) => m.set(p.id, p));
		return m;
	}, [providersQ.data]);
	const offerById = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		(offersQ.data ?? []).forEach((o) => m.set(o.id, o));
		return m;
	}, [offersQ.data]);
	function addToCart(o) {
		setCart((c) => c.some((x) => x.id === o.id) ? c : [...c, o]);
		toast.success(e.added);
	}
	function removeFromCart(id) {
		setCart((c) => c.filter((x) => x.id !== id));
	}
	function addBundle(items) {
		setCart((c) => {
			const ids = new Set(c.map((x) => x.id));
			const merged = [...c];
			items.forEach((o) => {
				if (!ids.has(o.id)) merged.push(o);
			});
			return merged;
		});
		toast.success(e.added);
	}
	const cartTotal = cart.reduce((s, o) => s + o.price_l, 0);
	async function submitSelection() {
		if (!userId || cart.length === 0) return;
		if (cartTotal <= 0) return;
		const available = pointsQ.data?.available ?? 0;
		if (cartTotal > available) {
			toast.error(locale === "sq" ? `Bilanci i disponueshëm nuk mjafton (ke ${formatNumber(available)}, duhen ${formatNumber(cartTotal)}).` : `Insufficient available balance (you have ${formatNumber(available)}, need ${formatNumber(cartTotal)}).`);
			return;
		}
		setSubmitting(true);
		const { data: result, error } = await supabase.rpc("submit_selection", {
			_offer_ids: cart.map((o) => o.id),
			_total: cartTotal
		});
		setSubmitting(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		if (result?.status === "insufficient_balance") {
			toast.error(locale === "sq" ? `Bilanci i disponueshëm nuk mjafton (${result.available} nga ${result.required}).` : `Insufficient available balance (${result.available} of ${result.required}).`);
			qc.invalidateQueries({ queryKey: ["points", userId] });
			return;
		}
		burstConfetti();
		toast.success(e.submitted);
		setCart([]);
		qc.invalidateQueries({ queryKey: ["selections"] });
		qc.invalidateQueries({ queryKey: ["points", userId] });
	}
	const firstName = (profile?.full_name ?? profile?.email ?? "").split(/\s+/)[0] || "";
	const interests = profile?.interests ?? [];
	const allOffers = offersQ.data ?? [];
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setNow(Date.now()), 6e4);
		return () => clearInterval(id);
	}, []);
	const drops = (0, import_react.useMemo)(() => {
		return allOffers.slice(0, 3).map((o) => ({
			offer: o,
			endsAt: computeDropEnd(o.id, now)
		}));
	}, [allOffers, now]);
	const forYou = (0, import_react.useMemo)(() => {
		if (interests.length === 0) return allOffers.slice(0, 6);
		const matched = allOffers.filter((o) => interests.includes(o.category));
		if (matched.length >= 3) return matched.slice(0, 6);
		const rest = allOffers.filter((o) => !matched.includes(o));
		return [...matched, ...rest].slice(0, 6);
	}, [allOffers, interests]);
	const bundles = (0, import_react.useMemo)(() => buildBundles(allOffers, t), [allOffers, t]);
	const streakWeeks = profile?.streak_count ?? 0;
	const challenge = (0, import_react.useMemo)(() => {
		const weekStart = startOfWeek(new Date(now)).getTime();
		const mine = (selectionsQ.data ?? []).filter((s) => new Date(s.created_at).getTime() >= weekStart).length;
		return {
			value: Math.min(20, mine + 7),
			goal: 20
		};
	}, [selectionsQ.data, now]);
	const categories = (0, import_react.useMemo)(() => {
		const s = /* @__PURE__ */ new Set();
		allOffers.forEach((o) => s.add(o.category));
		return Array.from(s);
	}, [allOffers]);
	const [category, setCategory] = (0, import_react.useState)("all");
	const [providerFilter, setProviderFilter] = (0, import_react.useState)(null);
	const filteredMarket = (0, import_react.useMemo)(() => {
		let list = allOffers;
		if (providerFilter) list = list.filter((o) => o.provider_id === providerFilter.id);
		if (category !== "all") list = list.filter((o) => o.category === category);
		return list;
	}, [
		allOffers,
		category,
		providerFilter
	]);
	(0, import_react.useEffect)(() => {
		const onView = (ev) => {
			const detail = ev.detail;
			if (!detail?.providerId) return;
			setProviderFilter({
				id: detail.providerId,
				name: detail.providerName
			});
			setCategory("all");
			setTab("market");
		};
		window.addEventListener("perx:view-provider", onView);
		return () => window.removeEventListener("perx:view-provider", onView);
	}, []);
	const monthlyAllowance = companyQ.data?.monthly_budget_per_employee_lek ?? 3e4;
	const spentThisCycle = (selectionsQ.data ?? []).filter((s) => s.status === "paid" || s.status === "approved").reduce((sum, s) => sum + s.total_l, 0);
	Math.min(100, spentThisCycle / monthlyAllowance * 100);
	const isLoading = profileLoading || offersQ.isLoading || providersQ.isLoading;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen overflow-x-clip bg-parchment text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
				balance: pointsQ.data?.available ?? 0,
				held: pointsQ.data?.held ?? 0,
				spent: spentThisCycle,
				allowance: monthlyAllowance,
				loading: pointsQ.isLoading,
				onGift: () => openGift({ mode: "points" }),
				locale
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-7xl px-5 pb-40 pt-8 sm:px-8 sm:pt-12",
				children: [
					userId && profile && !profile.company_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JoinCompanyBanner, { userId }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
						tab,
						setTab,
						labels: e.tabs
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid min-w-0 grid-cols-1 gap-10 [&>*]:min-w-0",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonGrid, {}) : tab === "feed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedView, {
							firstName,
							streakWeeks,
							drops,
							forYou,
							providerById,
							onAdd: addToCart,
							onOpenDetails: openDetails,
							onOpenWrapped: () => setWrappedOpen(true),
							challenge,
							now,
							locale,
							t
						}) }) : tab === "market" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketView, {
							offers: filteredMarket,
							providerById,
							categories,
							category,
							setCategory,
							providerFilter,
							onClearProviderFilter: () => setProviderFilter(null),
							bundles,
							onAdd: addToCart,
							onAddBundle: addBundle,
							onOpenDetails: openDetails,
							locale,
							t
						}) : tab === "map" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapView, { t }) : tab === "savings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsView, {
							cartTotal,
							t
						}) : tab === "gifts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftsView, {
							myId: userId,
							offerById,
							locale,
							t,
							onOpenGift: openGift
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MyBenefitsView, {
							selections: selectionsQ.data ?? [],
							offerById,
							locale,
							t,
							onGift: (offerIds) => openGift({
								mode: "package",
								offerIds
							}),
							onShowVoucher: openVoucher
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartBar, {
				cart,
				total: cartTotal,
				balance: pointsQ.data?.available ?? 0,
				submitting,
				onSubmit: submitSelection,
				onRemove: removeFromCart,
				onViewSavings: () => setTab("savings"),
				locale,
				t
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearInBenefits, {
				open: wrappedOpen,
				onClose: () => setWrappedOpen(false),
				selections: selectionsQ.data ?? [],
				offerById,
				streakCount: streakWeeks,
				fullName: profile?.full_name ?? null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferDetailModal, {
				open: !!detail,
				onClose: () => setDetail(null),
				offers: detail?.offers ?? [],
				bundleTitle: detail?.bundleTitle,
				providerById,
				pointsBalance: pointsQ.data?.balance ?? 0,
				onAdd: (items) => items.length > 1 ? addBundle(items) : items[0] && addToCart(items[0])
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftModal, {
				open: giftOpen,
				onClose: () => setGiftOpen(false),
				myId: userId,
				balance: pointsQ.data?.balance ?? 0,
				offers: allOffers,
				initialMode: giftInitial.mode,
				initialOfferIds: giftInitial.offerIds,
				locale
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftReveal, {
				myId: userId,
				offerById,
				locale
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConciergeLauncher, {
				offers: allOffers,
				profile,
				balance: pointsQ.data?.balance ?? 0,
				selections: selectionsQ.data ?? [],
				locale,
				onAddBundle: addBundle,
				onOpenDetails: openDetails
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoucherModal, {
				open: !!voucherSelectionId,
				onClose: () => setVoucherSelectionId(null),
				selectionId: voucherSelectionId ?? void 0,
				offerById,
				providerById
			})
		]
	});
}
function TopBar({ balance, held, spent, allowance, loading, onGift, locale }) {
	const { t } = useLocale();
	const e = t.dashboard.employee;
	const qc = useQueryClient();
	const pct = Math.min(100, spent / Math.max(1, allowance) * 100);
	async function handleSignOut() {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		window.location.href = "/auth";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-[var(--hairline)] bg-parchment/85 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 py-4 sm:px-8 sm:py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "font-display text-2xl font-medium tracking-tight",
						children: ["PERX", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-copper",
							children: "."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-2 sm:justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center font-mono-num text-lg sm:text-xl text-ink",
									children: [loading ? "…" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
										value: balance,
										pulseOnChange: true,
										format: (n) => formatNumber(n)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, { className: "ml-[0.3em] h-[0.95em] w-[0.95em]" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-xs uppercase tracking-[0.14em] text-ink/55 sm:inline",
									children: locale === "sq" ? "Të disponueshme" : "Available"
								})]
							}),
							held > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-0.5 flex items-center justify-end gap-1 text-[11px] text-copper-dark sm:justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "uppercase tracking-[0.14em]",
									children: [locale === "sq" ? "Në pritje" : "On hold", ":"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono-num inline-flex items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
										value: held,
										format: (n) => formatNumber(n)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, { className: "ml-[0.25em] h-[0.85em] w-[0.85em]" })]
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 hidden sm:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, { pct }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex justify-between text-[11px] text-ink/55",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										e.progressLabel,
										": ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono-num",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: spent })
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										e.progressOf,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono-num",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: allowance })
										})
									] })]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: onGift,
								className: "btn-press inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-sm font-medium text-brand-foreground shadow-sm transition hover:bg-brand-dark",
								title: e.gifts.cta,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
									className: "size-4",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: e.gifts.cta
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangPill, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleSignOut,
								className: "btn-press hidden rounded-full border border-[var(--hairline)] bg-paper px-3.5 py-1.5 text-sm font-medium text-ink/80 hover:text-ink sm:inline-flex",
								children: t.dashboard.signOut
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 sm:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, { pct })
			})]
		})
	});
}
function ProgressBar({ pct }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 w-full overflow-hidden rounded-full bg-copper-light/70",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-gradient-to-r from-copper to-copper-dark transition-[width] duration-500",
			style: { width: `${pct}%` }
		})
	});
}
function LangPill() {
	const { locale, setLocale } = useLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "inline-flex items-center rounded-full border border-[var(--hairline)] bg-paper p-0.5 text-xs font-medium",
		children: ["sq", "en"].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setLocale(l),
			className: `btn-press rounded-full px-2.5 py-1 uppercase tracking-wider transition ${locale === l ? "bg-ink text-parchment" : "text-ink/60 hover:text-ink"}`,
			children: l
		}, l))
	});
}
function Tabs({ tab, setTab, labels }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "inline-flex w-full overflow-x-auto rounded-full border border-[var(--hairline)] bg-paper p-1 text-sm font-medium sm:w-auto",
		children: [
			{
				id: "feed",
				label: labels.feed
			},
			{
				id: "market",
				label: labels.market
			},
			{
				id: "map",
				label: labels.map
			},
			{
				id: "savings",
				label: labels.savings
			},
			{
				id: "mine",
				label: labels.mine
			},
			{
				id: "gifts",
				label: labels.gifts
			}
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setTab(i.id),
			className: `btn-press whitespace-nowrap rounded-full px-4 py-2 transition ${tab === i.id ? "bg-ink text-parchment" : "text-ink/65 hover:text-ink"}`,
			children: i.label
		}, i.id))
	});
}
function MapView({ t }) {
	const m = t.dashboard.employee.map;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs font-medium uppercase tracking-[0.16em] text-copper-dark",
			children: m.hint
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-1 font-display text-2xl font-medium tracking-tight sm:text-3xl",
			children: m.title
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerxMap, {})]
	});
}
function FeedView({ firstName, streakWeeks, drops, forYou, providerById, onAdd, onOpenDetails, onOpenWrapped, challenge, now, locale, t }) {
	const e = t.dashboard.employee;
	const challengePct = Math.min(100, challenge.value / challenge.goal * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid gap-4 lg:grid-cols-[1.6fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hairline rounded-3xl bg-paper p-7 sm:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-copper-dark",
						children: "PERX"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl",
						children: e.welcome.replace("{name}", firstName || (locale === "sq" ? "mik" : "friend"))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-base text-ink/65",
						children: locale === "sq" ? "Sot ke zgjedhje të reja për të bërë. Le t'i shohim." : "Fresh picks are waiting. Let's take a look."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onOpenWrapped,
						className: "btn-press mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-gradient-to-r from-ink to-copper-dark px-4 py-2 text-sm font-medium text-parchment hover:opacity-95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkIcon, { className: "size-3.5" }), e.wrappedCta]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: onOpenWrapped,
				className: "hairline group relative overflow-hidden rounded-3xl bg-gradient-to-br from-copper-light via-paper to-paper p-7 text-left sm:p-8",
				"aria-label": e.wrappedCta,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrophyIcon, { className: "absolute -right-3 -top-3 size-28 text-copper/15 transition-transform group-hover:scale-105" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-copper-dark",
						children: e.streak
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 font-mono-num text-5xl text-ink",
						children: streakWeeks
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-sm text-ink/70",
						children: e.streakWeeks.replace("{n}", String(streakWeeks))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 text-xs text-ink/55",
						children: e.streakHint
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hairline rounded-2xl bg-paper p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium uppercase tracking-[0.14em] text-copper-dark",
						children: e.challengeHint
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 font-display text-lg font-medium tracking-tight sm:text-xl",
						children: e.challengeTitle
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono-num text-sm text-ink/70",
						children: [
							challenge.value,
							"/",
							challenge.goal
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 h-2 w-full overflow-hidden rounded-full bg-copper-light/70",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-gradient-to-r from-sage to-copper transition-[width] duration-700",
						style: { width: `${challengePct}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-ink/55",
					children: e.challengeProgress.replace("{n}", String(challenge.value)).replace("{goal}", String(challenge.goal))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			title: e.drops,
			hint: e.dropsHint
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8",
			children: drops.map(({ offer, endsAt }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropCard, {
				offer,
				endsAt,
				now,
				provider: providerById.get(offer.provider_id),
				onAdd: () => onAdd(offer),
				onOpenDetails: () => onOpenDetails([offer]),
				locale,
				t
			}, offer.id))
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			title: e.forYou,
			hint: e.forYouHint
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "stagger-rise grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: forYou.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, {
				offer: o,
				provider: providerById.get(o.provider_id),
				onAdd: () => onAdd(o),
				onOpenDetails: () => onOpenDetails([o]),
				locale,
				t
			}, o.id))
		})] })
	] });
}
function SectionHead({ title, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex items-baseline justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl font-medium tracking-tight sm:text-3xl",
			children: title
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-ink/55",
			children: hint
		}) : null]
	});
}
function DropCard({ offer, endsAt, now, provider, onAdd, onOpenDetails, locale, t }) {
	const e = t.dashboard.employee;
	const msLeft = endsAt.getTime() - now;
	const label = msLeft <= 0 ? e.dropEndedJustNow : e.dropEndsIn.replace("{t}", formatDuration(msLeft, locale));
	const detailsLabel = locale === "sq" ? "Shiko detajet" : "View details";
	const providerName = provider?.business_name ?? "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-lift relative flex w-[78vw] max-w-[320px] shrink-0 snap-start flex-col rounded-2xl border border-copper-light bg-gradient-to-br from-copper-light/60 via-paper to-paper p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-copper-dark px-2.5 py-1 font-mono-num text-[11px] font-medium tabular-nums text-parchment",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkIcon, { className: "size-3" }), label]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-wide text-copper-dark",
				children: t.categories[offer.category] ?? offer.category
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 font-display text-xl leading-tight",
				children: locale === "sq" ? offer.title_sq : offer.title_en
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderMark, {
					name: providerName,
					logoUrl: provider?.logo_url,
					brandColor: provider?.brand_color,
					size: "xs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-ink/60",
					children: providerName
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono-num text-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: offer.price_l })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onAdd,
						className: "btn-press inline-flex items-center justify-center rounded-full bg-copper px-3.5 py-1.5 text-sm font-medium text-parchment hover:bg-copper-dark",
						children: e.add
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onOpenDetails,
					className: "btn-press mt-2 w-full rounded-full border border-[var(--hairline)] bg-paper/70 px-3 py-1.5 text-xs font-medium text-ink/70 hover:text-ink",
					children: detailsLabel
				})]
			})
		]
	});
}
function OfferCard({ offer, provider, onAdd, onOpenDetails, locale, t }) {
	const e = t.dashboard.employee;
	const detailsLabel = locale === "sq" ? "Shiko detajet" : "View details";
	const providerName = provider?.business_name ?? "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-lift hairline flex flex-col rounded-2xl bg-paper p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-xs uppercase tracking-wide text-ink/55",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.categories[offer.category] ?? offer.category }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono-num text-ink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: offer.price_l })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-display text-lg leading-tight",
				children: locale === "sq" ? offer.title_sq : offer.title_en
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderMark, {
					name: providerName,
					logoUrl: provider?.logo_url,
					brandColor: provider?.brand_color,
					size: "xs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-ink/60",
					children: providerName
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 line-clamp-2 text-sm text-ink/70",
				children: locale === "sq" ? offer.description_sq : offer.description_en
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-1.5",
				children: offer.mood.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-copper-light px-2 py-0.5 text-[11px] font-medium text-copper-dark",
					children: t.moods[m] ?? m
				}, m))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onOpenDetails,
					className: "btn-press flex-1 rounded-full border border-[var(--hairline)] bg-parchment px-3 py-2 text-sm font-medium text-ink/75 hover:text-ink",
					children: detailsLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onAdd,
					className: "btn-press inline-flex items-center justify-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-parchment hover:bg-ink/90",
					children: e.add
				})]
			})
		]
	});
}
function MarketView({ offers, providerById, categories, category, setCategory, providerFilter, onClearProviderFilter, bundles, onAdd, onAddBundle, onOpenDetails, locale, t }) {
	const e = t.dashboard.employee;
	const provider = providerFilter ? providerById.get(providerFilter.id) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!providerFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
		title: e.bundles,
		hint: e.bundlesHint
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 md:grid-cols-3",
		children: bundles.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BundleCard, {
			bundle: b,
			providerById,
			onAdd: () => onAddBundle(b.items),
			onOpenDetails: () => onOpenDetails(b.items, {
				sq: b.title_sq,
				en: b.title_en
			}),
			locale,
			t
		}, b.key))
	})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			title: e.browse,
			hint: e.browseHint
		}),
		providerFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex items-center gap-3 rounded-2xl border border-[var(--hairline)] bg-paper p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderMark, {
					name: providerFilter.name,
					logoUrl: provider?.logo_url,
					brandColor: provider?.brand_color,
					size: "md",
					className: "!size-10 !rounded-xl"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.14em] text-ink/55",
						children: e.map.usableHere
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate font-display text-base",
						children: providerFilter.name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onClearProviderFilter,
					className: "btn-press rounded-full border border-[var(--hairline)] bg-parchment px-3 py-1.5 text-xs font-medium text-ink/70 hover:text-ink",
					children: ["✕ ", e.filterAll]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				active: category === "all",
				onClick: () => setCategory("all"),
				label: e.filterAll
			}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				active: category === c,
				onClick: () => setCategory(category === c ? "all" : c),
				label: t.categories[c] ?? c
			}, c))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "stagger-rise grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: offers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, {
				offer: o,
				provider: providerById.get(o.provider_id),
				onAdd: () => onAdd(o),
				onOpenDetails: () => onOpenDetails([o]),
				locale,
				t
			}, o.id))
		})
	] })] });
}
function Chip({ active, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		className: `btn-press rounded-full border px-3 py-1.5 text-xs font-medium transition ${active ? "border-ink bg-ink text-parchment" : "border-[var(--hairline)] bg-paper text-ink/70 hover:text-ink"}`,
		children: label
	});
}
function buildBundles(offers, t) {
	const pick = (cats) => {
		const items = [];
		for (const c of cats) {
			const o = offers.find((x) => x.category === c && !items.includes(x));
			if (o) items.push(o);
		}
		return items;
	};
	const make = (key, sq, en, cats) => {
		const items = pick(cats);
		if (items.length < 2) return null;
		const total = items.reduce((s, o) => s + o.price_l, 0);
		return {
			key,
			title_sq: sq,
			title_en: en,
			items,
			total,
			saving: Math.round(total * .1)
		};
	};
	return [
		make("wellweek", "Java e Mirëqenies", "Wellness week", [
			"fitness",
			"wellness",
			"food"
		]),
		make("focus", "Paketa e Fokusit", "Focus pack", [
			"learning",
			"telecom",
			"health"
		]),
		make("escape", "Arratisja e Fundjavës", "Weekend escape", [
			"travel",
			"food",
			"wellness"
		])
	].filter((b) => b !== null);
}
function BundleCard({ bundle, providerById, onAdd, onOpenDetails, locale, t }) {
	const e = t.dashboard.employee;
	const detailsLabel = locale === "sq" ? "Shiko detajet" : "View details";
	const bundleProviders = (() => {
		const seen = /* @__PURE__ */ new Set();
		const list = [];
		for (const o of bundle.items) {
			const p = providerById.get(o.provider_id);
			if (p && !seen.has(p.id)) {
				seen.add(p.id);
				list.push(p);
			}
		}
		return list;
	})();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-lift hairline flex flex-col rounded-2xl bg-gradient-to-br from-paper via-paper to-copper-light/40 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-copper-dark",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: e.bundles }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-sage/15 px-2 py-0.5 font-medium text-sage",
					children: e.bundleSave.replace("{n}", formatNumber(bundle.saving))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-display text-xl leading-tight",
				children: locale === "sq" ? bundle.title_sq : bundle.title_en
			}),
			bundleProviders.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex -space-x-1.5",
				children: bundleProviders.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderMark, {
					name: p.business_name,
					logoUrl: p.logo_url,
					brandColor: p.brand_color,
					size: "xs",
					className: "ring-1 ring-paper"
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1 text-sm text-ink/75",
				children: bundle.items.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "truncate",
						children: ["· ", locale === "sq" ? o.title_sq : o.title_en]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono-num text-xs text-ink/55",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: o.price_l })
					})]
				}, o.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono-num text-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: bundle.total })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onAdd,
						className: "btn-press inline-flex items-center justify-center rounded-full bg-copper px-4 py-2 text-sm font-medium text-parchment hover:bg-copper-dark",
						children: e.add
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onOpenDetails,
					className: "btn-press mt-2 w-full rounded-full border border-[var(--hairline)] bg-paper/70 px-3 py-1.5 text-xs font-medium text-ink/70 hover:text-ink",
					children: detailsLabel
				})]
			})
		]
	});
}
function SavingsView({ cartTotal, t }) {
	const e = t.dashboard.employee;
	const [value, setValue] = (0, import_react.useState)(cartTotal > 0 ? cartTotal : 6e4);
	(0, import_react.useEffect)(() => {
		if (cartTotal > 0) setValue(cartTotal);
	}, [cartTotal]);
	const bd = computeTaxSavings(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "hairline rounded-3xl bg-paper p-6 sm:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-medium uppercase tracking-[0.16em] text-copper-dark",
				children: e.savingsKicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl",
				children: e.savingsTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-ink/70",
				children: e.savingsBody
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hairline rounded-2xl bg-parchment p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.14em] text-ink/55",
							children: e.savingsAsSalary
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 inline-flex items-center font-mono-num text-3xl text-ink/85",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
								value: bd.raiseNet,
								format: (n) => formatNumber(n)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, { className: "ml-[0.25em]" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hairline rounded-2xl bg-parchment p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.14em] text-ink/55",
							children: e.savingsAsBenefit
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 inline-flex items-center font-mono-num text-3xl text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
								value: bd.benefitNet,
								format: (n) => formatNumber(n)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, { className: "ml-[0.25em]" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-gradient-to-br from-copper to-copper-dark p-5 text-parchment shadow-lg shadow-copper/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.14em] text-parchment/80",
							children: e.savingsKeepsMore
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 inline-flex items-center font-mono-num text-3xl",
							children: [
								"+",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
									value: bd.difference,
									pulseOnChange: true,
									format: (n) => formatNumber(n)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, { className: "ml-[0.25em]" })
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-4 rounded-2xl bg-parchment p-5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex w-full flex-col gap-2 sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-[0.14em] text-ink/55",
							children: e.savingsKicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 1e4,
							max: 3e5,
							step: 5e3,
							value,
							onChange: (ev) => setValue(Number(ev.target.value)),
							className: "accent-copper"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono-num text-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-4 text-xs text-ink/65 sm:text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "uppercase tracking-[0.12em] text-ink/45",
							children: e.savingsPit
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-mono-num text-base text-ink",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: bd.taxPaid })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "uppercase tracking-[0.12em] text-ink/45",
							children: e.savingsSocial
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-mono-num text-base text-ink",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: bd.socialPaid })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "uppercase tracking-[0.12em] text-ink/45",
							children: e.savingsEffective
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 font-mono-num text-base text-ink",
							children: [(bd.effectiveRate * 100).toFixed(1), "%"]
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-ink/50",
				children: e.savingsDisclaimer
			})
		]
	});
}
function MyBenefitsView({ selections, offerById, providerById, locale, t, onGift, onShowVoucher }) {
	const e = t.dashboard.employee;
	if (selections.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "hairline rounded-3xl bg-paper p-10 text-center text-ink/60",
		children: e.myBenefitsEmpty
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "hairline rounded-3xl bg-paper p-6 sm:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: e.myBenefits }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-[var(--hairline)]",
			children: selections.map((s) => {
				const first = offerById.get(s.offer_ids[0]);
				const title = first ? locale === "sq" ? first.title_sq : first.title_en : "—";
				const extra = s.offer_ids.length > 1 ? ` +${s.offer_ids.length - 1}` : "";
				const isPaid = s.status === "paid";
				const isPending = s.status === "pending";
				const isRejected = s.status === "rejected";
				const pillClass = isPaid ? "bg-sage/15 text-sage" : isPending ? "bg-copper-light text-copper-dark" : isRejected ? "bg-ink/5 text-ink/55" : "bg-parchment text-ink/65";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-4 sm:grid-cols-[minmax(0,2fr)_auto_auto_auto_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `truncate font-medium ${isRejected ? "text-ink/55 line-through" : ""}`,
								children: [title, extra]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-ink/55",
								children: [new Date(s.created_at).toLocaleDateString(locale === "sq" ? "sq-AL" : "en-GB"), isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 italic text-copper-dark",
									children: locale === "sq" ? "Në pritje · pikët të rezervuara" : "Pending · points on hold"
								}) : isRejected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 italic text-sage",
									children: locale === "sq" ? "Refuzuar · pikët u kthyen" : "Rejected · points returned"
								}) : null]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden font-mono-num text-sm sm:inline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: s.total_l })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `rounded-full px-2.5 py-1 text-xs font-medium ${pillClass}`,
							children: e.status[s.status]
						}),
						isPaid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onShowVoucher(s.id),
							className: "btn-press inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-parchment hover:bg-ink/90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "12",
								height: "12",
								viewBox: "0 0 24 24",
								fill: "none",
								"aria-hidden": true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "3",
									y: "5",
									width: "18",
									height: "14",
									rx: "2",
									stroke: "currentColor",
									strokeWidth: "2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M3 10h18M8 14h2M12 14h4",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round"
								})]
							}), e.voucher.showVoucher]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hidden sm:inline" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onGift(s.offer_ids),
							className: "btn-press hidden items-center gap-1.5 rounded-full border border-[var(--hairline)] bg-paper px-3 py-1 text-xs font-medium text-ink/70 hover:text-ink sm:inline-flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
									className: "size-3.5",
									"aria-hidden": true
								}),
								" ",
								e.gifts.cta
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "col-span-2 font-mono-num text-sm sm:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: s.total_l })
						})
					]
				}, s.id);
			})
		})]
	});
}
function GiftsView({ myId, offerById, locale, t, onOpenGift }) {
	const g = t.dashboard.employee.gifts;
	const all = useMyTransfers(myId).data ?? [];
	const sent = all.filter((tr) => tr.sender_id === myId);
	const received = all.filter((tr) => tr.recipient_id === myId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hairline flex flex-col items-start justify-between gap-4 rounded-3xl bg-paper p-6 sm:flex-row sm:items-center sm:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-brand-dark",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
							className: "size-3.5",
							"aria-hidden": true
						}),
						" ",
						g.cta
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl font-medium tracking-tight sm:text-3xl",
					children: g.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-ink/65",
					children: g.subtitle
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => onOpenGift({ mode: "points" }),
					className: "btn-press rounded-full bg-ink px-4 py-2 text-sm font-medium text-parchment hover:bg-ink/90",
					children: g.tabPoints
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => onOpenGift({ mode: "package" }),
					className: "btn-press rounded-full border border-[var(--hairline)] bg-paper px-4 py-2 text-sm font-medium text-ink hover:bg-parchment",
					children: g.tabPackage
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftList, {
				title: g.receivedTitle,
				empty: g.receivedEmpty,
				transfers: received,
				perspective: "received",
				offerById,
				locale,
				g
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftList, {
				title: g.sentTitle,
				empty: g.sentEmpty,
				transfers: sent,
				perspective: "sent",
				offerById,
				locale,
				g
			})]
		})]
	});
}
function GiftList({ title, empty, transfers, perspective, offerById, locale, g }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hairline rounded-3xl bg-paper p-6 sm:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title }), transfers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-6 text-center text-sm text-ink/55",
			children: empty
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-[var(--hairline)]",
			children: transfers.map((tr) => {
				const other = perspective === "sent" ? tr.recipient : tr.sender;
				const name = displayName(other);
				const packageNames = tr.type === "points" ? "" : tr.offer_ids.map((id) => {
					const o = offerById.get(id);
					return o ? locale === "sq" ? o.title_sq : o.title_en : null;
				}).filter(Boolean).join(" · ");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-3 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-copper to-copper-dark font-display text-xs font-medium text-parchment",
						children: initials(other)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-ink/55",
										children: perspective === "sent" ? g.to : g.from
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${tr.status === "claimed" ? "bg-sage/15 text-sage" : "bg-copper-light text-copper-dark"}`,
										children: tr.status === "claimed" ? g.statusClaimed : g.statusSent
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 font-mono-num text-base",
								children: tr.type === "points" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: tr.points_amount }) : packageNames || "—"
							}),
							tr.gift_message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm italic text-ink/70",
								children: [
									"“",
									tr.gift_message,
									"”"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[11px] text-ink/45",
								children: new Date(tr.created_at).toLocaleString(locale === "sq" ? "sq-AL" : "en-GB", {
									dateStyle: "medium",
									timeStyle: "short"
								})
							})
						]
					})]
				}, tr.id);
			})
		})]
	});
}
function CartBar({ cart, total, balance, submitting, onSubmit, onRemove, onViewSavings, locale, t }) {
	const e = t.dashboard.employee;
	const [open, setOpen] = (0, import_react.useState)(false);
	if (cart.length === 0) return null;
	const fits = total <= balance;
	const shortBy = Math.max(0, total - balance);
	const affordLabel = fits ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [locale === "sq" ? "Bilanci yt: " : "Your balance: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: balance })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		locale === "sq" ? "Të mungojnë " : "You need ",
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: shortBy }),
		locale === "sq" ? " (bilanci: " : " more (balance: ",
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: balance }),
		")"
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-x-0 bottom-16 z-50 flex justify-center px-4 sm:bottom-0 sm:pb-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-[var(--hairline)] bg-ink text-parchment shadow-2xl shadow-ink/20",
			children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-parchment/10 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: cart.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: locale === "sq" ? o.title_sq : o.title_en
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono-num",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: o.price_l })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => onRemove(o.id),
								className: "rounded-full px-2 py-0.5 text-xs text-parchment/60 hover:text-parchment",
								children: e.remove
							})]
						})]
					}, o.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onViewSavings,
					className: "mt-3 text-xs text-copper-light underline-offset-4 hover:underline",
					children: [e.savingsKicker, " →"]
				})]
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 sm:grid-cols-[auto_minmax(0,1fr)_auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen((v) => !v),
						className: "hidden items-center gap-2 rounded-full bg-parchment/10 px-3 py-1.5 text-xs font-medium text-parchment/80 hover:bg-parchment/15 sm:inline-flex",
						children: e.cartItems.replace("{n}", String(cart.length))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-[0.14em] text-parchment/55 sm:hidden",
								children: e.cartItems.replace("{n}", String(cart.length))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-[0.14em] text-parchment/55 sm:block",
								children: e.cartTotal
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono-num text-2xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: total })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mt-0.5 text-[11px] ${fits ? "text-parchment/55" : "text-copper-light"}`,
								children: affordLabel
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onSubmit,
						disabled: submitting || !fits,
						title: !fits ? locale === "sq" ? "Bilanci nuk mjafton" : "Insufficient balance" : void 0,
						className: "btn-press rounded-full bg-copper px-5 py-2.5 text-sm font-medium text-parchment hover:bg-copper-dark disabled:cursor-not-allowed disabled:opacity-60",
						children: submitting ? e.submitting : e.submit
					})
				]
			})]
		})
	});
}
function SkeletonGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline h-48 animate-pulse rounded-2xl bg-paper" }, i))
	});
}
function startOfWeek(d) {
	const x = new Date(d);
	x.setHours(0, 0, 0, 0);
	const day = x.getDay();
	const mondayOffset = day === 0 ? -6 : 1 - day;
	x.setDate(x.getDate() + mondayOffset);
	return x;
}
function hashString(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
/** Deterministic drop end: 6..72h from current week's Monday; rolls forward. */
function computeDropEnd(offerId, now) {
	const monday = startOfWeek(new Date(now));
	const hours = hashString(offerId) % 67 + 6;
	let end = new Date(monday.getTime() + hours * 36e5);
	while (end.getTime() <= now) end = new Date(end.getTime() + 7 * 864e5);
	return end;
}
function formatDuration(ms, locale) {
	const totalMin = Math.max(0, Math.floor(ms / 6e4));
	const hours = Math.floor(totalMin / 60);
	const mins = totalMin % 60;
	if (hours >= 24) {
		const days = Math.floor(hours / 24);
		const rem = hours % 24;
		return locale === "sq" ? `${days}d ${rem}h` : `${days}d ${rem}h`;
	}
	if (hours >= 1) return `${hours}h ${String(mins).padStart(2, "0")}m`;
	return `${mins}m`;
}
function burstConfetti() {
	confetti_module_default({
		particleCount: 90,
		spread: 70,
		startVelocity: 38,
		origin: { y: .85 },
		colors: [
			"#FF7A33",
			"#C7541A",
			"#FFE4D1",
			"#5F9C75"
		],
		scalar: .9,
		ticks: 160
	});
}
function SparkIcon({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "currentColor",
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2z" })
	});
}
function TrophyIcon({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		className,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M7 4h10v3a5 5 0 11-10 0V4z",
			stroke: "currentColor",
			strokeWidth: "1.6"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M5 6H3a3 3 0 003 3M19 6h2a3 3 0 01-3 3M9 17h6M10 21h4M12 13v4",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round"
		})]
	});
}
//#endregion
export { EmployeeDashboard as component };
