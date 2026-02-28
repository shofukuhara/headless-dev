const WP_API_URL = import.meta.env.WP_API_URL;

export async function fetchGraphQL(query) {
  const res = await fetch(WP_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const { data } = await res.json();
  return data;
}
