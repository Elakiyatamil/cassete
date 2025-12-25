export default async (req: Request) => {
  try {
    const body = await req.json();
    const { sender_email, receiver_email, share_link, message } = body || {};

    console.log("send_email invoked with:", { sender_email, receiver_email });

    if (!receiver_email) {
      return new Response(JSON.stringify({ error: "receiver_email is required" }), { status: 400 });
    }

    const SENDGRID_API_KEY = (globalThis as any).Deno?.env?.get("SENDGRID_API_KEY") || (globalThis as any).SENDGRID_API_KEY;
    const FROM_EMAIL = (globalThis as any).Deno?.env?.get("FROM_EMAIL") || (globalThis as any).FROM_EMAIL || sender_email || "no-reply@cassette.example";

    if (!SENDGRID_API_KEY) {
      return new Response(JSON.stringify({ error: "SENDGRID_API_KEY not configured" }), { status: 500 });
    }

    const plain = `Hey — you received a cassette from ${sender_email || "someone"}.\n\nListen: ${share_link}\n\nMessage:\n${message || "(no message)"}`;
    const html = `<p>Hey — you received a cassette from <strong>${sender_email || "someone"}</strong>.</p><p><a href="${share_link}">Open cassette</a></p><hr/><p>${(message || "(no message)").replace(/\n/g, "<br/>")}</p>`;

    const payload = {
      personalizations: [
        {
          to: [{ email: receiver_email }],
        },
      ],
      from: { email: FROM_EMAIL, name: "Cassette" },
      subject: "You've received a cassette",
      content: [
        { type: "text/plain", value: plain },
        { type: "text/html", value: html },
      ],
    };

    // Fire-and-forget: don't await the response
    fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch(err => console.error("SendGrid send failed:", err?.message));

    // Return immediately without waiting for SendGrid
    return new Response(JSON.stringify({ ok: true, queued: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || String(err) }), { status: 500 });
  }
};
