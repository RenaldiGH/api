const API_URL = import.meta.env.VITE_API_URL;

export async function fetchJSON(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    const data = await res.json();
    if (!res.ok) throw data;
    return data;
}
