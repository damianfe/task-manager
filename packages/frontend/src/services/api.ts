const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = async (endpoint: string, options: RequestInit = {}) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
};
