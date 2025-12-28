const TRANSLATE_URL = process.env.LIBRETRANSLATE_URL;
export async function POST(req) {
  const { text, target } = await req.json();

  const res = await fetch(TRANSLATE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "auto",
      target,
      format: "text",
    }),
  });

  const data = await res.json();
  return Response.json(data);
}
