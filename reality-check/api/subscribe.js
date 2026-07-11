// Vercel serverless function — save as /api/subscribe.js at your project root
// (adjust the path/export style if you're actually on Netlify, Express, or
// Next.js — see the note at the bottom).
//
// Required environment variables (set in your hosting dashboard, NEVER
// committed to the repo, NEVER prefixed with VITE_/NEXT_PUBLIC_ since those
// get exposed to the browser bundle):
//
//   MAILCHIMP_API_KEY       — Account > Extras > API keys
//   MAILCHIMP_AUDIENCE_ID   — Audience > Settings > Audience name and defaults > Audience ID
//   MAILCHIMP_SERVER_PREFIX — the bit after the dash in your API key, e.g.
//                             if your key ends "-us21" this is "us21"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email } = req.body || {};

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!API_KEY || !AUDIENCE_ID || !SERVER_PREFIX) {
    console.error("Missing Mailchimp environment variables");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const [firstName = "", ...rest] = (name || "").trim().split(" ");
  const lastName = rest.join(" ");

  try {
    const mcRes = await fetch(
      `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `anystring:${API_KEY}`
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          },
        }),
      }
    );

    const data = await mcRes.json();

    // Mailchimp returns 400 "Member Exists" if this email is already on
    // the list. Treat that as success — a returning user shouldn't get
    // blocked from seeing their results just because they've submitted
    // the form before.
    if (!mcRes.ok && data.title !== "Member Exists") {
      console.error("Mailchimp error:", data);
      return res
        .status(500)
        .json({ error: "Could not save your details. Please try again." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Mailchimp request failed:", err);
    return res
      .status(500)
      .json({ error: "Could not save your details. Please try again." });
  }
}

/*
NOT ON VERCEL? Adjust as follows — the Mailchimp logic in the try block
above stays identical either way:

— Netlify: move this file to netlify/functions/subscribe.js, change the
  export to `exports.handler = async (event) => { const { name, email } =
  JSON.parse(event.body); ... return { statusCode: 200, body: JSON.stringify({ ok: true }) }; }`,
  and point the frontend fetch at "/.netlify/functions/subscribe" instead
  of "/api/subscribe".

— Express: `app.post("/api/subscribe", async (req, res) => { ...same body... })`
  — req.body works as-is if you have express.json() middleware enabled.

— Next.js App Router: save as app/api/subscribe/route.js, change the
  export to `export async function POST(req) { const { name, email } =
  await req.json(); ... return Response.json({ ok: true }); }`.
*/
