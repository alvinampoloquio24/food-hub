// userStore.ts
import create, { StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface User {
  _id: string;
  name: string;
  email: string;
  profile: string;
  // Add any other user properties you need
}

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

type MyPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStore>
) => StateCreator<UserStore>;

const useUserStore = create<UserStore>(
  (persist as MyPersist)(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);

export { useUserStore };
