import { create } from "zustand";

export const sessionState = create((set) => ({
  session: null,
  setSession: (user) => set(() => ({ session: user })),
}));
