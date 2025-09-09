
import { create } from 'zustand'
import type { Hotel } from '@/types/hotel'

type State = {
  items: Hotel[]
  load: (items: Hotel[]) => void
  createOne: (item: Hotel) => void
  updateOne: (id: string, patch: Partial<Hotel>) => void
  removeOne: (id: string) => void
}

export const useHotelsStore = create<State>((set) => ({
  items: [],
  load: (items) => set({ items }),
  createOne: (item) => set((s)=>({ items: [item, ...s.items] })),
  updateOne: (id, patch) => set((s)=>({ items: s.items.map(it => it.id===id ? { ...it, ...patch } as Hotel : it) })),
  removeOne: (id) => set((s)=>({ items: s.items.filter(it => it.id !== id) })),
}))
