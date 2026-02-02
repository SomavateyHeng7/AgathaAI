module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/lib/database.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getClient",
    ()=>getClient,
    "query",
    ()=>query,
    "testConnection",
    ()=>testConnection
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const poolConfig = {
    connectionString: process.env.DATABASE_URL,
    min: parseInt(process.env.DATABASE_POOL_MIN || '2'),
    max: parseInt(process.env.DATABASE_POOL_MAX || '10'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
};
// Create a singleton pool
let pool = null;
function getPool() {
    if (!pool) {
        pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"](poolConfig);
        pool.on('error', (err)=>{
            console.error('Unexpected database error:', err);
        });
    }
    return pool;
}
async function query(text, params) {
    const pool = getPool();
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('Executed query', {
                text: text.substring(0, 100),
                duration,
                rows: res.rowCount
            });
        }
        return res;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}
async function getClient() {
    const pool = getPool();
    return await pool.connect();
}
async function testConnection() {
    try {
        const result = await query('SELECT NOW()');
        console.log('✅ Database connected:', result.rows[0].now);
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        return false;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/auth-config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/google.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/credentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/database.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$bcrypt$29$__ = __turbopack_context__.i("[externals]/bcrypt [external] (bcrypt, cjs, [project]/node_modules/bcrypt)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const authOptions = {
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                try {
                    // Get user from database
                    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT * FROM users WHERE email = $1", [
                        credentials.email
                    ]);
                    if (result.rows.length === 0) {
                        return null;
                    }
                    const user = result.rows[0];
                    // Verify password
                    const isValid = await __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$bcrypt$29$__["default"].compare(credentials.password, user.password_hash);
                    if (!isValid) {
                        return null;
                    }
                    // Get user's API key
                    const apiKeyResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT key_hash FROM api_keys WHERE user_id = $1 AND status = 'active' LIMIT 1", [
                        user.id
                    ]);
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.full_name,
                        tier: user.subscription_tier,
                        apiKey: apiKeyResult.rows[0]?.key_hash || null
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async signIn ({ user, account }) {
            if (account?.provider === "google") {
                try {
                    // Validate required fields from Google
                    if (!user.email) {
                        console.error("Google sign-in error: Missing email from Google profile");
                        return false;
                    }
                    // Check if user exists
                    const existingUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT * FROM users WHERE email = $1", [
                        user.email
                    ]);
                    if (existingUser.rows.length === 0) {
                        // Create new user
                        console.log("Creating new user:", user.email);
                        const newUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO users (email, full_name, subscription_tier, email_verified, password_hash, created_at)
               VALUES ($1, $2, $3, true, '', NOW())
               RETURNING id`, [
                            user.email,
                            user.name || user.email,
                            "free"
                        ]);
                        const userId = newUser.rows[0].id;
                        console.log("User created with ID:", userId);
                        // Generate API key
                        const apiKey = `ak_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
                        const keyHash = await __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$bcrypt$29$__["default"].hash(apiKey, 10);
                        const keyPrefix = apiKey.substring(0, 8);
                        const keySuffix = apiKey.substring(apiKey.length - 4);
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO api_keys (user_id, key_hash, key_prefix, key_suffix, name, created_at)
               VALUES ($1, $2, $3, $4, $5, NOW())`, [
                            userId,
                            keyHash,
                            keyPrefix,
                            keySuffix,
                            "Default API Key"
                        ]);
                        user.id = userId;
                    } else {
                        console.log("Existing user found:", user.email);
                        user.id = existingUser.rows[0].id;
                    }
                    return true;
                } catch (error) {
                    console.error("Google sign-in error:", error);
                    console.error("Error details:", JSON.stringify(error, null, 2));
                    return false;
                }
            }
            return true;
        },
        async jwt ({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.tier = user.tier;
                token.apiKey = user.apiKey;
            }
            if (account?.provider === "google" && token.email) {
                // Get user data from database
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT id, subscription_tier FROM users WHERE email = $1", [
                    token.email
                ]);
                if (result.rows.length > 0) {
                    token.id = result.rows[0].id;
                    token.tier = result.rows[0].subscription_tier;
                    // Get API key
                    const apiKeyResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT key_hash FROM api_keys WHERE user_id = $1 AND status = 'active' LIMIT 1", [
                        result.rows[0].id
                    ]);
                    token.apiKey = apiKeyResult.rows[0]?.key_hash || null;
                }
            }
            return token;
        },
        async session ({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.tier = token.tier;
                session.user.apiKey = token.apiKey;
            }
            return session;
        }
    },
    pages: {
        signIn: "/signin",
        signOut: "/signin",
        error: "/signin"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/punycode [external] (punycode, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:stream/web [external] (node:stream/web, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream/web", () => require("node:stream/web"));

module.exports = mod;
}),
"[project]/src/lib/llm.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "chat",
    ()=>chat,
    "processInference",
    ()=>processInference
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/database.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const openai = process.env.OPENAI_API_KEY ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]({
    apiKey: process.env.OPENAI_API_KEY
}) : null;
const gemini = process.env.GEMINI_API_KEY ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](process.env.GEMINI_API_KEY) : null;
async function processInference(requestId, userId, model, prompt, parameters) {
    const startTime = Date.now();
    try {
        // Update status to processing
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("UPDATE inference_requests SET status = $1 WHERE id = $2", [
            "processing",
            requestId
        ]);
        let response;
        let tokensPrompt;
        let tokensCompletion;
        // Call appropriate LLM provider
        if (model.startsWith("gpt-")) {
            if (!openai) throw new Error("OpenAI API key not configured");
            const result = await callOpenAI(model, prompt, parameters);
            response = result.response;
            tokensPrompt = result.tokensPrompt;
            tokensCompletion = result.tokensCompletion;
        } else if (model.startsWith("gemini-")) {
            if (!gemini) throw new Error("Gemini API key not configured");
            const result = await callGemini(model, prompt, parameters);
            response = result.response;
            tokensPrompt = result.tokensPrompt;
            tokensCompletion = result.tokensCompletion;
        } else {
            throw new Error(`Unsupported model: ${model}`);
        }
        const processingTime = Date.now() - startTime;
        const tokensTotal = tokensPrompt + tokensCompletion;
        // Update request with results
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`UPDATE inference_requests
       SET status = $1, response = $2, tokens_prompt = $3, tokens_completion = $4,
           tokens_total = $5, processing_time_ms = $6, completed_at = NOW()
       WHERE id = $7`, [
            "completed",
            response,
            tokensPrompt,
            tokensCompletion,
            tokensTotal,
            processingTime,
            requestId
        ]);
        // Update usage statistics
        await updateUsageStatistics(userId, tokensTotal, processingTime, model);
    } catch (error) {
        console.error("Inference processing error:", error);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`UPDATE inference_requests
       SET status = $1, error_message = $2, completed_at = NOW()
       WHERE id = $3`, [
            "failed",
            error.message,
            requestId
        ]);
    }
}
async function callOpenAI(model, prompt, params) {
    const completion = await openai.chat.completions.create({
        model,
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: params.temperature || 0.7,
        max_tokens: params.maxTokens || 1000,
        top_p: params.topP || 1
    });
    return {
        response: completion.choices[0].message.content || "",
        tokensPrompt: completion.usage?.prompt_tokens || 0,
        tokensCompletion: completion.usage?.completion_tokens || 0
    };
}
async function callGemini(model, prompt, params) {
    // Map model names to actual Gemini model IDs
    const modelMap = {
        "gemini-pro": "gemini-1.5-flash-8b",
        "gemini-1.5-pro": "gemini-1.5-flash-8b",
        "gemini-1.5-flash": "gemini-1.5-flash-8b"
    };
    const actualModel = modelMap[model] || "gemini-1.5-flash-8b";
    const genModel = gemini.getGenerativeModel({
        model: actualModel
    });
    const result = await genModel.generateContent({
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: prompt
                    }
                ]
            }
        ],
        generationConfig: {
            temperature: params.temperature || 0.7,
            maxOutputTokens: params.maxTokens || 1000,
            topP: params.topP || 1
        }
    });
    const response = result.response;
    const text = response.text();
    const tokensPrompt = response.usageMetadata?.promptTokenCount || Math.ceil(prompt.length / 4);
    const tokensCompletion = response.usageMetadata?.candidatesTokenCount || Math.ceil(text.length / 4);
    return {
        response: text,
        tokensPrompt,
        tokensCompletion
    };
}
async function updateUsageStatistics(userId, tokens, processingTime, model) {
    const today = new Date().toISOString().split("T")[0];
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO usage_statistics (user_id, date, total_requests, successful_requests, total_tokens, avg_response_time_ms, models_used)
     VALUES ($1, $2, 1, 1, $3, $4, $5)
     ON CONFLICT (user_id, date)
     DO UPDATE SET
       total_requests = usage_statistics.total_requests + 1,
       successful_requests = usage_statistics.successful_requests + 1,
       total_tokens = usage_statistics.total_tokens + $3,
       avg_response_time_ms = (usage_statistics.avg_response_time_ms * usage_statistics.total_requests + $4) / (usage_statistics.total_requests + 1),
       models_used = usage_statistics.models_used || $5`, [
        userId,
        today,
        tokens,
        processingTime,
        JSON.stringify({
            [model]: 1
        })
    ]);
}
async function chat(model, messages, params = {}) {
    const startTime = Date.now();
    let response;
    let tokensPrompt;
    let tokensCompletion;
    if (model.startsWith("gpt-")) {
        if (!openai) throw new Error("OpenAI API key not configured");
        const result = await callOpenAIChat(model, messages, params);
        response = result.response;
        tokensPrompt = result.tokensPrompt;
        tokensCompletion = result.tokensCompletion;
    } else if (model.startsWith("gemini-")) {
        if (!gemini) throw new Error("Gemini API key not configured");
        const result = await callGeminiChat(model, messages, params);
        response = result.response;
        tokensPrompt = result.tokensPrompt;
        tokensCompletion = result.tokensCompletion;
    } else {
        throw new Error(`Unsupported model: ${model}`);
    }
    const processingTime = Date.now() - startTime;
    return {
        response,
        tokensPrompt,
        tokensCompletion,
        tokensTotal: tokensPrompt + tokensCompletion,
        processingTime
    };
}
async function callOpenAIChat(model, messages, params) {
    const completion = await openai.chat.completions.create({
        model,
        messages: messages,
        temperature: params.temperature || 0.7,
        max_tokens: params.maxTokens || 2000,
        top_p: params.topP || 1
    });
    return {
        response: completion.choices[0].message.content || "",
        tokensPrompt: completion.usage?.prompt_tokens || 0,
        tokensCompletion: completion.usage?.completion_tokens || 0
    };
}
async function callGeminiChat(model, messages, params) {
    const modelMap = {
        "gemini-pro": "gemini-1.5-flash",
        "gemini-2.5-flash": "gemini-2.5-flash",
        "gemini-2.0-flash": "gemini-2.0-flash"
    };
    const actualModel = modelMap[model] || "gemini-2.0-flash";
    const genModel = gemini.getGenerativeModel({
        model: actualModel
    });
    const contents = messages.map((msg)=>({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [
                {
                    text: msg.content
                }
            ]
        }));
    const result = await genModel.generateContent({
        contents,
        generationConfig: {
            temperature: params.temperature || 0.7,
            maxOutputTokens: params.maxTokens || 2000,
            topP: params.topP || 1
        }
    });
    const responseObj = result.response;
    const text = responseObj.text();
    const tokensPrompt = responseObj.usageMetadata?.promptTokenCount || Math.ceil(messages.reduce((sum, m)=>sum + m.content.length, 0) / 4);
    const tokensCompletion = responseObj.usageMetadata?.candidatesTokenCount || Math.ceil(text.length / 4);
    return {
        response: text,
        tokensPrompt,
        tokensCompletion
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$llm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/llm.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/database.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$llm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$llm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
async function POST(request) {
    try {
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
        if (!session || !session.user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const body = await request.json();
        const { conversationId, message, model = "gpt-4" } = body;
        if (!message || !message.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Message is required"
            }, {
                status: 400
            });
        }
        const userId = session.user.id;
        let convId = conversationId;
        if (!convId) {
            const newConv = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO conversations (user_id, title, model, created_at, updated_at)
         VALUES ($1, $2, $3, NOW(), NOW())
         RETURNING id`, [
                userId,
                message.substring(0, 100),
                model
            ]);
            convId = newConv.rows[0].id;
        }
        const historyResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT role, content FROM conversation_messages
       WHERE conversation_id = $1
       ORDER BY created_at ASC`, [
            convId
        ]);
        const messages = [
            ...historyResult.rows,
            {
                role: "user",
                content: message
            }
        ];
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO conversation_messages (conversation_id, role, content, created_at)
       VALUES ($1, $2, $3, NOW())`, [
            convId,
            "user",
            message
        ]);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$llm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["chat"])(model, messages);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO conversation_messages (conversation_id, role, content, model, tokens_prompt, tokens_completion, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`, [
            convId,
            "assistant",
            result.response,
            model,
            result.tokensPrompt,
            result.tokensCompletion
        ]);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`UPDATE conversations
       SET updated_at = NOW(), message_count = message_count + 2, total_tokens = total_tokens + $2
       WHERE id = $1`, [
            convId,
            result.tokensTotal
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            conversationId: convId,
            message: result.response,
            model,
            tokens: {
                prompt: result.tokensPrompt,
                completion: result.tokensCompletion,
                total: result.tokensTotal
            }
        });
    } catch (error) {
        console.error("Chat API error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || "Failed to process chat"
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b2e7d472._.js.map