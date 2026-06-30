/** Small IndexedDB JSON cache — keeps gzip-fetched datasets off repeat network trips. */

const DB_NAME = 'patientbillguide-data';
const DB_VERSION = 1;
const STORE = 'blobs';

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(new Error('IndexedDB unavailable'));
  }
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error ?? new Error('IndexedDB open failed'));
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
  });

  return dbPromise;
}

export async function idbGet<T>(key: string): Promise<T | null> {
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const store = tx.objectStore(STORE);
      const req = store.get(key);
      req.onerror = () => reject(req.error ?? new Error('idb get failed'));
      req.onsuccess = () => resolve((req.result as T | undefined) ?? null);
    });
  } catch {
    return null;
  }
}

export async function idbSet(key: string, value: unknown): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      const store = tx.objectStore(STORE);
      const req = store.put(value, key);
      req.onerror = () => reject(req.error ?? new Error('idb put failed'));
      req.onsuccess = () => resolve();
    });
  } catch {
    /* cache write is best-effort */
  }
}

export async function idbDeleteByPrefix(prefix: string): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      const store = tx.objectStore(STORE);
      const req = store.openCursor();
      req.onerror = () => reject(req.error ?? new Error('idb cursor failed'));
      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor) {
          resolve();
          return;
        }
        const key = String(cursor.key);
        if (key.startsWith(prefix)) cursor.delete();
        cursor.continue();
      };
    });
  } catch {
    /* best-effort purge */
  }
}

export function cacheKey(dataset: string, version: string, id: string): string {
  return `${dataset}::${version}::${id}`;
}
