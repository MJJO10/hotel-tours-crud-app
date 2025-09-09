
const BASE_URL = 'http://54.169.154.143:3258'

export type AnyItem = (Record<string, any> & { id?: string, type: 'tour' | 'hotel' })

async function asJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(()=>'')
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`)
  }
  return res.json()
}

export async function getAll(): Promise<AnyItem[]> {
  const res = await fetch(`${BASE_URL}/hotel-rooms`, { cache: 'no-store' })
  return asJson<AnyItem[]>(res)
}

export async function getOne(id: string): Promise<AnyItem> {
  const res = await fetch(`${BASE_URL}/hotel-rooms/${id}`, { cache: 'no-store' })
  return asJson<AnyItem>(res)
}

export async function createItem(payload: AnyItem): Promise<AnyItem> {
  const res = await fetch(`${BASE_URL}/hotel-rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return asJson<AnyItem>(res)
}

export async function updateItem(id: string, payload: AnyItem): Promise<AnyItem> {
  const res = await fetch(`${BASE_URL}/hotel-rooms/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return asJson<AnyItem>(res)
}

export async function deleteItem(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/hotel-rooms/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const text = await res.text().catch(()=>'')
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`)
  }
}
