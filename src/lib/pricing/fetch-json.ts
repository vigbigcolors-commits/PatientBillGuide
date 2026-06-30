/** Parse JSON from a fetch response — handles plain JSON and raw gzip bytes. */
export async function parseResponseJson<T>(res: Response): Promise<T> {
  const buffer = await res.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  // Raw gzip file (typical static hosting without Content-Encoding)
  if (bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b) {
    if (typeof DecompressionStream === 'undefined') {
      throw new Error('Gzip decompression is not supported in this browser.');
    }
    const stream = new Response(bytes).body!.pipeThrough(new DecompressionStream('gzip'));
    const text = await new Response(stream).text();
    return JSON.parse(text) as T;
  }

  return JSON.parse(new TextDecoder().decode(bytes)) as T;
}

/** Fetch JSON from plain or gzip-compressed URLs (client-side). */
export async function fetchJson<T>(url: string, timeoutMs = 60_000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    return await parseResponseJson<T>(res);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error(`Timed out loading ${url}`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
