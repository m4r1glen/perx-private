import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-B5jeyOoH.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useProfile } from "./use-profile-B8Sn44Wb.mjs";
import { n as useLocale } from "./locale-context-CdT0mpu7.mjs";
import { f as useOffers, n as Lek, u as useMyProvider } from "./coin-icon-CXePSZH_.mjs";
import { a as verifyVoucher, r as useRedeemedVouchersForProvider, t as ProviderMark } from "./use-vouchers-vZQeVxyr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { n as Card, r as Stat, t as AppShell } from "./app-shell-BUJ_cfjY.mjs";
import { t as e } from "../_libs/qr-scanner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.provider-CGYd7yPd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VoucherReceipt({ data }) {
	const { t, locale } = useLocale();
	const r = t.dashboard.provider.scan.receipt;
	const dateStr = new Date(data.redeemedAt).toLocaleString(locale === "sq" ? "sq-AL" : "en-GB", {
		dateStyle: "long",
		timeStyle: "short"
	});
	const offerTitle = (locale === "sq" ? data.offerTitleSq : data.offerTitleEn) ?? data.offerTitleSq ?? data.offerTitleEn ?? "—";
	const taxFree = data.valueL;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "receipt-root mx-auto w-full max-w-[560px] bg-paper text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hairline rounded-2xl p-8 print:border-0 print:rounded-none print:p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl font-medium tracking-tight",
						children: "PERX"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-[0.18em] text-ink/55",
						children: r.kicker
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 font-display text-3xl font-medium leading-tight",
					children: r.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 font-mono-num text-xs text-ink/55",
					children: ["#", data.receiptNumber]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: r.employee,
							value: data.employeeName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: r.provider,
							value: data.providerName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: r.offer,
							value: offerTitle,
							className: "sm:col-span-2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: r.code,
							value: data.code,
							mono: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: r.confirmedAt,
							value: dateStr
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 hairline rounded-xl bg-parchment p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.14em] text-ink/55",
							children: r.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono-num text-3xl text-ink",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: data.valueL })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.14em] text-copper-dark",
							children: r.taxFree
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono-num text-lg text-copper-dark",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: taxFree })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-ink/70",
					children: r.paidLine
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center justify-between border-t border-[var(--hairline)] pt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-[0.18em] text-ink/55",
						children: r.stamp
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono-num text-xs text-ink/55",
						children: dateStr
					})]
				})
			]
		})
	});
}
function Field$1({ label, value, mono, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] uppercase tracking-[0.14em] text-ink/55",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mt-1 ${mono ? "font-mono-num" : ""} text-sm text-ink`,
			children: value
		})]
	});
}
async function downloadReceiptPdf(node, receiptNumber) {
	if (!node) return;
	try {
		const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("../_libs/html2canvas-pro.mjs").then((n) => n.t), import("../_libs/jspdf.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))]);
		const canvas = await html2canvas(node, {
			backgroundColor: "#ffffff",
			scale: Math.min(2, (window.devicePixelRatio || 1) * 1.5),
			useCORS: true,
			logging: false
		});
		const pdf = new jsPDF({
			unit: "mm",
			format: "a4",
			orientation: "portrait"
		});
		const pageW = pdf.internal.pageSize.getWidth();
		const pageH = pdf.internal.pageSize.getHeight();
		const margin = 12;
		const maxW = pageW - margin * 2;
		const maxH = pageH - margin * 2;
		const ratio = canvas.width / canvas.height;
		let drawW = maxW;
		let drawH = drawW / ratio;
		if (drawH > maxH) {
			drawH = maxH;
			drawW = drawH * ratio;
		}
		const x = (pageW - drawW) / 2;
		const y = (pageH - drawH) / 2;
		const img = canvas.toDataURL("image/jpeg", .95);
		pdf.addImage(img, "JPEG", x, y, drawW, drawH, void 0, "FAST");
		pdf.save(`PERX-${receiptNumber}.pdf`);
	} catch (err) {
		console.warn("[receipt-pdf] download failed, falling back to print", err);
		try {
			window.print();
		} catch {}
	}
}
function ProviderScanModal({ open, onClose, providerName, onRedeemed }) {
	const { t, locale } = useLocale();
	const s = t.dashboard.provider.scan;
	const videoRef = (0, import_react.useRef)(null);
	const scannerRef = (0, import_react.useRef)(null);
	const lastScanRef = (0, import_react.useRef)("");
	const lastScanAtRef = (0, import_react.useRef)(0);
	const [phase, setPhase] = (0, import_react.useState)({ kind: "scanning" });
	const [manualCode, setManualCode] = (0, import_react.useState)("");
	const [camError, setCamError] = (0, import_react.useState)(null);
	const [downloading, setDownloading] = (0, import_react.useState)(false);
	const receiptRef = (0, import_react.useRef)(null);
	const reset = (0, import_react.useCallback)(() => {
		setPhase({ kind: "scanning" });
		setManualCode("");
		lastScanRef.current = "";
	}, []);
	const handleVerify = (0, import_react.useCallback)(async (input) => {
		setPhase({ kind: "verifying" });
		const result = await verifyVoucher(input);
		setPhase({
			kind: "result",
			result
		});
		if (result.ok) onRedeemed?.();
	}, [onRedeemed]);
	(0, import_react.useEffect)(() => {
		if (!open || phase.kind !== "scanning" || !videoRef.current) return;
		let cancelled = false;
		setCamError(null);
		const video = videoRef.current;
		const scanner = new e(video, (res) => {
			const text = res.data;
			const now = Date.now();
			if (text === lastScanRef.current && now - lastScanAtRef.current < 1500) return;
			lastScanRef.current = text;
			lastScanAtRef.current = now;
			if (text.includes(".") && !text.startsWith("PERX-")) handleVerify({ token: text });
			else if (text.toUpperCase().startsWith("PERX-")) handleVerify({ code: text.toUpperCase() });
			else handleVerify({ token: text });
		}, {
			highlightScanRegion: false,
			highlightCodeOutline: false,
			preferredCamera: "environment",
			maxScansPerSecond: 4
		});
		scannerRef.current = scanner;
		scanner.start().catch((err) => {
			if (cancelled) return;
			console.warn("[scan] camera unavailable", err);
			setCamError(s.cameraDenied);
		});
		return () => {
			cancelled = true;
			scanner.stop();
			scanner.destroy();
			scannerRef.current = null;
		};
	}, [
		open,
		phase.kind,
		handleVerify,
		s.cameraDenied
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-end justify-center bg-ink/55 backdrop-blur-sm sm:items-center print:static print:bg-paper",
		role: "dialog",
		"aria-modal": "true",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-[520px] max-h-[100dvh] overflow-y-auto rounded-t-3xl bg-paper sm:rounded-3xl print:max-w-none print:max-h-none print:rounded-none print:overflow-visible",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between border-b border-[var(--hairline)] px-6 py-4 print:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] uppercase tracking-[0.18em] text-copper-dark",
					children: s.kicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-medium tracking-tight",
					children: s.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					"aria-label": s.close,
					className: "btn-press grid size-9 place-items-center rounded-full border border-[var(--hairline)] bg-parchment text-ink/70 hover:text-ink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}), phase.kind === "scanning" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 print:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-3xl bg-ink",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								ref: videoRef,
								className: "absolute inset-0 h-full w-full object-cover",
								muted: true,
								playsInline: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reticle, {}),
							camError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex items-center justify-center bg-ink/85 p-6 text-center text-sm text-parchment/90",
								children: camError
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-center text-sm text-ink/65",
						children: s.aim
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] uppercase tracking-[0.14em] text-ink/55",
							children: s.manualLabel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-2 flex gap-2",
							onSubmit: (e) => {
								e.preventDefault();
								const c = manualCode.trim().toUpperCase();
								if (c.length < 6) return;
								handleVerify({ code: c });
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: manualCode,
								onChange: (e) => setManualCode(e.target.value),
								placeholder: "PERX-XXXX-XXXX",
								className: "hairline w-full rounded-lg bg-parchment px-3 py-2 font-mono-num text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-copper/40"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "btn-press rounded-full bg-ink px-4 py-2 text-sm font-medium text-parchment hover:opacity-90",
								children: s.verify
							})]
						})]
					})
				]
			}) : phase.kind === "verifying" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center gap-4 px-6 py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-10 animate-spin rounded-full border-2 border-ink/15 border-t-copper" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-ink/65",
					children: s.verifying
				})]
			}) : phase.kind === "result" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultView, {
				result: phase.result,
				providerName,
				onRescan: reset,
				onShowReceipt: (data) => setPhase({
					kind: "receipt",
					data
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-paper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 border-b border-[var(--hairline)] px-6 py-3 print:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: reset,
						className: "btn-press rounded-full border border-[var(--hairline)] bg-parchment px-3 py-1.5 text-xs text-ink/70 hover:text-ink",
						children: ["← ", s.backToScan]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => window.print(),
							className: "btn-press rounded-full border border-[var(--hairline)] bg-paper px-3 py-1.5 text-xs font-medium text-ink/80 hover:text-ink",
							children: s.print
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setDownloading(true);
								downloadReceiptPdf(receiptRef.current, phase.data.receiptNumber).finally(() => setDownloading(false));
							},
							disabled: downloading,
							className: "btn-press rounded-full bg-copper px-4 py-1.5 text-xs font-medium text-parchment hover:bg-copper-dark disabled:opacity-60",
							children: downloading ? "…" : s.download ?? "PDF"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: receiptRef,
					className: "p-6 print:p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoucherReceipt, { data: phase.data })
				})]
			})]
		})
	});
}
function Reticle() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, { className: "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, { className: "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, { className: "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, { className: "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scan-line absolute inset-x-0 top-0 h-[2px] bg-copper shadow-[0_0_12px_var(--copper)]" })
			]
		})
	});
}
function Corner({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute h-7 w-7 border-copper ${className}` });
}
function ResultView({ result, providerName, onRescan, onShowReceipt }) {
	const { t, locale } = useLocale();
	const s = t.dashboard.provider.scan;
	if (result.ok && result.voucher) {
		const v = result.voucher;
		const title = (locale === "sq" ? v.offer_title_sq : v.offer_title_en) ?? v.offer_title_sq ?? v.offer_title_en ?? "—";
		const redeemedAt = v.redeemed_at ?? (/* @__PURE__ */ new Date()).toISOString();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "result-pop flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuccessCheck, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 font-display text-3xl font-medium tracking-tight text-emerald-700",
						children: s.valid
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-sm text-ink/65",
						children: s.confirmed
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 w-full hairline rounded-2xl bg-parchment p-5 text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: s.employee,
								value: v.employee_name ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: s.offer,
								value: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: s.value,
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: v.value_l }),
								mono: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: s.code,
								value: v.code,
								mono: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex w-full gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onRescan,
							className: "btn-press flex-1 rounded-full border border-[var(--hairline)] bg-paper px-4 py-2.5 text-sm font-medium text-ink/80 hover:text-ink",
							children: s.scanAnother
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onShowReceipt({
								receiptNumber: v.code,
								employeeName: v.employee_name ?? "—",
								providerName,
								offerTitleSq: v.offer_title_sq,
								offerTitleEn: v.offer_title_en,
								valueL: v.value_l,
								redeemedAt,
								code: v.code
							}),
							className: "btn-press flex-1 rounded-full bg-copper px-4 py-2.5 text-sm font-medium text-parchment hover:bg-copper-dark",
							children: s.receiptCta
						})]
					})
				]
			})
		});
	}
	const reason = result.reason ?? "server_error";
	const isAlready = reason === "already_redeemed";
	const tone = isAlready ? "amber" : "red";
	const headline = reason === "already_redeemed" ? s.alreadyRedeemed : reason === "invalid_signature" || reason === "tampered" || reason === "invalid_payload" || reason === "invalid_token_format" ? s.invalid : reason === "expired" ? s.expired : reason === "wrong_provider" ? s.wrongProvider : reason === "not_a_provider" ? s.notAProvider : reason === "not_found" ? s.notFound : reason === "cancelled" ? s.cancelled : s.genericError;
	const sub = isAlready && result.redeemed_at ? s.redeemedOn.replace("{date}", new Date(result.redeemed_at).toLocaleString(locale === "sq" ? "sq-AL" : "en-GB", {
		dateStyle: "medium",
		timeStyle: "short"
	})) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "result-pop flex flex-col items-center text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FailMark, { tone }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `mt-4 font-display text-3xl font-medium tracking-tight ${tone === "amber" ? "text-amber-700" : "text-red-700"}`,
					children: headline
				}),
				sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 text-sm text-ink/70",
					children: sub
				}) : null,
				result.voucher ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 w-full hairline rounded-2xl bg-parchment p-5 text-left",
					children: [
						result.voucher.employee_name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: s.employee,
							value: result.voucher.employee_name
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: s.code,
							value: result.voucher.code,
							mono: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: s.value,
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: result.voucher.value_l }),
							mono: true
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onRescan,
					className: "btn-press mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment hover:opacity-90",
					children: s.scanAnother
				})
			]
		})
	});
}
function Row({ label, value, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3 py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] uppercase tracking-[0.14em] text-ink/55",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `text-sm text-ink ${mono ? "font-mono-num" : ""}`,
			children: value
		})]
	});
}
function SuccessCheck() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 80 80",
		className: "h-20 w-20",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "40",
			cy: "40",
			r: "36",
			className: "fill-emerald-50 stroke-emerald-500",
			strokeWidth: "2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M24 42 L36 54 L58 30",
			className: "check-stroke",
			fill: "none",
			stroke: "#059669",
			strokeWidth: "5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}
function FailMark({ tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 80 80",
		className: "h-20 w-20",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "40",
			cy: "40",
			r: "36",
			className: tone === "amber" ? "fill-amber-50 stroke-amber-500" : "fill-red-50 stroke-red-500",
			strokeWidth: "2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M28 28 L52 52 M52 28 L28 52",
			fill: "none",
			stroke: tone === "amber" ? "#b45309" : "#b91c1c",
			strokeWidth: "5",
			strokeLinecap: "round"
		})]
	});
}
var CATEGORY_VALUES = [
	"fitness",
	"wellness",
	"travel",
	"food",
	"health",
	"learning",
	"telecom"
];
var MOOD_VALUES = [
	"relax",
	"energy",
	"adventure",
	"focus"
];
function ProviderDashboard() {
	const { t, locale } = useLocale();
	const p = t.dashboard.provider;
	const { data: profile } = useProfile();
	const ownerId = profile?.id;
	const qc = useQueryClient();
	const provider = useMyProvider(ownerId).data;
	const offersAllQ = useOffers();
	const myOffers = (0, import_react.useMemo)(() => (offersAllQ.data ?? []).filter((o) => provider && o.provider_id === provider.id), [offersAllQ.data, provider]);
	const myOfferIds = (0, import_react.useMemo)(() => myOffers.map((o) => o.id), [myOffers]);
	const demandQ = useQuery({
		queryKey: [
			"selections",
			"provider",
			myOfferIds.join(",")
		],
		enabled: myOfferIds.length > 0,
		queryFn: async () => {
			const { data, error } = await supabase.from("selections").select("id, employee_id, offer_ids, total_l, status, created_at").overlaps("offer_ids", myOfferIds).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const now = /* @__PURE__ */ new Date();
	const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
	const revenueThisMonth = (0, import_react.useMemo)(() => {
		let sum = 0;
		(demandQ.data ?? []).filter((s) => s.status === "paid" && new Date(s.created_at) >= monthStart).forEach((s) => {
			s.offer_ids.forEach((oid) => {
				const o = myOffers.find((x) => x.id === oid);
				if (o) sum += o.price_l;
			});
		});
		return sum;
	}, [demandQ.data, myOffers]);
	const activeRedemptions = (demandQ.data ?? []).filter((s) => s.status === "paid" || s.status === "approved").length;
	const pickCounts = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		(demandQ.data ?? []).forEach((s) => s.offer_ids.forEach((id) => {
			if (myOfferIds.includes(id)) m.set(id, (m.get(id) ?? 0) + 1);
		}));
		return m;
	}, [demandQ.data, myOfferIds]);
	const popular = (0, import_react.useMemo)(() => [...myOffers].map((o) => ({
		o,
		n: pickCounts.get(o.id) ?? 0
	})).sort((a, b) => b.n - a.n).slice(0, 5), [myOffers, pickCounts]);
	const [showNew, setShowNew] = (0, import_react.useState)(false);
	const [showScan, setShowScan] = (0, import_react.useState)(false);
	const redeemedQ = useRedeemedVouchersForProvider(provider?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		kicker: t.pages.provider.kicker,
		title: provider?.business_name ?? t.pages.provider.title,
		headerMark: provider ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderMark, {
			name: provider.business_name,
			logoUrl: provider.logo_url,
			brandColor: provider.brand_color,
			size: "md",
			className: "!size-11 !rounded-xl"
		}) : void 0,
		subtitle: provider?.category ? `${t.categories[provider.category] ?? provider.category}${provider.city ? " · " + provider.city : ""}` : t.pages.provider.body,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowScan(true),
					disabled: !provider,
					className: "btn-press inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment hover:opacity-90 disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 24 24",
						className: "h-4 w-4",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "7",
							y: "7",
							width: "10",
							height: "10",
							rx: "1"
						})]
					}), p.scan.cta]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: p.revenueThisMonth,
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: revenueThisMonth })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: p.activeRedemptions,
						value: activeRedemptions
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: p.yourOffers,
						value: myOffers.length
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: p.yourOffers,
				hint: provider ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowNew(true),
					className: "btn-press rounded-full bg-copper px-3.5 py-1.5 text-xs font-medium text-parchment hover:bg-copper-dark",
					children: ["+ ", p.addOffer]
				}) : void 0,
				children: myOffers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink/60",
					children: p.noOffers
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: myOffers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "hairline rounded-2xl bg-parchment p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs uppercase tracking-wide text-ink/55",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.categories[o.category] ?? o.category }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono-num text-ink",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: o.price_l })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-display text-xl leading-tight",
								children: locale === "sq" ? o.title_sq : o.title_en
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-3 text-sm text-ink/70",
								children: locale === "sq" ? o.description_sq : o.description_en
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-1.5",
								children: o.mood.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-copper-light px-2 py-0.5 text-[11px] font-medium text-copper-dark",
									children: t.moods[m] ?? m
								}, m))
							})
						]
					}, o.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: p.whatPicking,
				children: popular.every((x) => x.n === 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink/60",
					children: p.whatPickingEmpty
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: popular.map(({ o, n }) => {
						const max = popular[0].n || 1;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: locale === "sq" ? o.title_sq : o.title_en }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono-num text-ink/60",
								children: p.timesPicked.replace("{n}", String(n))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 h-1.5 w-full overflow-hidden rounded-full bg-parchment",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-copper",
								style: { width: `${n / max * 100}%` }
							})
						})] }, o.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: p.recentDemand,
				children: !demandQ.data || demandQ.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink/60",
					children: p.noDemand
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-[var(--hairline)]",
					children: demandQ.data.slice(0, 10).map((s) => {
						const o = myOffers.find((x) => s.offer_ids.includes(x.id));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: o ? locale === "sq" ? o.title_sq : o.title_en : "—"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-ink/55",
								children: new Date(s.created_at).toLocaleDateString(locale === "sq" ? "sq-AL" : "en-GB")
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono-num text-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: s.total_l })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full border border-[var(--hairline)] bg-parchment px-2.5 py-1 text-xs",
									children: t.dashboard.employee.status[s.status]
								})]
							})]
						}, s.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: p.scan.redeemedLog,
				children: !redeemedQ.data || redeemedQ.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink/60",
					children: p.scan.redeemedLogEmpty
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-[var(--hairline)]",
					children: redeemedQ.data.map((v) => {
						const o = myOffers.find((x) => x.id === v.offer_id);
						const when = v.redeemed_at ? new Date(v.redeemed_at) : null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-medium",
									children: o ? locale === "sq" ? o.title_sq : o.title_en : "—"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono-num text-xs text-ink/55",
									children: v.code
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 whitespace-nowrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono-num text-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lek, { value: v.value_l })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-ink/55",
									children: when ? when.toLocaleString(locale === "sq" ? "sq-AL" : "en-GB", {
										dateStyle: "short",
										timeStyle: "short"
									}) : "—"
								})]
							})]
						}, v.id);
					})
				})
			}),
			showNew && provider ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewOfferDialog, {
				providerId: provider.id,
				onClose: () => setShowNew(false),
				onCreated: () => {
					qc.invalidateQueries({ queryKey: ["offers"] });
					setShowNew(false);
				}
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderScanModal, {
				open: showScan,
				onClose: () => setShowScan(false),
				providerName: provider?.business_name ?? "",
				onRedeemed: () => {
					qc.invalidateQueries({ queryKey: [
						"vouchers",
						"provider-redeemed",
						provider?.id
					] });
					qc.invalidateQueries({ queryKey: ["vouchers"] });
				}
			})
		]
	});
}
function NewOfferDialog({ providerId, onClose, onCreated }) {
	const { t } = useLocale();
	const p = t.dashboard.provider;
	const [titleSq, setTitleSq] = (0, import_react.useState)("");
	const [titleEn, setTitleEn] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)(2e3);
	const [category, setCategory] = (0, import_react.useState)(CATEGORY_VALUES[0]);
	const [moods, setMoods] = (0, import_react.useState)([]);
	const [saving, setSaving] = (0, import_react.useState)(false);
	function toggleMood(m) {
		setMoods((cur) => cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m]);
	}
	async function handleSave() {
		if (!titleSq.trim() || !titleEn.trim() || !price) {
			toast.error("…");
			return;
		}
		setSaving(true);
		const { error } = await supabase.from("offers").insert({
			provider_id: providerId,
			title_sq: titleSq.trim(),
			title_en: titleEn.trim(),
			price_l: price,
			category,
			mood: moods
		});
		setSaving(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(p.created);
		onCreated();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-3 sm:items-center sm:p-6",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hairline w-full max-w-lg rounded-3xl bg-paper p-6 sm:p-8",
			onClick: (ev) => ev.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: p.newOffer
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: p.titleSq,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: titleSq,
								onChange: (ev) => setTitleSq(ev.target.value),
								className: "hairline w-full rounded-lg bg-parchment px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-copper/40"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: p.titleEn,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: titleEn,
								onChange: (ev) => setTitleEn(ev.target.value),
								className: "hairline w-full rounded-lg bg-parchment px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-copper/40"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: p.priceL,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: price,
									min: 100,
									step: 100,
									onChange: (ev) => setPrice(Number(ev.target.value)),
									className: "hairline w-full rounded-lg bg-parchment px-3 py-2 text-sm font-mono-num focus:outline-none focus:ring-2 focus:ring-copper/40"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: p.categoryLabel,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: category,
									onChange: (ev) => setCategory(ev.target.value),
									className: "hairline w-full rounded-lg bg-parchment px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-copper/40",
									children: CATEGORY_VALUES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c,
										children: t.categories[c] ?? c
									}, c))
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: p.moodsLabel,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: MOOD_VALUES.map((m) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => toggleMood(m),
										className: `rounded-full px-3 py-1 text-xs font-medium transition ${moods.includes(m) ? "bg-copper text-parchment" : "bg-parchment text-ink/70 hairline hover:text-ink"}`,
										children: t.moods[m] ?? m
									}, m);
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "btn-press rounded-full border border-[var(--hairline)] bg-paper px-4 py-2 text-sm font-medium text-ink/70 hover:text-ink",
						children: p.cancel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleSave,
						disabled: saving,
						className: "btn-press rounded-full bg-copper px-5 py-2 text-sm font-medium text-parchment hover:bg-copper-dark disabled:opacity-50",
						children: saving ? p.saving : p.save
					})]
				})
			]
		})
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-xs font-medium uppercase tracking-wide text-ink/55",
			children: label
		}), children]
	});
}
//#endregion
export { ProviderDashboard as component };
