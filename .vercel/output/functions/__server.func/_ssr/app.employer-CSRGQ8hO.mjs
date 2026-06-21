import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-B5jeyOoH.mjs";
import { a as require_jsx_runtime, i as useQueryClient, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useProfile } from "./use-profile-B8Sn44Wb.mjs";
import { n as useLocale } from "./locale-context-CdT0mpu7.mjs";
import { a as formatNumber, c as useMyCompany, f as useOffers, i as formatLek, n as Lek, o as useCompanyEmployees, p as useProviders, s as useCompanySelections } from "./coin-icon-CXePSZH_.mjs";
import { n as teamDict } from "./team-i18n-DxlmE2PQ.mjs";
import { a as useEmployeePointsBalances, i as useCompanyJoinRequests, r as useCompanyInvitations, t as CountUp } from "./count-up-DWt1A2rK.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as Copy, c as Sparkles, d as Mail, i as UserPlus, n as Users, o as Trash2, t as X, v as Coins } from "../_libs/lucide-react.mjs";
import { t as confetti_module_default } from "../_libs/canvas-confetti.mjs";
import { t as clearCompanyBrand } from "./brand-theme-pUm_TY0c.mjs";
import { n as Card, r as Stat, t as AppShell } from "./app-shell-BUJ_cfjY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.employer-CSRGQ8hO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmployerTeamPanel({ company, annualWelfare }) {
	const { locale } = useLocale();
	const T = teamDict[locale];
	const qc = useQueryClient();
	const employeesQ = useCompanyEmployees(company.id);
	const employees = (0, import_react.useMemo)(() => employeesQ.data ?? [], [employeesQ.data]);
	const employeeIds = (0, import_react.useMemo)(() => employees.map((e) => e.id), [employees]);
	const selectionsQ = useCompanySelections(employeeIds);
	const balancesQ = useEmployeePointsBalances(employeeIds);
	const invitationsQ = useCompanyInvitations(company.id);
	const requestsQ = useCompanyJoinRequests(company.id);
	const last30Cutoff = (0, import_react.useMemo)(() => Date.now() - 720 * 60 * 60 * 1e3, []);
	const spendByEmployee = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		(selectionsQ.data ?? []).forEach((s) => {
			if (s.status !== "paid") return;
			if (new Date(s.created_at).getTime() < last30Cutoff) return;
			m.set(s.employee_id, (m.get(s.employee_id) ?? 0) + (s.total_l ?? 0));
		});
		return m;
	}, [selectionsQ.data, last30Cutoff]);
	const totalSpentLast30 = (0, import_react.useMemo)(() => Array.from(spendByEmployee.values()).reduce((a, b) => a + b, 0), [spendByEmployee]);
	const pendingRequests = (requestsQ.data ?? []).filter((r) => r.request.status === "pending");
	const pendingInvites = (invitationsQ.data ?? []).filter((i) => i.status === "pending");
	const [tab, setTab] = (0, import_react.useState)("employees");
	const refresh = () => {
		qc.invalidateQueries({ queryKey: ["companyEmployees", company.id] });
		qc.invalidateQueries({ queryKey: ["companyInvitations", company.id] });
		qc.invalidateQueries({ queryKey: ["companyJoinRequests", company.id] });
		qc.invalidateQueries({ queryKey: ["selections", "company"] });
		qc.invalidateQueries({ queryKey: ["pointsBalances"] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 sm:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: T.summary.activeEmployees,
				value: employees.length
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: T.summary.yearlyBudget,
				value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: annualWelfare })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: T.summary.spentLast30,
				value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: totalSpentLast30 })
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		title: T.sectionTitle,
		hint: T.sectionHint,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-5 flex flex-wrap items-center gap-1.5 rounded-full bg-parchment p-1 text-sm",
				children: [
					"employees",
					"requests",
					"invitations"
				].map((k) => {
					const active = tab === k;
					const badge = k === "requests" && pendingRequests.length ? pendingRequests.length : k === "invitations" && pendingInvites.length ? pendingInvites.length : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab(k),
						className: `btn-press inline-flex items-center gap-2 rounded-full px-4 py-1.5 transition-colors ${active ? "bg-paper text-ink shadow-sm" : "text-ink/60 hover:text-ink"}`,
						children: [T.tabs[k], badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-copper px-1.5 text-[11px] font-semibold text-white",
							children: badge
						}) : null]
					}, k);
				})
			}),
			tab === "employees" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeesTab, {
				employees,
				balances: balancesQ.data ?? /* @__PURE__ */ new Map(),
				spend: spendByEmployee,
				onChanged: refresh,
				onGoToInvite: () => setTab("invitations")
			}),
			tab === "requests" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestsTab, {
				data: requestsQ.data ?? [],
				onChanged: refresh
			}),
			tab === "invitations" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvitationsTab, {
				invitations: invitationsQ.data ?? [],
				companyId: company.id,
				onChanged: refresh
			})
		]
	})] });
}
function EmployeesTab({ employees, balances, spend, onChanged, onGoToInvite }) {
	const { locale } = useLocale();
	const T = teamDict[locale].employees;
	const [search, setSearch] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("spend");
	const [confirm, setConfirm] = (0, import_react.useState)(null);
	const [grantTarget, setGrantTarget] = (0, import_react.useState)(null);
	const [bulkOpen, setBulkOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const rows = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		let r = employees.filter((e) => {
			if (!q) return true;
			return (e.full_name ?? "").toLowerCase().includes(q) || (e.job_title ?? "").toLowerCase().includes(q) || (e.department ?? "").toLowerCase().includes(q);
		});
		r = r.slice().sort((a, b) => sort === "name" ? (a.full_name ?? "").localeCompare(b.full_name ?? "") : (spend.get(b.id) ?? 0) - (spend.get(a.id) ?? 0));
		return r;
	}, [
		employees,
		search,
		sort,
		spend
	]);
	async function handleRemove() {
		if (!confirm) return;
		setBusy(true);
		const { error } = await supabase.rpc("remove_employee", { _employee_id: confirm.id });
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(T.removed.replace("{name}", confirm.name));
		setConfirm(null);
		onChanged();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: T.searchPlaceholder,
						className: "min-w-[200px] flex-1 rounded-full border border-[var(--hairline)] bg-parchment px-4 py-2 text-sm outline-none focus:border-copper"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sort,
						onChange: (e) => setSort(e.target.value),
						className: "rounded-full border border-[var(--hairline)] bg-parchment px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "spend",
							children: T.sortSpend
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "name",
							children: T.sortName
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setBulkOpen(true),
						disabled: rows.length === 0,
						className: "btn-press ml-auto inline-flex items-center gap-1.5 rounded-full border border-copper bg-copper-light px-4 py-2 text-sm font-medium text-copper-dark hover:bg-copper hover:text-white disabled:opacity-50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 14 }),
							" ",
							T.bulkBtn
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onGoToInvite,
						className: "btn-press inline-flex items-center gap-1.5 rounded-full bg-copper px-4 py-2 text-sm font-medium text-white hover:bg-copper-dark",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 14 }),
							" ",
							T.addBtn
						]
					})
				]
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-sm text-ink/60",
				children: T.empty
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "min-w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-left text-xs uppercase tracking-wide text-ink/55",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-4",
								children: T.colName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-4",
								children: T.colRole
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-4 text-right",
								children: T.colBalance
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-4 text-right",
								children: T.colSpend
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-right",
								children: T.colActions
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-[var(--hairline)]",
						children: rows.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-4 font-medium",
								children: e.full_name || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-4 text-ink/70",
								children: e.job_title || e.department || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-4 text-right font-mono-num",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
									value: balances.get(e.id) ?? 0,
									pulseOnChange: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-4 text-right font-mono-num",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: spend.get(e.id) ?? 0 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setGrantTarget({
											id: e.id,
											name: e.full_name || "—"
										}),
										className: "btn-press inline-flex items-center gap-1 rounded-full bg-copper px-3 py-1 text-xs font-medium text-white hover:bg-copper-dark",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 12 }),
											" ",
											T.grant
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setConfirm({
											id: e.id,
											name: e.full_name || "—"
										}),
										className: "btn-press inline-flex items-center gap-1 rounded-full border border-[var(--hairline)] px-3 py-1 text-xs text-ink/70 hover:text-red-600",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 }),
											" ",
											T.remove
										]
									})]
								})
							})
						] }, e.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-ink/55",
				children: T.addHint
			}),
			confirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4",
				onClick: () => !busy && setConfirm(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: (e) => e.stopPropagation(),
					className: "hairline w-full max-w-md rounded-2xl bg-paper p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg",
							children: T.removeTitle.replace("{name}", confirm.name)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-ink/65",
							children: T.removeBody
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setConfirm(null),
								disabled: busy,
								className: "btn-press rounded-full border border-[var(--hairline)] px-4 py-2 text-sm",
								children: T.cancel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleRemove,
								disabled: busy,
								className: "btn-press rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60",
								children: T.confirmRemove
							})]
						})
					]
				})
			}) : null,
			grantTarget ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrantPointsModal, {
				employee: grantTarget,
				onClose: () => setGrantTarget(null),
				onGranted: () => {
					setGrantTarget(null);
					onChanged();
				}
			}) : null,
			bulkOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulkGrantPointsModal, {
				employees: rows.map((e) => ({
					id: e.id,
					name: e.full_name || "—"
				})),
				onClose: () => setBulkOpen(false),
				onDone: () => {
					setBulkOpen(false);
					onChanged();
				}
			}) : null
		]
	});
}
function initialsOf(name) {
	const parts = name.trim().split(/\s+/);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function Avatar({ name, size = 44 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "grid shrink-0 place-items-center rounded-full bg-copper-light font-display text-copper-dark",
		style: {
			width: size,
			height: size,
			fontSize: size * .4
		},
		children: initialsOf(name)
	});
}
var QUICK_AMOUNTS = [
	1e3,
	5e3,
	1e4
];
function GrantPointsModal({ employee, onClose, onGranted }) {
	const { locale } = useLocale();
	const T = teamDict[locale].employees;
	const presets = [
		T.grantPreset1,
		T.grantPreset2,
		T.grantPreset3,
		T.grantPreset4
	];
	const [amount, setAmount] = (0, import_react.useState)("1000");
	const [reasonChoice, setReasonChoice] = (0, import_react.useState)(presets[0]);
	const [customReason, setCustomReason] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const parsed = Number(amount);
	const isCustom = reasonChoice === "__custom__";
	const finalReason = (isCustom ? customReason : reasonChoice).trim();
	const validAmount = Number.isFinite(parsed) && Number.isInteger(parsed) && parsed > 0 && parsed <= 1e6;
	const validReason = finalReason.length > 0;
	const canSubmit = validAmount && validReason && !busy;
	const amountError = amount && !validAmount;
	async function handleSubmit(ev) {
		ev.preventDefault();
		if (!canSubmit) return;
		setBusy(true);
		const { error } = await supabase.rpc("grant_points", {
			_employee_id: employee.id,
			_amount: parsed,
			_reason: finalReason
		});
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(T.granted.replace("{amount}", formatNumber(parsed)).replace("{name}", employee.name));
		onGranted();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4",
		onClick: () => !busy && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			onClick: (e) => e.stopPropagation(),
			className: "hairline w-full max-w-md space-y-4 rounded-2xl bg-paper p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { name: employee.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate font-display text-lg",
							children: T.grantTitle.replace("{name}", employee.name)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-ink/60",
							children: T.grantBody
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-wide text-ink/55",
							children: T.grantAmount
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							max: 1e6,
							step: 1,
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							className: `mt-1 w-full rounded-xl border bg-parchment px-3 py-2 font-mono-num text-lg outline-none focus:border-copper ${amountError ? "border-red-500" : "border-[var(--hairline)]"}`,
							autoFocus: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 flex items-center justify-between text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: amountError ? "text-red-600" : "text-ink/55",
								children: amountError ? locale === "sq" ? "Vendos një numër pozitiv (≤ 1,000,000)." : "Enter a positive number (≤ 1,000,000)." : T.grantHint.replace("{lek}", formatLek(validAmount ? parsed : 0))
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: QUICK_AMOUNTS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setAmount(String(v)),
						className: "btn-press rounded-full border border-[var(--hairline)] bg-parchment px-3 py-1 text-xs text-ink/70 hover:text-ink",
						children: ["+", formatNumber(v)]
					}, v))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-wide text-ink/55",
						children: T.grantReason
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: reasonChoice,
						onChange: (e) => setReasonChoice(e.target.value),
						className: "mt-1 w-full rounded-xl border border-[var(--hairline)] bg-parchment px-3 py-2 text-sm outline-none focus:border-copper",
						children: [presets.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p,
							children: p
						}, p)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "__custom__",
							children: T.grantPresetCustom
						})]
					})]
				}),
				isCustom ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: customReason,
					onChange: (e) => setCustomReason(e.target.value),
					placeholder: T.grantReasonPlaceholder,
					maxLength: 120,
					className: "w-full rounded-xl border border-[var(--hairline)] bg-parchment px-3 py-2 text-sm outline-none focus:border-copper"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						disabled: busy,
						className: "btn-press rounded-full border border-[var(--hairline)] px-4 py-2 text-sm",
						children: T.cancel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: !canSubmit,
						className: "btn-press inline-flex items-center gap-1.5 rounded-full bg-copper px-4 py-2 text-sm font-medium text-white hover:bg-copper-dark disabled:opacity-60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { size: 14 }),
							" ",
							busy ? T.grantSubmitting : T.grantConfirm
						]
					})]
				})
			]
		})
	});
}
function BulkGrantPointsModal({ employees, onClose, onDone }) {
	const { locale } = useLocale();
	const T = teamDict[locale].employees;
	const presets = [
		T.grantPreset1,
		T.grantPreset2,
		T.grantPreset3,
		T.grantPreset4
	];
	const [amount, setAmount] = (0, import_react.useState)("1000");
	const [reasonChoice, setReasonChoice] = (0, import_react.useState)(presets[1]);
	const [customReason, setCustomReason] = (0, import_react.useState)("");
	const [step, setStep] = (0, import_react.useState)("compose");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const parsed = Number(amount);
	const isCustom = reasonChoice === "__custom__";
	const finalReason = (isCustom ? customReason : reasonChoice).trim();
	const validAmount = Number.isFinite(parsed) && Number.isInteger(parsed) && parsed > 0 && parsed <= 1e6;
	const validReason = finalReason.length > 0;
	const canContinue = validAmount && validReason && employees.length > 0;
	async function runBulk() {
		setBusy(true);
		let ok = 0;
		let err = 0;
		for (const emp of employees) {
			const { error } = await supabase.rpc("grant_points", {
				_employee_id: emp.id,
				_amount: parsed,
				_reason: finalReason
			});
			if (error) err += 1;
			else ok += 1;
		}
		setBusy(false);
		if (err === 0) toast.success(T.bulkSuccess.replace("{amount}", formatNumber(parsed)).replace("{count}", String(ok)));
		else toast(T.bulkPartial.replace("{ok}", String(ok)).replace("{count}", String(employees.length)).replace("{err}", String(err)));
		onDone();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4",
		onClick: () => !busy && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: (e) => e.stopPropagation(),
			className: "hairline w-full max-w-md space-y-4 rounded-2xl bg-paper p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid size-11 shrink-0 place-items-center rounded-full bg-copper-light text-copper-dark",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 20 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg",
					children: T.bulkTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-ink/60",
					children: T.bulkBody.replace("{count}", String(employees.length))
				})] })]
			}), step === "compose" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-wide text-ink/55",
							children: T.grantAmount
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							max: 1e6,
							step: 1,
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							className: "mt-1 w-full rounded-xl border border-[var(--hairline)] bg-parchment px-3 py-2 font-mono-num text-lg outline-none focus:border-copper",
							autoFocus: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-xs text-ink/55",
							children: T.grantHint.replace("{lek}", formatLek(validAmount ? parsed : 0))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: QUICK_AMOUNTS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setAmount(String(v)),
						className: "btn-press rounded-full border border-[var(--hairline)] bg-parchment px-3 py-1 text-xs text-ink/70 hover:text-ink",
						children: ["+", formatNumber(v)]
					}, v))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-wide text-ink/55",
						children: T.grantReason
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: reasonChoice,
						onChange: (e) => setReasonChoice(e.target.value),
						className: "mt-1 w-full rounded-xl border border-[var(--hairline)] bg-parchment px-3 py-2 text-sm outline-none focus:border-copper",
						children: [presets.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p,
							children: p
						}, p)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "__custom__",
							children: T.grantPresetCustom
						})]
					})]
				}),
				isCustom ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: customReason,
					onChange: (e) => setCustomReason(e.target.value),
					placeholder: T.grantReasonPlaceholder,
					maxLength: 120,
					className: "w-full rounded-xl border border-[var(--hairline)] bg-parchment px-3 py-2 text-sm outline-none focus:border-copper"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "btn-press rounded-full border border-[var(--hairline)] px-4 py-2 text-sm",
						children: T.cancel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: !canContinue,
						onClick: () => setStep("confirm"),
						className: "btn-press inline-flex items-center gap-1.5 rounded-full bg-copper px-4 py-2 text-sm font-medium text-white hover:bg-copper-dark disabled:opacity-60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 14 }),
							" ",
							T.bulkConfirm.replace("{amount}", formatNumber(validAmount ? parsed : 0)).replace("{count}", String(employees.length))
						]
					})]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-parchment p-4 text-sm text-ink/80",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-ink",
						children: T.bulkConfirm.replace("{amount}", formatNumber(parsed)).replace("{count}", String(employees.length))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-xs text-ink/60",
						children: [
							T.grantReason,
							": ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-ink/80",
								children: finalReason
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-xs text-ink/60",
						children: T.grantHint.replace("{lek}", formatLek(parsed * employees.length))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-end gap-2 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setStep("compose"),
					disabled: busy,
					className: "btn-press rounded-full border border-[var(--hairline)] px-4 py-2 text-sm",
					children: T.cancel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: runBulk,
					disabled: busy,
					className: "btn-press inline-flex items-center gap-1.5 rounded-full bg-copper px-4 py-2 text-sm font-medium text-white hover:bg-copper-dark disabled:opacity-60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { size: 14 }),
						" ",
						busy ? T.bulkSubmitting : T.grantConfirm
					]
				})]
			})] })]
		})
	});
}
function RequestsTab({ data, onChanged }) {
	const { locale } = useLocale();
	const T = teamDict[locale].requests;
	const pending = data.filter((r) => r.request.status === "pending");
	const [busy, setBusy] = (0, import_react.useState)(null);
	async function decide(requestId, name, action) {
		setBusy(requestId);
		const fn = action === "approve" ? "approve_join_request" : "reject_join_request";
		const { error } = await supabase.rpc(fn, { _request_id: requestId });
		setBusy(null);
		if (error) {
			toast.error(error.message);
			return;
		}
		if (action === "approve") toast.success(T.approved.replace("{name}", name));
		else toast(T.rejected);
		onChanged();
	}
	if (pending.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-6 text-center text-sm text-ink/60",
		children: T.empty
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-3",
		children: pending.map(({ request, applicant }) => {
			const name = applicant?.full_name || "—";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "hairline rounded-2xl bg-parchment p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-ink/55",
								children: applicant?.job_title || applicant?.department || "—"
							}),
							request.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 rounded-xl bg-paper px-3 py-2 text-sm text-ink/75",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] uppercase tracking-wide text-ink/45",
									children: [T.messageLabel, ": "]
								}), request.message]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 text-[11px] text-ink/50",
								children: [
									T.sentAgo,
									" ",
									formatRelative(request.created_at, locale)
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => decide(request.id, name, "reject"),
							disabled: busy === request.id,
							className: "btn-press rounded-full border border-[var(--hairline)] bg-paper px-3.5 py-1.5 text-sm text-ink/70 hover:text-ink disabled:opacity-50",
							children: T.reject
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => decide(request.id, name, "approve"),
							disabled: busy === request.id,
							className: "btn-press rounded-full bg-copper px-4 py-1.5 text-sm font-medium text-white hover:bg-copper-dark disabled:opacity-50",
							children: T.approve
						})]
					})]
				})
			}, request.id);
		})
	});
}
function InvitationsTab({ invitations, companyId, onChanged }) {
	const { locale } = useLocale();
	const T = teamDict[locale].invitations;
	const [emails, setEmails] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	function parseEmails(raw) {
		return Array.from(new Set(raw.split(/[\s,;]+/).map((e) => e.trim().toLowerCase()).filter(Boolean)));
	}
	async function send() {
		const list = parseEmails(emails);
		if (list.length === 0) return;
		const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		for (const e of list) if (!emailRe.test(e)) {
			toast.error(T.invalidEmail.replace("{email}", e));
			return;
		}
		const existing = new Set(invitations.filter((i) => i.status === "pending").map((i) => i.email.toLowerCase()));
		const toInsert = list.filter((e) => !existing.has(e));
		if (toInsert.length === 0) {
			toast(T.duplicate.replace("{email}", list[0]));
			return;
		}
		setSending(true);
		const { data: u } = await supabase.auth.getUser();
		const userId = u?.user?.id;
		const rows = toInsert.map((email) => ({
			company_id: companyId,
			email,
			invited_by: userId
		}));
		const { error } = await supabase.from("company_invitations").insert(rows);
		setSending(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(T.sent.replace("{n}", String(toInsert.length)));
		setEmails("");
		onChanged();
	}
	async function revoke(id) {
		const { error } = await supabase.rpc("revoke_invitation", { _invitation_id: id });
		if (error) {
			toast.error(error.message);
			return;
		}
		toast(T.revoked);
		onChanged();
	}
	function inviteLink(token) {
		return `${typeof window !== "undefined" ? window.location.origin : ""}/join?token=${encodeURIComponent(token)}`;
	}
	async function copy(token) {
		try {
			await navigator.clipboard.writeText(inviteLink(token));
			toast.success(T.copied);
		} catch {
			toast.error("Copy failed");
		}
	}
	const statusLabel = {
		pending: T.statusPending,
		accepted: T.statusAccepted,
		revoked: T.statusRevoked,
		expired: T.statusExpired
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hairline rounded-2xl bg-parchment p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm font-medium text-ink/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 14 }),
						" ",
						T.sendTitle
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-ink/55",
					children: T.sendHint
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					rows: 2,
					value: emails,
					onChange: (e) => setEmails(e.target.value),
					placeholder: T.placeholder,
					className: "mt-3 block w-full rounded-xl border border-[var(--hairline)] bg-paper px-4 py-3 text-sm outline-none focus:border-copper"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-ink/50",
						children: T.shareNote
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: send,
						disabled: sending || !emails.trim(),
						className: "btn-press inline-flex items-center gap-1.5 rounded-full bg-copper px-4 py-2 text-sm font-medium text-white hover:bg-copper-dark disabled:opacity-60",
						children: sending ? T.sending : T.send
					})]
				})
			]
		}), invitations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-6 text-center text-sm text-ink/60",
			children: T.empty
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "min-w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-left text-xs uppercase tracking-wide text-ink/55",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4",
							children: T.colEmail
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4",
							children: T.colSent
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4",
							children: T.colExpires
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4",
							children: T.colStatus
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "py-2 text-right" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-[var(--hairline)]",
					children: invitations.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-4 font-medium",
							children: inv.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-4 text-ink/60",
							children: formatDate(inv.created_at, locale)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-4 text-ink/60",
							children: formatDate(inv.expires_at, locale)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-2.5 py-1 text-xs font-medium ${inv.status === "pending" ? "bg-copper-light text-copper-dark" : inv.status === "accepted" ? "bg-emerald-100 text-emerald-800" : "bg-ink/10 text-ink/60"}`,
								children: statusLabel[inv.status]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 text-right",
							children: inv.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => copy(inv.token),
									className: "btn-press inline-flex items-center gap-1 rounded-full border border-[var(--hairline)] px-3 py-1 text-xs hover:text-copper-dark",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 12 }),
										" ",
										T.copyLink
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => revoke(inv.id),
									className: "btn-press inline-flex items-center gap-1 rounded-full border border-[var(--hairline)] px-3 py-1 text-xs text-ink/60 hover:text-red-600",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 }),
										" ",
										T.revoke
									]
								})]
							}) : null
						})
					] }, inv.id))
				})]
			})
		})]
	});
}
function formatDate(iso, locale) {
	try {
		return new Intl.DateTimeFormat(locale === "sq" ? "sq-AL" : "en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric"
		}).format(new Date(iso));
	} catch {
		return iso;
	}
}
function formatRelative(iso, locale) {
	const diff = Date.now() - new Date(iso).getTime();
	const hours = Math.round(diff / 36e5);
	if (hours < 1) return locale === "sq" ? "tani" : "just now";
	if (hours < 24) return locale === "sq" ? `${hours} orë më parë` : `${hours}h ago`;
	const days = Math.round(hours / 24);
	return locale === "sq" ? `${days} ditë më parë` : `${days}d ago`;
}
function EmployerDashboard() {
	const { t, locale } = useLocale();
	const e = t.dashboard.employer;
	const { data: profile } = useProfile();
	const ownerId = profile?.id;
	const qc = useQueryClient();
	const company = useMyCompany(ownerId).data;
	(0, import_react.useEffect)(() => {
		company?.brand_primary;
		return () => {
			clearCompanyBrand();
		};
	}, [company?.brand_primary]);
	const employeesQ = useCompanyEmployees(company?.id);
	const selectionsQ = useCompanySelections((0, import_react.useMemo)(() => (employeesQ.data ?? []).map((emp) => emp.id), [employeesQ.data]));
	const offersQ = useOffers();
	const providersQ = useProviders();
	const offerById = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		(offersQ.data ?? []).forEach((o) => m.set(o.id, o));
		return m;
	}, [offersQ.data]);
	const providerById = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		(providersQ.data ?? []).forEach((p) => m.set(p.id, p));
		return m;
	}, [providersQ.data]);
	const employeeInfo = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		(employeesQ.data ?? []).forEach((emp) => m.set(emp.id, {
			name: emp.full_name || emp.email || "—",
			job: emp.job_title || (emp.department ?? "")
		}));
		return m;
	}, [employeesQ.data]);
	const selections = selectionsQ.data ?? [];
	const pending = selections.filter((s) => s.status === "pending");
	const spent = selections.filter((s) => s.status === "paid").reduce((s, x) => s + x.total_l, 0);
	const headcount = company?.employee_count ?? employeesQ.data?.length ?? 0;
	const monthlyPool = (company?.monthly_budget_per_employee_lek ?? 0) * headcount;
	const annualPool = monthlyPool * 12;
	const categoryCounts = (0, import_react.useMemo)(() => {
		const counts = /* @__PURE__ */ new Map();
		selections.forEach((s) => s.offer_ids.forEach((id) => {
			const cat = offerById.get(id)?.category;
			if (!cat) return;
			counts.set(cat, (counts.get(cat) ?? 0) + 1);
		}));
		return counts;
	}, [selections, offerById]);
	const allCategories = (0, import_react.useMemo)(() => Array.from(new Set((offersQ.data ?? []).map((o) => o.category))), [offersQ.data]);
	const topCategory = (0, import_react.useMemo)(() => {
		return Array.from(categoryCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];
	}, [categoryCounts]);
	const unusedCategories = allCategories.filter((c) => !categoryCounts.has(c));
	const onRefresh = () => qc.invalidateQueries({ queryKey: ["selections", "company"] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		kicker: t.pages.employer.kicker,
		title: company?.name ?? t.pages.employer.title,
		subtitle: t.pages.employer.body,
		children: !company ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-ink/70",
			children: e.noCompany
		}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: e.employees,
						value: headcount
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: e.annualBudget,
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: annualPool }),
						hint: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: monthlyPool }),
								" / ",
								locale === "sq" ? "muaj" : "mo"
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: e.pendingCount,
						value: pending.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: e.spentThisCycle,
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: spent }),
						hint: e.paid
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: e.approvals,
				children: pending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink/60",
					children: e.empty
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: pending.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalRow, {
						selection: s,
						offerById,
						providerById,
						employeeInfo: employeeInfo.get(s.employee_id),
						locale,
						t,
						onDone: onRefresh
					}, s.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployerTeamPanel, {
				company: {
					id: company.id,
					monthly_budget_per_employee_lek: company.monthly_budget_per_employee_lek,
					employee_count: company.employee_count
				},
				annualWelfare: annualPool
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					title: e.analysis,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisBlock, {
						topCategory,
						unusedCategories,
						categoryCounts,
						t
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					title: e.savingsCalc,
					hint: e.savingsCalcHint,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployerSavingsCalc, { t })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: e.recentActivity,
				children: selections.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink/60",
					children: e.empty
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "min-w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-left text-xs uppercase tracking-wide text-ink/55",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: e.employee
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: t.dashboard.employee.browse
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: e.total
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: "Status"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-[var(--hairline)]",
							children: selections.slice(0, 12).map((s) => {
								const o = offerById.get(s.offer_ids[0]);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4",
										children: employeeInfo.get(s.employee_id)?.name ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-3 pr-4",
										children: [o ? locale === "sq" ? o.title_sq : o.title_en : "—", s.offer_ids.length > 1 ? ` +${s.offer_ids.length - 1}` : ""]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4 font-mono-num",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: s.total_l })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
											status: s.status,
											t
										})
									})
								] }, s.id);
							})
						})]
					})
				})
			})
		] })
	});
}
function StatusPill({ status, t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `rounded-full px-2.5 py-1 text-xs font-medium ${{
			pending: "bg-copper-light text-copper-dark",
			approved: "bg-copper-light text-copper-dark",
			paid: "bg-emerald-100 text-emerald-800",
			rejected: "bg-ink/10 text-ink/60"
		}[status]}`,
		children: t.dashboard.employee.status[status]
	});
}
function ApprovalRow({ selection, offerById, providerById, employeeInfo, locale, t, onDone }) {
	const e = t.dashboard.employer;
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [routing, setRouting] = (0, import_react.useState)(null);
	const offers = selection.offer_ids.map((id) => offerById.get(id)).filter((x) => !!x);
	const providers = (0, import_react.useMemo)(() => {
		const names = /* @__PURE__ */ new Set();
		offers.forEach((o) => {
			const p = providerById.get(o.provider_id);
			if (p) names.add(p.business_name);
		});
		return Array.from(names);
	}, [offers, providerById]);
	async function handleApprove() {
		setBusy(true);
		for (const name of providers) {
			setRouting(e.routingPayment.replace("{provider}", name));
			await new Promise((r) => setTimeout(r, 500));
		}
		const { data: result, error: rpcError } = await supabase.rpc("approve_selection", { _selection_id: selection.id });
		if (rpcError) {
			setRouting(null);
			setBusy(false);
			toast.error(rpcError.message);
			return;
		}
		if (result?.status === "insufficient_balance") {
			setRouting(null);
			setBusy(false);
			toast.error(locale === "sq" ? `Punonjësi nuk ka pikë të mjaftueshme (${result.balance} nga ${result.required}). Përzgjedhja nuk u miratua.` : `Employee doesn't have enough points (${result.balance} of ${result.required} required). Selection not approved.`);
			onDone();
			return;
		}
		const reward = Math.max(200, Math.round(selection.total_l * .05));
		await supabase.rpc("grant_points", {
			_employee_id: selection.employee_id,
			_amount: reward,
			_reason: locale === "sq" ? "Bonus angazhimi" : "Engagement bonus"
		});
		setRouting(null);
		setBusy(false);
		burstConfetti();
		toast.success(e.approvedToast);
		onDone();
	}
	async function handleReject() {
		setBusy(true);
		const { error } = await supabase.rpc("reject_selection", { _selection_id: selection.id });
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast(e.rejectedToast, { description: locale === "sq" ? "Pikët e rezervuara iu kthyen punonjësit." : "Held points were returned to the employee." });
		onDone();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "hairline rounded-2xl bg-parchment p-4 sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium",
						children: employeeInfo?.name ?? "—"
					}),
					employeeInfo?.job ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-ink/55",
						children: employeeInfo.job
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-1.5",
						children: offers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-paper px-2.5 py-1 text-xs text-ink/80 hairline",
							children: [locale === "sq" ? o.title_sq : o.title_en, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1.5 font-mono-num text-ink/55",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: o.price_l })
							})]
						}, o.id))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono-num text-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: selection.total_l })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleReject,
						disabled: busy,
						className: "btn-press rounded-full border border-[var(--hairline)] bg-paper px-3.5 py-1.5 text-sm font-medium text-ink/70 hover:text-ink disabled:opacity-50",
						children: e.reject
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleApprove,
						disabled: busy,
						className: "btn-press rounded-full bg-copper px-4 py-1.5 text-sm font-medium text-parchment hover:bg-copper-dark disabled:opacity-50",
						children: e.approve
					})]
				})]
			})]
		}), routing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-center gap-2 rounded-xl bg-copper-light px-3 py-2 text-sm text-copper-dark",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block size-2 animate-pulse rounded-full bg-copper-dark" }), routing]
		}) : null]
	});
}
function AnalysisBlock({ topCategory, unusedCategories, categoryCounts, t }) {
	const e = t.dashboard.employer;
	if (!topCategory) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-ink/60",
		children: e.analysisEmpty
	});
	const sorted = Array.from(categoryCounts.entries()).sort((a, b) => b[1] - a[1]);
	const max = sorted[0][1];
	const topLabel = t.categories[topCategory] ?? topCategory;
	const unusedLabels = unusedCategories.map((c) => t.categories[c] ?? c).slice(0, 3).join(", ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-wide text-ink/55",
				children: e.mostPopular
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-display text-2xl text-copper-dark",
				children: topLabel
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: sorted.map(([cat, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.categories[cat] ?? cat }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono-num text-ink/60",
						children: count
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 h-1.5 w-full overflow-hidden rounded-full bg-parchment",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-copper",
						style: { width: `${count / max * 100}%` }
					})
				})] }, cat))
			}),
			unusedCategories.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-wide text-ink/55",
				children: e.goingUnused
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-sm text-ink/70",
				children: unusedLabels
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-parchment p-3 text-sm text-ink/75",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-medium uppercase tracking-wide text-ink/55",
					children: [
						e.summaryLabel,
						".",
						" "
					]
				}), e.summary.replace("{top}", topLabel).replace("{unused}", unusedLabels || "—")]
			})
		]
	});
}
function EmployerSavingsCalc({ t }) {
	const e = t.dashboard.employer;
	const [value, setValue] = (0, import_react.useState)(2e4);
	const benefitCost = value;
	const cashCost = Math.round(value * 1.165);
	const saving = cashCost - benefitCost;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-sm text-ink/70",
					children: e.valuePerEmployee
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono-num text-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "range",
				min: 5e3,
				max: 8e4,
				step: 1e3,
				value,
				onChange: (ev) => setValue(Number(ev.target.value)),
				className: "mt-2 w-full accent-copper"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hairline rounded-xl bg-parchment p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-wide text-ink/55",
						children: e.asBenefit
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-mono-num text-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: benefitCost })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hairline rounded-xl bg-parchment p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-wide text-ink/55",
						children: e.asCashRaise
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-mono-num text-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: cashCost })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-copper-light p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-wide text-copper-dark",
					children: e.youSave
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 font-mono-num text-3xl text-copper-dark",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: saving })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-ink/55",
				children: e.illustrative
			})
		]
	});
}
function burstConfetti() {
	try {
		confetti_module_default({
			particleCount: 90,
			spread: 70,
			startVelocity: 38,
			origin: { y: .3 },
			colors: [
				"#B86B3E",
				"#E6C9A8",
				"#7C9A92",
				"#1F1B16"
			],
			scalar: .9
		});
	} catch {}
}
//#endregion
export { EmployerDashboard as component };
