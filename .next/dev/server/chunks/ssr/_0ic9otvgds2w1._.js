module.exports = [
"[project]/components/LocatorMap.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LocatorMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$chunks$2f$use$2d$map$2d$3d$2d$Bc_q95nK$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__t__as__APIProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@vis.gl/react-google-maps/dist/chunks/use-map-3d-Bc_q95nK.mjs [app-ssr] (ecmascript) <export t as APIProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@vis.gl/react-google-maps/dist/index.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/agents.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const CENTERS = {
    us: {
        lat: 40.73,
        lng: -73.99
    },
    ca: {
        lat: 43.65,
        lng: -79.38
    }
};
function km(a, b) {
    const r = (d)=>d * Math.PI / 180;
    const h = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2;
    return 6371 * 2 * Math.asin(Math.sqrt(h));
}
function LocatorMap({ country }) {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [openOnly, setOpenOnly] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [me, setMe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [geoError, setGeoError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hour, setHour] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>setHour(new Date().getHours()), []);
    const isOpen = (a)=>hour !== null && hour >= a.opens && hour < a.closes;
    const list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const q = query.trim().toLowerCase();
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["agents"].filter((a)=>a.country === country).filter((a)=>!q || `${a.name} ${a.address}`.toLowerCase().includes(q)).filter((a)=>!openOnly || hour !== null && hour >= a.opens && hour < a.closes).map((a)=>({
                a,
                d: me ? km(me, a) : null
            })).sort((x, y)=>(x.d ?? 0) - (y.d ?? 0));
    }, [
        query,
        openOnly,
        me,
        hour,
        country
    ]);
    function locate() {
        setGeoError(false);
        navigator.geolocation?.getCurrentPosition((p)=>setMe({
                lat: p.coords.latitude,
                lng: p.coords.longitude
            }), ()=>setGeoError(true));
    }
    const active = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["agents"].find((a)=>a.id === selected);
    const center = active ?? me ?? CENTERS[country];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8 grid gap-6 lg:grid-cols-[22rem_1fr]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium",
                                children: [
                                    "Area or shop name",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: query,
                                        onChange: (e)=>setQuery(e.target.value),
                                        placeholder: country === "ca" ? "e.g. Toronto" : "e.g. Brooklyn",
                                        className: "mt-1 w-full border border-line bg-white px-3 py-2.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LocatorMap.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LocatorMap.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: openOnly,
                                                onChange: (e)=>setOpenOnly(e.target.checked)
                                            }, void 0, false, {
                                                fileName: "[project]/components/LocatorMap.tsx",
                                                lineNumber: 59,
                                                columnNumber: 15
                                            }, this),
                                            " Open now"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LocatorMap.tsx",
                                        lineNumber: 58,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: locate,
                                        className: "rounded-full border border-ink px-4 py-1.5 text-sm font-medium hover:bg-sky",
                                        children: "Use my location"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LocatorMap.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LocatorMap.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            geoError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                role: "alert",
                                className: "text-sm text-red-700",
                                children: "We could not get your location. Allow access in your browser, or search by area."
                            }, void 0, false, {
                                fileName: "[project]/components/LocatorMap.tsx",
                                lineNumber: 65,
                                columnNumber: 24
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LocatorMap.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-5 max-h-[28rem] divide-y divide-line overflow-auto border-y border-line",
                        children: [
                            list.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "py-6 text-sm",
                                children: "No payment points match. Try a different area or clear the filters."
                            }, void 0, false, {
                                fileName: "[project]/components/LocatorMap.tsx",
                                lineNumber: 69,
                                columnNumber: 33
                            }, this),
                            list.map(({ a, d })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelected(a.id),
                                            "aria-pressed": selected === a.id,
                                            className: `w-full px-2 py-4 text-left hover:bg-sky/60 ${selected === a.id ? "bg-sky" : ""}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block font-display text-lg font-semibold",
                                                    children: a.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LocatorMap.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-sm text-ink/80",
                                                    children: a.address
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LocatorMap.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mt-1 block text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: isOpen(a) ? "font-medium text-royal" : "text-ink/60",
                                                            children: hour === null ? "" : isOpen(a) ? "Open" : "Closed"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/LocatorMap.tsx",
                                                            lineNumber: 77,
                                                            columnNumber: 19
                                                        }, this),
                                                        " ",
                                                        a.opens,
                                                        ":00 to ",
                                                        a.closes,
                                                        ":00",
                                                        d !== null && ` · ${d.toFixed(1)} km away`
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/LocatorMap.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/LocatorMap.tsx",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, this),
                                        selected === a.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            className: "mb-3 ml-2 inline-block text-sm underline underline-offset-4",
                                            target: "_blank",
                                            rel: "noreferrer",
                                            href: `https://www.google.com/maps/dir/?api=1&destination=${a.lat},${a.lng}`,
                                            children: "Get directions"
                                        }, void 0, false, {
                                            fileName: "[project]/components/LocatorMap.tsx",
                                            lineNumber: 84,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, a.id, true, {
                                    fileName: "[project]/components/LocatorMap.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LocatorMap.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LocatorMap.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[28rem] bg-sky lg:h-[36rem]",
                children: apiKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$chunks$2f$use$2d$map$2d$3d$2d$Bc_q95nK$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__t__as__APIProvider$3e$__["APIProvider"], {
                    apiKey: apiKey,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Map"], {
                        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? "DEMO_MAP_ID",
                        center: center,
                        defaultZoom: 12,
                        zoom: active ? 15 : undefined,
                        gestureHandling: "greedy",
                        disableDefaultUI: true,
                        children: [
                            list.map(({ a })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AdvancedMarker"], {
                                    position: a,
                                    title: a.name,
                                    onClick: ()=>setSelected(a.id),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Pin"], {
                                        background: selected === a.id ? "#F0B03A" : "#0A2540",
                                        borderColor: "#0A2540",
                                        glyphColor: "#fff"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LocatorMap.tsx",
                                        lineNumber: 99,
                                        columnNumber: 19
                                    }, this)
                                }, a.id, false, {
                                    fileName: "[project]/components/LocatorMap.tsx",
                                    lineNumber: 98,
                                    columnNumber: 17
                                }, this)),
                            me && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AdvancedMarker"], {
                                position: me,
                                title: "You are here",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Pin"], {
                                    background: "#1D5FC7",
                                    glyphColor: "#fff"
                                }, void 0, false, {
                                    fileName: "[project]/components/LocatorMap.tsx",
                                    lineNumber: 102,
                                    columnNumber: 73
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/LocatorMap.tsx",
                                lineNumber: 102,
                                columnNumber: 22
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LocatorMap.tsx",
                        lineNumber: 95,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/LocatorMap.tsx",
                    lineNumber: 94,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-full items-center p-8 text-sm",
                    children: "Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local to show the map. The list still works without it."
                }, void 0, false, {
                    fileName: "[project]/components/LocatorMap.tsx",
                    lineNumber: 106,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/LocatorMap.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LocatorMap.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/agents.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "agents",
    ()=>agents
]);
const agents = [
    {
        id: "us1",
        country: "us",
        name: "Brooklyn Corner Market",
        address: "Brooklyn, NY",
        lat: 40.6782,
        lng: -73.9442,
        opens: 7,
        closes: 22
    },
    {
        id: "us2",
        country: "us",
        name: "Midtown Pharmacy",
        address: "Midtown, New York, NY",
        lat: 40.7549,
        lng: -73.984,
        opens: 8,
        closes: 21
    },
    {
        id: "us3",
        country: "us",
        name: "Queens Convenience",
        address: "Queens, NY",
        lat: 40.7282,
        lng: -73.7949,
        opens: 6,
        closes: 23
    },
    {
        id: "ca1",
        country: "ca",
        name: "Downtown Variety",
        address: "Downtown Toronto, ON",
        lat: 43.6532,
        lng: -79.3832,
        opens: 8,
        closes: 22
    },
    {
        id: "ca2",
        country: "ca",
        name: "Scarborough Pharmacy",
        address: "Scarborough, ON",
        lat: 43.7731,
        lng: -79.2578,
        opens: 9,
        closes: 21
    },
    {
        id: "ca3",
        country: "ca",
        name: "Mississauga Mart",
        address: "Mississauga, ON",
        lat: 43.589,
        lng: -79.6441,
        opens: 7,
        closes: 23
    }
];
}),
];

//# sourceMappingURL=_0ic9otvgds2w1._.js.map