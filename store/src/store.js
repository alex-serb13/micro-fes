import create from "zustand";
import { persist } from "zustand/middleware";

const mode = localStorage.getItem("chakra-ui-color-mode") || "light";

const useStore = create(
  persist(
    (set) => ({
      mode,
      isAuthenticated: false,
      signIn: () => set(() => ({ isAuthenticated: true })),
      signOut: () => set(() => ({ isAuthenticated: false })),
      toggleColor: (mode) => set(() => ({ mode })),
    }),
    { name: "store" }
  )
);

export default useStore;
