(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/HowItWorks.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HowItWorks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const tabs = [
    {
        id: "wallet",
        label: "Wallet top-up",
        steps: [
            [
                "Open your app",
                "Choose “Cash” as the way to add money."
            ],
            [
                "Enter an amount",
                "Get your slip by SMS, email, or print it."
            ],
            [
                "Pay the agent",
                "Show the slip, hand over the cash, keep the receipt."
            ]
        ]
    },
    {
        id: "shop",
        label: "Online shopping",
        steps: [
            [
                "Pick OhentPayCash",
                "Select it as your payment method at checkout."
            ],
            [
                "Get your slip",
                "A barcode and 12-digit code are created for the order."
            ],
            [
                "Pay the agent",
                "Pay in cash at any payment point to complete the order."
            ]
        ]
    },
    {
        id: "bills",
        label: "Online bills",
        steps: [
            [
                "Open your provider’s app",
                "Choose OhentPayCash as the payment method."
            ],
            [
                "Get your slip",
                "The amount due is on the slip. Save it to your phone."
            ],
            [
                "Pay the agent",
                "Show the slip and pay. Your provider is notified."
            ]
        ]
    },
    {
        id: "paper",
        label: "Paper bills",
        steps: [
            [
                "Find a payment point",
                "Use the payment point map to find one near you."
            ],
            [
                "Show your bill",
                "Hand the paper bill to the agent to scan."
            ],
            [
                "Pay the amount due",
                "Pay in cash and keep your receipt."
            ]
        ]
    }
];
function HowItWorks() {
    _s();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const tab = tabs[active];
    function onKey(e, i) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        const next = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
        setActive(next);
        document.getElementById(`tab-${tabs[next].id}`)?.focus();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "tablist",
                "aria-label": "How it works",
                className: "flex flex-wrap gap-2",
                children: tabs.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        id: `tab-${t.id}`,
                        role: "tab",
                        "aria-selected": i === active,
                        "aria-controls": "how-panel",
                        tabIndex: i === active ? 0 : -1,
                        onClick: ()=>setActive(i),
                        onKeyDown: (e)=>onKey(e, i),
                        className: `rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${i === active ? "border-ink bg-ink text-white" : "border-ink/30 hover:border-ink hover:bg-white"}`,
                        children: t.label
                    }, t.id, false, {
                        fileName: "[project]/components/HowItWorks.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/HowItWorks.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                id: "how-panel",
                role: "tabpanel",
                "aria-labelledby": `tab-${tab.id}`,
                className: "swap mt-10 grid gap-8 md:grid-cols-3",
                children: tab.steps.map(([title, body], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "border-t-2 border-ink pt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-display text-4xl font-bold text-royal",
                                children: i + 1
                            }, void 0, false, {
                                fileName: "[project]/components/HowItWorks.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mt-2 text-xl font-semibold",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/HowItWorks.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-ink/80",
                                children: body
                            }, void 0, false, {
                                fileName: "[project]/components/HowItWorks.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        ]
                    }, title, true, {
                        fileName: "[project]/components/HowItWorks.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this))
            }, tab.id, false, {
                fileName: "[project]/components/HowItWorks.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/HowItWorks.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(HowItWorks, "LYMHw6xE17pbh6ai9qaw76OM0Ms=");
_c = HowItWorks;
var _c;
__turbopack_context__.k.register(_c, "HowItWorks");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_HowItWorks_tsx_06zklsqzgtuxf._.js.map