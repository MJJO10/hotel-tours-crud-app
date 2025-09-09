
import { create } from 'zustand'
import type { Tour } from '@/types/tour'

type State = {
  items: Tour[]
  load: (items: Tour[]) => void
  createOne: (item: Tour) => void
  updateOne: (id: string, patch: Partial<Tour>) => void
  removeOne: (id: string) => void
}

export const useToursStore = create<State>((set) => ({
  items: [],
  load: (items) => set({ items }),
  createOne: (item) => set((s)=>({ items: [item, ...s.items] })),
  updateOne: (id, patch) => set((s)=>({ items: s.items.map(it => it.id===id ? { ...it, ...patch } as Tour : it) })),
  removeOne: (id) => set((s)=>({ items: s.items.filter(it => it.id !== id) })),
}))
