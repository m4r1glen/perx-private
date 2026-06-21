import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useLocale } from "./locale-context-CdT0mpu7.mjs";
import { t as CoinIcon } from "./coin-icon-CXePSZH_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ax8czbzY.js
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	const { locale, setLocale, t } = useLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-parchment text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				locale,
				setLocale,
				t
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { t }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, { t }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, { t }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, { t })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { t })
		]
	});
}
function Wordmark({ size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: `font-display font-semibold tracking-tight ${size === "lg" ? "text-3xl" : "text-xl"} inline-flex items-baseline`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PERX" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-copper",
			"aria-hidden": true
		})]
	});
}
function LangToggle({ locale, setLocale, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"aria-label": label,
		className: "inline-flex items-center rounded-full border border-[var(--hairline)] bg-paper p-0.5 text-xs font-medium",
		children: ["sq", "en"].map((l) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setLocale(l),
				className: `btn-press rounded-full px-3 py-1.5 uppercase tracking-wide ${l === locale ? "bg-ink text-parchment" : "text-ink/60 hover:text-ink"}`,
				children: l
			}, l);
		})
	});
}
function Header({ locale, setLocale, t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-[var(--hairline)] bg-parchment/85 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-3.5 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden justify-center md:flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-7 text-sm text-ink/70",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#how",
							className: "hover:text-ink",
							children: t.how.kicker
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#features",
							className: "hover:text-ink",
							children: t.features.kicker
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 sm:gap-3 justify-self-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {
							locale,
							setLocale,
							label: t.nav.langLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "btn-press hidden rounded-full px-4 py-2 text-sm font-medium text-ink/80 hover:text-ink sm:inline-flex",
							children: t.nav.login
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "btn-press inline-flex items-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-parchment hover:bg-ink/90",
							children: t.nav.getStarted
						})
					]
				})
			]
		})
	});
}
function Hero({ t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0 -z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full bg-copper-light blur-3xl opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-40 -left-32 h-[380px] w-[380px] rounded-full bg-[#FCE9C9] blur-3xl opacity-60" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 pt-14 pb-20 sm:px-8 sm:pt-20 sm:pb-28 lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-paper/70 px-3 py-1 text-xs font-medium text-ink/70",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-copper" }), t.hero.eyebrow]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-5 font-display text-[2.6rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.2rem]",
						children: [
							t.hero.title.split(" ").slice(0, -1).join(" "),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "not-italic text-copper-dark",
								children: t.hero.title.split(" ").slice(-1)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-base text-ink/70 sm:text-lg",
						children: t.hero.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "btn-press inline-flex items-center rounded-full bg-copper px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(255,122,51,0.7)] hover:bg-copper-dark",
							children: t.hero.ctaPrimary
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#how",
							className: "btn-press inline-flex items-center rounded-full border border-[var(--hairline)] bg-paper/60 px-6 py-3.5 text-sm font-semibold text-ink hover:bg-paper",
							children: t.hero.ctaSecondary
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex items-center gap-2 text-xs text-ink/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-sage" }), t.hero.badge]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mt-14 lg:mt-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroVisual, { t })
			})]
		})]
	});
}
function HeroVisual({ t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto w-full max-w-md pt-2 sm:pt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_40%,color-mix(in_oklab,var(--brand)_22%,transparent),transparent_70%)] blur-2xl"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "hero-card group hairline relative rounded-3xl bg-paper p-5 shadow-[0_30px_60px_-30px_rgba(22,23,29,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_80px_-30px_rgba(22,23,29,0.45)] sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-soft font-display text-base font-semibold text-brand-dark",
									children: "BC"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate font-display text-xl leading-tight tracking-tight text-ink sm:text-2xl",
										children: "Bujtina Café"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-[11px] text-ink/55",
										children: "Ushqim · Tiranë"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-dark",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-brand" }), "Drop"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex items-end gap-1.5",
							children: [
								40,
								70,
								55,
								90,
								60,
								80,
								45,
								75,
								95,
								65,
								88,
								72
							].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 rounded-sm bg-brand-soft transition-colors group-hover:bg-brand/40",
								style: { height: `${h * .45}px` }
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-end justify-between gap-3 border-t border-[var(--hairline)] pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono-num text-2xl font-semibold text-ink sm:text-3xl",
									children: [
										"1",
										"\xA0",
										"200",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, { className: "ml-[0.25em]" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-[0.12em] text-ink/50",
									children: "−30% këtë javë"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#features",
								className: "btn-press inline-flex shrink-0 items-center gap-1 rounded-full bg-ink px-3.5 py-2 text-[11px] font-semibold text-parchment hover:bg-ink/90",
								children: ["Shiko detajet", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "→"
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "hero-card group hairline relative rounded-3xl bg-paper p-5 shadow-[0_24px_50px_-26px_rgba(22,23,29,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_36px_70px_-26px_rgba(22,23,29,0.40)] sm:ml-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#FCE9C9] font-display text-base font-semibold text-copper-dark",
								children: "FF"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-display text-lg leading-tight tracking-tight text-ink sm:text-xl",
									children: "Fitness First"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-[11px] text-ink/55",
									children: "Mirëqenie · 12 qendra"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-sage/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-sage",
							children: "−45%"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-end justify-between gap-3 border-t border-[var(--hairline)] pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono-num text-xl font-semibold text-ink sm:text-2xl",
								children: [
									"3",
									"\xA0",
									"500",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, { className: "ml-[0.25em]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 text-[11px] font-normal text-ink/50",
										children: "/muaj"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-[0.12em] text-ink/50",
								children: "Abonim mujor"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#features",
							className: "btn-press inline-flex shrink-0 items-center gap-1 rounded-full border border-[var(--hairline)] bg-paper px-3.5 py-2 text-[11px] font-semibold text-ink hover:bg-parchment",
							children: ["Shiko detajet", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: "→"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hairline grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[var(--hairline)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2 bg-brand-soft px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase leading-tight tracking-[0.12em] text-brand-dark/80",
							children: t.hero.stat1Label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono-num text-xl font-semibold text-brand-dark",
							children: "23%"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2 bg-ink px-4 py-3 text-parchment",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase leading-tight tracking-[0.12em] text-parchment/60",
							children: t.hero.stat2Label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono-num text-xl font-semibold",
							children: t.hero.stat2Value
						})]
					})]
				})
			]
		})]
	});
}
function HowItWorks({ t }) {
	const icons = [
		EmployeeIcon,
		EmployerIcon,
		ProviderIcon
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "how",
		className: "border-t border-[var(--hairline)] bg-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-medium uppercase tracking-[0.16em] text-copper-dark",
					children: t.how.kicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-3xl font-medium tracking-tight sm:text-5xl",
					children: t.how.title
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-5 md:grid-cols-3",
				children: t.how.cards.map((c, i) => {
					const Icon = icons[i];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "card-lift hairline group flex flex-col rounded-2xl bg-parchment p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-copper-light text-copper-dark",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono-num text-xs text-ink/40",
									children: ["0", i + 1]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 text-xs uppercase tracking-[0.14em] text-ink/50",
								children: c.tag
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-2xl leading-snug",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-ink/70",
								children: c.body
							})
						]
					}, c.tag);
				})
			})]
		})
	});
}
function Features({ t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "features",
		className: "border-t border-[var(--hairline)] bg-ink text-parchment",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-copper",
						children: t.features.kicker
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl font-medium tracking-tight sm:text-5xl",
						children: t.features.title
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-px overflow-hidden rounded-2xl border border-parchment/10 bg-parchment/10 sm:grid-cols-2 lg:grid-cols-3",
				children: t.features.items.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 bg-ink p-7 transition-colors hover:bg-[#1B1C24]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex h-9 w-9 items-center justify-center rounded-lg bg-copper/15 text-copper",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureGlyph, { i })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono-num text-[11px] text-parchment/40",
								children: String(i + 1).padStart(2, "0")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl leading-snug",
							children: f.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-parchment/70",
							children: f.body
						})
					]
				}, f.title))
			})]
		})
	});
}
function CtaBand({ t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-[var(--hairline)] bg-parchment",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-medium tracking-tight sm:text-5xl",
					children: t.cta.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-4 max-w-xl text-ink/70",
					children: t.cta.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						className: "btn-press inline-flex items-center rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(255,122,51,0.7)] hover:bg-copper-dark",
						children: t.cta.button
					})
				})
			]
		})
	});
}
function Footer({ t }) {
	const cols = [
		[t.footer.product, t.footer.productLinks],
		[t.footer.company, t.footer.companyLinks],
		[t.footer.legal, t.footer.legalLinks]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-[var(--hairline)] bg-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 py-14 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { size: "lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xs text-sm text-ink/65",
					children: t.footer.tagline
				})] }), cols.map(([title, links]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-[0.14em] text-ink/50",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2.5 text-sm",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "text-ink/80 hover:text-copper-dark",
						children: l
					}) }, l))
				})] }, title))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--hairline)] pt-6 text-xs text-ink/55 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.footer.copyright }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono-num",
					children: "v0.1 · tirana"
				})]
			})]
		})
	});
}
function EmployeeIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "8",
			r: "3.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" })]
	});
}
function EmployerIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 21V9l9-5 9 5v12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 21v-6h6v6" })]
	});
}
function ProviderIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 7h18l-1.5 5H4.5L3 7Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12v8h14v-8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 16h4" })
		]
	});
}
function FeatureGlyph({ i }) {
	const paths = [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" }, "a"),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 20h16" }, "b1"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 16V9M12 16V5M17 16v-4" }, "b2")] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "8"
		}, "c1"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 12l3 3 5-6" }, "c2")] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "4",
				width: "7",
				height: "7",
				rx: "1.5"
			}, "d1"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "14",
				y: "4",
				width: "7",
				height: "7",
				rx: "1.5"
			}, "d2"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "15",
				width: "18",
				height: "5",
				rx: "1.5"
			}, "d3")
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 2L4 14h7l-1 8 9-12h-7l1-8z" }, "e"),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 3v18h18" }, "f1"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 15l4-4 3 3 5-6" }, "f2")] })
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: paths[i % paths.length]
	});
}
//#endregion
export { Landing as component };
